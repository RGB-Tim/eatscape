// js/script.js

$(document).ready(function () {
  const $searchInput = $("#searchInput");
  const $searchResults = $("#searchResults");

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
            <div class="card mb-3 max-h-64 border-dashed overflow-hidden border-2 grid grid-cols-2 gap-2">
              <div class="card-body">
                <img src="${makanan.gambar}" class="card-img" alt="...">
              </div>
              <div class="card-body">
              <p class="card-text">${makanan.kategori}</p>
                <h5 class="text-2xl">${makanan.nama}</h5>
                <p class="card-text">${makanan.deskripsi}</p>
                <a href="informasi.html?nama=${encodeURIComponent(
                  makanan.nama
                )}" class="btn btn-dark">Lihat Gizi</a>
              </div>
            </div>
          `;
          $searchResults.append(card);
        });
      } else {
        $searchResults.html(
          '¯\_(ツ)_/¯<p class="text-muted">Makanan tidak ditemukan.</p>'
        );
      }
    });
  }

  // Autocomplete untuk bandingkan.html
  function setupAutocomplete(inputId) {
    const $input = $(inputId);
    const $list = $('<div class="autocomplete-list"></div>').insertAfter(
      $input
    );

    $input.on("input", function () {
      const keyword = $input.val().toLowerCase();
      $list.empty();
      if (!keyword) return;

      const filtered = dataMakanan.filter((m) =>
        m.nama.toLowerCase().includes(keyword)
      );
      filtered.forEach((item) => {
        const option = $('<div class="autocomplete-item"></div>').text(
          item.nama
        );
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
        <tr><td>Kalori</td>${data
          .map((m) => `<td>${m.kalori} kkal</td>`)
          .join("")}</tr>
        <tr><td>Protein</td>${data
          .map((m) => `<td>${m.protein} g</td>`)
          .join("")}</tr>
        <tr><td>Lemak</td>${data
          .map((m) => `<td>${m.lemak} g</td>`)
          .join("")}</tr>
        <tr><td>Karbohidrat</td>${data
          .map((m) => `<td>${m.karbohidrat} g</td>`)
          .join("")}</tr>
        <tr><td>Vitamin</td>${data
          .map((m) => `<td>${m.vitamin || "-"}</td>`)
          .join("")}</tr>
      </tbody>
    </table>`;

    const rekomendasi = data.reduce((a, b) => (a.protein > b.protein ? a : b));
    tabel += `<div class="alert alert-info">Rekomendasi: <strong>${rekomendasi.nama}</strong> memiliki kandungan protein tertinggi.</div>`;
    $("#hasilPerbandingan").html(tabel);
  }
});

// script informasi.html

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const namaMakanan = urlParams.get("nama");
  const makanan = dataMakanan.find(
    (m) => m.nama.toLowerCase() === namaMakanan?.toLowerCase()
  );

  if (makanan) {
    $("#judulMakanan").text(makanan.nama);
    $("#infoGizi").html(`
       <div class="col-md-6">
        <div class="card">
           <div class="card-body">
            <h5 class="card-title">${makanan.nama}</h5>
            <img src="${makanan.gambar}" class="card-img" alt="...">
            <p class="card-text">${
              makanan.deskripsi || "Tidak ada deskripsi."
            }</p>
            <ul class="list-group list-group-flush">
               <li class="list-group-item">Kalori: ${makanan.kalori} kkal</li>
              <li class="list-group-item">Protein: ${makanan.protein} g</li>
              <li class="list-group-item">Lemak: ${makanan.lemak} g</li>
              <li class="list-group-item">Karbohidrat: ${
                makanan.karbohidrat
              } g</li>
              <li class="list-group-item">Vitamin: ${
                makanan.vitamin || "-"
              }</li>
            </ul>
          </div>
        </div>
            
      </div>
    `);
  } else {
    $("#infoGizi").html('<p class="text-center">Makanan tidak ditemukan.</p>');
  }
});

// kategori sederhana berdasarkan data makanan
$(document).ready(function () {
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
                    <div class="card-body">
                      <h5 class="card-title">${makanan.nama}</h5>
                      <img src="${makanan.gambar}" class="card-img" alt="...">
                      <p class="card-text">${
                        makanan.deskripsi || "Klik untuk lihat detail"
                      }</p>
                      <a href="informasi.html?nama=${encodeURIComponent(
                        makanan.nama
                      )}" class="btn btn-success">Lihat Gizi</a>
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
