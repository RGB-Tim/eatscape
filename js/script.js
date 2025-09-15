// js/script.js

// Navbar
// Keren buatan ega no AI asli no fake
  const menu = document.getElementById("menu");

function toggleMenu() {
  menu.classList.toggle("hidden");
}

// Force hide on large screens (≥64rem)
function checkScreen() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  if (window.innerWidth >= 64 * rem) {
    menu.classList.add("hidden");
  }
}

// Run once on load and whenever screen resizes
checkScreen();
window.addEventListener("resize", checkScreen);

// data json
let dataMakanan = [];

// load data makanan dari JSON
fetch("/js/data-makanan.json")
  .then(response => {
    if (!response.ok) throw new Error("Gagal memuat data");
    return response.json();
  })
  .then(data => {
    dataMakanan = data;
    initApp(); // jalankan aplikasi setelah data siap
  })
  .catch(error => console.error("Error:", error));

// semua logic ada di dalam initApp()
function initApp() {
  $(document).ready(function () {
    const $searchInput = $("#searchInput");
    const $searchResults = $("#searchResults");

    // === SEARCH ===
    if ($searchInput.length) {
      $searchInput.on("input", function () {
        const query = $(this).val().toLowerCase();
        $searchResults.empty();

        if (query.length === 0) return;

        const hasil = dataMakanan.filter((makanan) =>
          makanan.nama.toLowerCase().includes(query)
        );

        if (hasil.length > 0) {
          hasil.forEach((makanan) => {
            const card = `
              <a href="/html/informasi.html?nama=${encodeURIComponent(makanan.nama)}" class="m-2 flex gap-2">
                <img class="h-14 w-14 object-cover" src="${makanan.gambar}" alt="">
                <div class="py-2">
                  <p class="font-bold ibm-plex-serif-regular">${makanan.nama}</p>
                  <p class="text-sm">${makanan.deskripsi}</p>
                </div>
              </a>
            `;
            $searchResults.append(card);
          });
        } else {
          $searchResults.html(
            '<div class="m-5"><h1 class="ibm-plex-serif-regular text-4xl">¯\\_(ツ)_/¯</h1><br><h1 class="text-sm">Makanan tidak ditemukan..</h1></div>'
          );
        }
      });
    }

    // === AUTOCOMPLETE untuk bandingkan.html ===
    function setupAutocomplete(inputId) {
      const $input = $(inputId);
      const $list = $('<div class="autocomplete-list"></div>').insertAfter($input);

      $input.on("input", function () {
        const keyword = $input.val().toLowerCase();
        $list.empty();
        if (!keyword) return;

        const filtered = dataMakanan.filter((m) =>
          m.nama.toLowerCase().includes(keyword)
        );
        filtered.forEach((item) => {
          const option = $('<div class="autocomplete-item"></div>').text(item.nama);
          option.on("click", () => {
            $input.val(item.nama);
            $list.empty();
          });
          $list.append(option);
        });
      });

      // Hide list on blur
      $input.on("blur", () => setTimeout(() => $list.empty(), 150));
    }

    if ($("#formBandingkan").length) {
      setupAutocomplete("#makanan1");
      setupAutocomplete("#makanan2");
      setupAutocomplete("#makanan3");

      $("#formBandingkan").on("submit", function (e) {
        e.preventDefault();
        const nama1 = $("#makanan1").val();
        const nama2 = $("#makanan2").val();
        const nama3 = $("#makanan3").val();

        const hasil = dataMakanan.filter(
          (m) => [nama1, nama2, nama3].includes(m.nama) && m.nama
        );
        if (hasil.length < 2) {
          $("#hasilPerbandingan").html(
            '<div class="alert alert-warning">Pilih minimal 2 makanan untuk dibandingkan.</div>'
          );
          return;
        }
        tampilkanPerbandingan(hasil);
      });
    }

    function tampilkanPerbandingan(data) {
      let tabel = `<table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Gizi</th>
            ${data.map((m) => `<th>${m.nama}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          <tr><td>Kalori</td>${data.map((m) => `<td>${m.kalori} kkal</td>`).join("")}</tr>
          <tr><td>Protein</td>${data.map((m) => `<td>${m.protein} g</td>`).join("")}</tr>
          <tr><td>Lemak</td>${data.map((m) => `<td>${m.lemak} g</td>`).join("")}</tr>
          <tr><td>Karbohidrat</td>${data.map((m) => `<td>${m.karbohidrat} g</td>`).join("")}</tr>
          <tr><td>Vitamin</td>${data.map((m) => `<td>${m.vitamin || "-"}</td>`).join("")}</tr>
        </tbody>
      </table>`;

      const rekomendasi = data.reduce((a, b) => (a.protein > b.protein ? a : b));
      tabel += `<div class="alert alert-info">Rekomendasi: <strong>${rekomendasi.nama}</strong> memiliki kandungan protein tertinggi.</div>`;
      $("#hasilPerbandingan").html(tabel);
    }

    // === INFORMASI.HTML ===
    const urlParams = new URLSearchParams(window.location.search);
    const namaMakanan = urlParams.get("nama");
    const makanan = dataMakanan.find(
      (m) => m.nama.toLowerCase() === namaMakanan?.toLowerCase()
    );

    if (makanan) {
      $("#judulMakanan").text(makanan.nama);
      $("#infoGizi").html(`
         <div class="col-md-6"></div>
          <div class="card">
             <div class="card-body">
              <h5 class="card-title">${makanan.nama}</h5>
              <p>Sajian ${makanan.sajian}</p>
              <img src="${makanan.gambar}" class="card-img" alt="${makanan.gambar}">
              <p class="card-text">${makanan.deskripsi || "Tidak ada deskripsi."}</p>
              <ul class="list-group list-group-flush">
                 <li class="list-group-item">Kalori: ${makanan.kalori} kkal</li>
                <li class="list-group-item">Protein: ${makanan.protein} g</li>
                <li class="list-group-item">Lemak: ${makanan.lemak} g</li>
                <li class="list-group-item">Karbohidrat: ${makanan.karbohidrat} g</li>
                <li class="list-group-item">Vitamin: ${makanan.vitamin || "-"}</li>
              </ul>
            </div>
          </div>
      `);
    } else {
      $("#infoGizi").html('<p class="text-center">Makanan tidak ditemukan.</p>');
    }

    // === KATEGORI ===
    const kategori = {};
    dataMakanan.forEach((makanan) => {
      if (!kategori[makanan.kategori]) {
        kategori[makanan.kategori] = [];
      }
      kategori[makanan.kategori].push(makanan);
    });

    for (const [namaKategori, daftarMakanan] of Object.entries(kategori)) {
      $("#kategoriContainer").append(`
        <div class="col-12 mb-4">
          <h4>${namaKategori}</h4>
          <div class="row">
            ${daftarMakanan
              .map(
                (makanan) => `
              <div class="col-md-4 mb-3">
                <div class="card h-100">
                  <div class="card-body"></div>
                    <h5 class="card-title">${makanan.nama}</h5>
                    <img src="${makanan.gambar}" class="h-5" alt="test">
                    <p class="card-text">${makanan.deskripsi || "Klik untuk lihat detail"}</p>
                    <a href="/html/informasi.html?nama=${encodeURIComponent(makanan.nama)}" class="btn btn-success">Lihat Gizi</a>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `);
    }
  });
}