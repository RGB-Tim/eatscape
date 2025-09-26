// js/script.js

// ====================
// NAVBAR
// ====================
// Keren buatan ega no AI asli no fake
const menu = document.getElementById("menu");

function toggleMenu() {
  menu.classList.toggle("hidden");
}

// Force tampil di layar besar (≥64rem)
function checkScreen() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  if (window.innerWidth >= 64 * rem) {
    menu.classList.add("hidden");
  }
}

// Run once on load and whenever screen resizes
checkScreen();
window.addEventListener("resize", checkScreen);

// ====================
// DATA JSON
// ====================
let dataMakanan = [];


const body = document.getElementById('body');

window.addEventListener('load', function () {
  document.body.classList.add('show');
})


// Load data makanan dari JSON
function loadDataMakanan() {
  return fetch("/js/data-makanan.json")
    .then((response) => {
      if (!response.ok) throw new Error("Gagal memuat data");
      return response.json();
    })
    .then((data) => {
      dataMakanan = data;
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });
}

// ====================
// INIT APP
// ====================
function initApp() {
  $(document).ready(function () {
    const $searchInput = $("#searchInput");
    const $searchResults = $("#searchResults");

    // === SEARCH ===
    if ($searchInput.length) {
      $searchInput.on("input", function () {
        const query = $(this).val().toLowerCase();
        $searchResults.empty();

        if (query.length === 0) {
          return;
        }

        const hasil = dataMakanan.filter((makanan) =>
          makanan.nama.toLowerCase().includes(query)
        );

        if (hasil.length > 0) {
          hasil.forEach((makanan) => {
            const card = `
              <a href="/html/informasi.html?nama=${encodeURIComponent(
              makanan.nama
            )}" class="rubik-r m-2 flex gap-2">
                <img class="h-14 w-14 object-cover" src="${makanan.gambar
              }" alt="${makanan.nama}">
                <div class="py-2">
                  <p>${makanan.nama}</p>
                  <p class="text-sm">${makanan.deskripsi}</p>
                </div>
              </a>
            `;
            $searchResults.append(card);
          });
        } else {
          $searchResults.html(
            '<div class="m-5"><h1 class="ibm-plex-serif-regular text-3xl">¯\\_(ツ)_/¯</h1><br><h1 class="rubik-r text-sm">Makanan tidak ditemukan..</h1></div>'
          );
        }
      });
    }

    // === AUTOCOMPLETE untuk bandingkan.html ===
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

      const rekomendasi = data.reduce((a, b) =>
        (a.protein || 0) > (b.protein || 0) ? a : b
      );
      tabel += `<div class="alert alert-info">Rekomendasi: <strong>${rekomendasi.nama}</strong> memiliki kandungan protein tertinggi.</div>`;
      $("#hasilPerbandingan").html(tabel);
    }

    // === INFORMASI.HTML ===
    if (window.location.pathname.includes("informasi.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const namaMakanan = urlParams.get("nama");

      const makanan = dataMakanan.find(
        (m) => m.nama.toLowerCase() === namaMakanan?.toLowerCase()
      );

      if (makanan) {
        // Judul utama
        document.getElementById("judulMakanan").textContent = makanan.nama;

        // Bagian kanan (produk)
        document.getElementById("gambarMakanan").src = makanan.gambar;
        document.getElementById("gambarMakanan").alt = makanan.nama;
        // document.getElementById("namaMakanan").textContent = makanan.nama;
        document.getElementById("deskripsiMakanan").textContent =
          makanan.deskripsi || "Tidak ada deskripsi.";
        document.getElementById("sajianMakanan").textContent =
          makanan.sajian || "";

        // Box highlight
        document.getElementById("kaloriBox").textContent =
          makanan.kalori + " kkal";
        document.getElementById("proteinBox").textContent =
          makanan.protein + " g";
        document.getElementById("lemakBox").textContent = makanan.lemak + " g";
        document.getElementById("karboBox").textContent =
          makanan.karbohidrat + " g";

        // Link sumber
        document.getElementById("sumberLink").href = makanan.sumber;

        // Tabel gizi (pakai garis per baris)
        document.getElementById("tabelGizi").innerHTML = `
          <tr><td class="p-2 font-medium">Kalori</td><td class="p-2">${makanan.kalori
          } kkal</td></tr>
          <tr><td class="p-2 font-medium">Protein</td><td class="p-2">${makanan.protein
          } g</td></tr>
          <tr><td class="p-2 font-medium">Lemak</td><td class="p-2">${makanan.lemak
          } g</td></tr>
          <tr><td class="p-2 font-medium">Karbohidrat</td><td class="p-2">${makanan.karbohidrat
          } g</td></tr>
          <tr><td class="p-2 font-medium">Vitamin</td><td class="p-2">${makanan.vitamin || "-"
          }</td></tr>
        `;

        // Hitung AKG
        const persenAKG = ((makanan.kalori / 2000) * 100).toFixed(1);
        document.getElementById(
          "infoAKG"
        ).textContent = `${persenAKG}% dari AKG* (berdasarkan 2000 kkal per hari)`;

        // Update progress bar
        document.getElementById("progressAKG").style.width = `${persenAKG}%`;

        // Pie chart (3 makro utama)
        const total =
          (makanan.protein || 0) +
          (makanan.lemak || 0) +
          (makanan.karbohidrat || 0);
        if (total > 0) {
          const persenProtein = ((makanan.protein / total) * 100).toFixed(0);
          const persenLemak = ((makanan.lemak / total) * 100).toFixed(0);
          const persenKarbo = ((makanan.karbohidrat / total) * 100).toFixed(0);

          const pie = document.getElementById("pie-chart");

          // Animasi increment
          let progress = 0;
          const anim = setInterval(() => {
            if (progress >= 100) {
              clearInterval(anim);
            } else {
              progress += 1.5;
              const proteinEnd = (persenProtein / 100) * progress;
              const lemakEnd = (persenLemak / 100) * progress;
              const karboEnd = (persenKarbo / 100) * progress;

              pie.style.background = `
              conic-gradient(
                #ef4444 0% ${proteinEnd}%,
                #f59e0b ${proteinEnd}% ${proteinEnd + lemakEnd}%,
                #3b82f6 ${proteinEnd + lemakEnd}% ${proteinEnd + lemakEnd + karboEnd}%
              )
            `;
            }
          }, 30);

          document.getElementById("detailChart").innerHTML = `
            <p><span class="inline-block w-3 h-3 bg-red-500 rounded-sm mr-2"></span> Protein: ${persenProtein}%</p>
            <p><span class="inline-block w-3 h-3 bg-amber-500 rounded-sm mr-2"></span> Lemak: ${persenLemak}%</p>
            <p><span class="inline-block w-3 h-3 bg-blue-500 rounded-sm mr-2"></span> Karbohidrat: ${persenKarbo}%</p>
          `;
        }
      } else {
        document.querySelector("main").innerHTML =
          '<p class="text-center text-red-500">Makanan tidak ditemukan.</p>';
      }
    }

    // === ACCORDION GIZI ===
    $(".accordion").click(function () {
      $(".content").not($(this).next()).slideUp();
      $(".accordion span").not($(this).find("span")).removeClass("rotate-180");

      $(this).next(".content").slideToggle();
      $(this).find("span").toggleClass("rotate-180");
    });

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
                  <div class="card-body">
                    <h5 class="card-title">${makanan.nama}</h5>
                    <img src="${makanan.gambar}" class="h-5" alt="${makanan.nama
              }">
                    <p class="card-text">${makanan.deskripsi || "Klik untuk lihat detail"
              }</p>
                    <a href="/html/informasi.html?nama=${encodeURIComponent(
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
}

// ====================
// RUN
// ====================
loadDataMakanan().then(() => {
  initApp();
  // === COMPARE ===
  if (window.location.pathname.includes("html/bandingkan.html")) {

    // --- dropdown ---
    function setupCompareAutocomplete(inputId, suggestId) {
      const $input = $(inputId);
      const $suggest = $(suggestId);

      $input.on("input", function () {
        const kw = $input.val().toLowerCase().trim();
        $suggest.empty().addClass("hidden");
        if (!kw) return;

        const filtered = dataMakanan.filter(m => m.nama.toLowerCase().includes(kw));
        if (!filtered.length) return;

        filtered.forEach(item => {
          const $opt = $(`<div class="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50">${item.nama}</div>`);
          $opt.on("click", () => {
            $input.val(item.nama);
            $suggest.empty().addClass("hidden");
          });
          $suggest.append($opt);
        });
        $suggest.removeClass("hidden");
      });

      $input.on("blur", () => setTimeout(() => $suggest.addClass("hidden"), 150));
    }

    setupCompareAutocomplete("#food1", "#suggest1");
    setupCompareAutocomplete("#food2", "#suggest2");

    // --- field map ---
    const FIELD_MAP = [
      { key: "kalori", label: "Kalori", max: 500, unit: "kkal" },
      { key: "lemak", label: "Lemak", max: 100, unit: "g" },
      { key: "karbohidrat", label: "Karbohidrat", max: 100, unit: "g" },
      { key: "protein", label: "Protein", max: 50, unit: "g" },
    ];

    function saveCompareToStorage(names) {
      localStorage.setItem("compareFoods", JSON.stringify(names));
    }

    function loadCompareFromStorage() {
      try {
        const raw = localStorage.getItem("compareFoods");
        if (!raw) return [];
        return JSON.parse(raw);
      } catch {
        return [];
      }
    }

    // --- card makanan ---
    function createCard(food) {
      const bars = FIELD_MAP.map(f => {
        const val = Number(food[f.key] ?? 0);
        return `
      <div class="mb-3">
        <div class="text-sm font-medium text-gray-700 mb-1">${f.label}</div>
        <div class="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
          <div class="h-full w-[70%] bg-gradient-to-r from-blue-600 to-blue-400 text-xs text-white flex items-center justify-center"
               data-value="${val}" data-max="${f.max}">
            ${val ? `${val} ${f.unit}` : "-"}
          </div>
        </div>
      </div>`;
      }).join("");

      // vitamin (langsung teks, tanpa bar)
      let vitaminHTML = "";
      if (food.vitamin) {
        vitaminHTML = `
      <div class="mt-4">
        <div class="text-sm font-medium text-gray-700 mb-1">Vitamin</div>
        <p class="text-sm text-gray-600">${food.vitamin}</p>
      </div>
    `;
      }

      return `
    <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6 flex flex-col">
      
      <!-- Gambar makanan -->
      <div class="w-full flex justify-center mb-4">
        <img src="${food.gambar || '../images/no-image.png'}" 
             alt="${food.nama}" 
             class="w-40 h-40 object-cover rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
      </div>

      <!-- Nama -->
      <h3 class="text-lg font-bold text-gray-800 text-center mb-4">${food.nama}</h3>

      <!-- Bars -->
      ${bars}

      <!-- Vitamin -->
      ${vitaminHTML}

      <!-- Tombol detail -->
      <a href="/html/informasi.html?nama=${encodeURIComponent(food.nama)}"
         class="mt-5 block w-full text-center px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition hover:underline">
        Cek Makanan
      </a>
    </div>`;
    }

    function renderCompare(nama1, nama2) {
      const food1 = dataMakanan.find(m => m.nama.toLowerCase() === nama1.toLowerCase());
      const food2 = dataMakanan.find(m => m.nama.toLowerCase() === nama2.toLowerCase());

      if (!food1 || !food2) {
        alert("Makanan tidak ditemukan dalam database JSON.");
        return;
      }

      const html = `
      ${createCard(food1)}
      <div class="hidden md:flex items-center justify-center">
        <span class="text-8xl font-extrabold text-black-700 mt-10">VS</span>
      </div>
      ${createCard(food2)}
    `;
      $("#compareContent").html(html);

      $("#compareInputSection").addClass("hidden");
      $("#compareOutputSection").removeClass("hidden");

      // animasi progresssssss
      $("#compareContent").find("[data-value]").each(function () {
        const $bar = $(this);
        const value = parseFloat($bar.data("value")) || 0;
        const max = parseFloat($bar.data("max")) || 100;
        const pct = Math.min(100, Math.max(0, (value / max) * 100));
        setTimeout(() => $bar.css("width", pct + "%"), 800);
      });
    }

    // --- tombol bandingkan ---
    $("#compareBtn").on("click", function () {
      const nama1 = $("#food1").val().trim();
      const nama2 = $("#food2").val().trim();

      if (!nama1 || !nama2) {
        alert("Makanan yang dibandingkan minimal 2.");
        return;
      }

      saveCompareToStorage([nama1, nama2]);
      renderCompare(nama1, nama2);
    });

    // --- tombol kembali ---
    $("#backToInput").on("click", function () {
      // hapus localStorage
      localStorage.removeItem("lastCompare");

      // sembunyikan hasil, tampilkan input
      $("#compareOutputSection").addClass("hidden");
      $("#compareInputSection").removeClass("hidden");
    });
    const saved = loadCompareFromStorage();
    if (saved.length === 2) {
      $("#food1").val(saved[0]);
      $("#food2").val(saved[1]);
      renderCompare(saved[0], saved[1]);
    }

    // --- grid rekomendasi ---
    const $grid = $("#foodGrid");
    if ($grid.length && Array.isArray(dataMakanan)) {
      const items = dataMakanan.slice(0, 8).map(m => `
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-4 flex flex-col">
        <img src="${m.gambar}" alt="${m.nama}" class="w-full h-32 object-contain mb-3">
        <h4 class="font-semibold text-gray-800 line-clamp-2 h-12">${m.nama}</h4>
        <p class="text-xs text-gray-500 line-clamp-2 h-8">${m.deskripsi || ""}</p>
        <a href="/html/informasi.html?nama=${encodeURIComponent(m.nama)}"
           class="mt-auto inline-flex justify-center items-center px-3 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition">
          Cek Makanan
        </a>
      </div>
    `).join("");
      $grid.html(items);
    }
  }
});
