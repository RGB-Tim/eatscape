// js/data-makanan.js ini bisa jadi .json ga ya?

const dataMakanan = [
    // ==== MAKANAN KEMASAN ====
  {
    nama: "Indomie Mi Goreng",
    gambar: "images/indomie_mi_goreng.jpg",
    deskripsi: "Mi instan goreng rasa original. Per 1 bungkus (±80 g).",
    kategori: "Makanan Kemasan",
    kalori: 350,
    protein: 8.0,
    lemak: 12.0,
    karbohidrat: 52.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/indomie/mi-goreng/1-bungkus"
  },
  {
    nama: "Indomie Mi Goreng Rendang",
    gambar: "images/indomie_mi_goreng_rendang.jpg",
    deskripsi: "Mi instan goreng rasa rendang. Per 1 bungkus (±85 g).",
    kategori: "Makanan Kemasan",
    kalori: 440,
    protein: 8.0,
    lemak: 20.0,
    karbohidrat: 57.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/indomie/mi-goreng-rendang/1-bungkus"
  },
  {
    nama: "Qtela Tempe Original",
    gambar: "images/qtela_tempe_original.jpg",
    deskripsi: "Keripik tempe rasa original.",
    kategori: "Makanan Kemasan",
    kalori: 110,
    protein: 4.0,
    lemak: 7.0,
    karbohidrat: 8.0,
    vitamin: "-",
    sumber: "https://nilaigizi.com/gizi/detailproduk/2438/nilai-kandungan-gizi-qtela-tempe-original"
  },
  {
    nama: "Chitato Rasa Sapi Panggang",
    gambar: "images/chitato_sapi_panggang.jpg",
    deskripsi: "Keripik kentang bergelombang rasa sapi panggang. Per 1 porsi (±20 g).",
    kategori: "Makanan Kemasan",
    kalori: 110,
    protein: 2.0,
    lemak: 6.0,
    karbohidrat: 11.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/chitato/sapi-panggang/1-porsi"
  },
  {
    nama: "Oreo Original (3 keping)",
    gambar: "images/oreo_original.jpg",
    deskripsi: "Biskuit sandwich krim vanila. Per 3 keping (±28 g).",
    kategori: "Makanan Kemasan",
    kalori: 130,
    protein: 1.0,
    lemak: 6.0,
    karbohidrat: 20.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/search?q=Oreo%20Original"
  },

  // ==== CEPAT SAJI ====
  {
    nama: "KFC Ayam Dada Crispy",
    gambar: "images/kfc_dada_crispy.jpg",
    deskripsi: "Ayam goreng bagian dada (crispy). Per 1 potong (±181 g).",
    kategori: "Cepat Saji",
    kalori: 520,
    protein: 36.0,
    lemak: 34.0,
    karbohidrat: 18.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/umum/kfc-ayam-dada/1-potong"
  },
  {
    nama: "KFC Sayap Crispy",
    gambar: "images/kfc_sayap_crispy.jpg",
    deskripsi: "Ayam goreng bagian sayap (crispy). Per 1 sayap.",
    kategori: "Cepat Saji",
    kalori: 170,
    protein: 10.0,
    lemak: 13.0,
    karbohidrat: 5.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/kfc/crispy-chicken-wing/1-wing"
  },
  {
    nama: "Pizza Hut Meat Lovers (Large Slice)",
    gambar: "images/pizzahut_meatlovers_large_slice.jpg",
    deskripsi: "Pizza topping daging. Per 1 potong besar (±175 g).",
    kategori: "Cepat Saji",
    kalori: 470,
    protein: 19.0,
    lemak: 28.0,
    karbohidrat: 36.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/pizza-hut/meat-lovers-%28large-slice%29/1-large-slice"
  },

  // ==== TINGGI KARBO ====
  {
    nama: "Nasi Goreng",
    sajian: "Per 1 porsi (±200 g)",
    gambar: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1625125198/attached_image/cara-lebih-sehat-membuat-nasi-goreng.jpg",
    deskripsi: "Nasi goreng rumahan.",
    kategori: "Tinggi Karbo",
    kalori: 500,
    protein: 7.0,
    lemak: 34.4,
    karbohidrat: 40.2,
    vitamin: "E, B2, B6",
    sumber: "https://nilaigizi.com/gizi/detailproduk/1160/nilai-kandungan-gizi-nasi-goreng"
  },
  {
    nama: "Lontong",
    gambar: "images/lontong.jpg",
    deskripsi: "Beras yang dikukus dalam daun pisang. Per 100 g.",
    kategori: "Tinggi Karbo",
    kalori: 102,
    protein: 3.0,
    lemak: 2.1,
    karbohidrat: 17.8,
    vitamin: "-",
    sumber: "https://nilaigizi.com/gizi/detailproduk/4346/Lontong"
  },
  {
    nama: "Quaker Whole Rolled Oats",
    gambar: "images/quaker_whole_rolled_oats.jpg",
    deskripsi: "Oat utuh gulung. Per 100 g.",
    kategori: "Tinggi Karbo",
    kalori: 400,
    protein: 12.5,
    lemak: 10.0,
    karbohidrat: 67.5,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/quaker/whole-rolled-oats/100g"
  },
  {
    nama: "Roti Tawar Putih",
    gambar: "images/roti_tawar_putih.jpg",
    deskripsi: "Roti tawar biasa. Per 1 lembar (±25 g).",
    kategori: "Tinggi Karbo",
    kalori: 67,
    protein: 2.0,
    lemak: 0.9,
    karbohidrat: 12.4,
    vitamin: "B1, B3",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/umum/roti-tawar/1-slice"
  },

  // ==== MINUMAN ====
  {
    nama: "Teh Botol Sosro",
    gambar: "images/teh_botol_sosro.jpg",
    deskripsi: "Teh manis siap minum. Per 1 botol (±350 ml).",
    kategori: "Minuman",
    kalori: 80,
    protein: 0.0,
    lemak: 0.0,
    karbohidrat: 19.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/sosro/teh-botol/1-porsi"
  },
  {
    nama: "Teh Pucuk Harum",
    gambar: "images/teh_pucuk_harum.jpg",
    deskripsi: "Teh manis siap minum. Per 1 botol (±350 ml).",
    kategori: "Minuman",
    kalori: 75,
    protein: 0.0,
    lemak: 0.0,
    karbohidrat: 19.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/pucuk-harum/teh-pucuk-harum/1-botol"
  },
  {
    nama: "Aqua Air Mineral",
    gambar: "images/aqua_air_mineral.jpg",
    deskripsi: "Air mineral dalam kemasan. Per 1 botol (±600 ml).",
    kategori: "Minuman",
    kalori: 0,
    protein: 0.0,
    lemak: 0.0,
    karbohidrat: 0.0,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/aqua/air-mineral/1-botol"
  },
  {
    nama: "Soda (Kaleng 350 ml)",
    gambar: "images/soda_kaleng.jpg",
    deskripsi: "Minuman bersoda. Per 1 kaleng (±350 ml).",
    kategori: "Minuman",
    kalori: 140,
    protein: 0.26,
    lemak: 0.04,
    karbohidrat: 36.05,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/umum/soda?portionamount=1%2C000&portionid=419106"
  },
  {
    nama: "Ultra Milk UHT Full Cream (200 ml)",
    gambar: "images/ultra_milk_fullcream_200.jpg",
    deskripsi: "Susu UHT full cream. Per 1 pak (200 ml).",
    kategori: "Minuman",
    kalori: 120,
    protein: 6.0,
    lemak: 6.0,
    karbohidrat: 10.0,
    vitamin: "A, D",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/ultra-milk/susu-uht-full-cream-%28200ml%29/1-pak"
  },

  // ==== BUAH ====
  {
    nama: "Jeruk Manis (segar)",
    gambar: "images/jeruk_manis.jpg",
    deskripsi: "Jeruk manis segar. Per 100 g BDD.",
    kategori: "Buah",
    kalori: 45,
    protein: 0.9,
    lemak: 0.2,
    karbohidrat: 11.2,
    vitamin: "C, B1, B2",
    sumber: "https://nilaigizi.com/gizi/detailproduk/3856/Jeruk-manis%2C-segar"
  },
  {
    nama: "Pisang Ambon (segar)",
    gambar: "images/pisang_ambon.jpg",
    deskripsi: "Pisang ambon segar. Per 100 g BDD.",
    kategori: "Buah",
    kalori: 108,
    protein: 1.0,
    lemak: 0.8,
    karbohidrat: 24.3,
    vitamin: "C, B2, B1",
    sumber: "https://nilaigizi.com/gizi/detailproduk/3751/Pisang-ambon%2C-segar"
  },
  {
    nama: "Alpukat (segar)",
    gambar: "images/alpukat.jpg",
    deskripsi: "Alpukat segar. Per 100 g BDD.",
    kategori: "Buah",
    kalori: 85,
    protein: 0.9,
    lemak: 6.5,
    karbohidrat: 7.7,
    vitamin: "C, B1, B2, B3",
    sumber: "https://nilaigizi.com/gizi/detailproduk/3226/Alpukat%2C-segar"
  },

  // ==== SAYUR / SUP ====
  {
    nama: "Soto Madura",
    gambar: "images/soto_madura.jpg",
    deskripsi: "Soto daging khas Madura. Per 100 g.",
    kategori: "Sayur/Sup",
    kalori: 42,
    protein: 3.9,
    lemak: 1.7,
    karbohidrat: 2.8,
    vitamin: "A (beta-karoten)",
    sumber: "https://nilaigizi.com/gizi/detailproduk/849/nilai-kandungan-gizi-soto-madura-masakan"
  },
  {
    nama: "Sayur Sop",
    gambar: "images/sayur_sop.jpg",
    deskripsi: "Sup sayuran rumahan. Per 1 porsi umum.",
    kategori: "Sayur/Sup",
    kalori: 126,
    protein: 4.8,
    lemak: 8.5,
    karbohidrat: 7.7,
    vitamin: "-",
    sumber: "https://www.fatsecret.co.id/kalori-gizi/umum/sayur-sop/1-porsi"
  },

  // ==== MAKANAN MIE ====
  {
    nama: "Mie Bakso",
    gambar: "images/mie_bakso.jpg",
    deskripsi: "Mi dengan bakso dan kuah (lihat sumber untuk takaran).",
    kategori: "Makanan Mie",
    kalori: 114,
    protein: 5.3,
    lemak: 3.0,
    karbohidrat: 16.4,
    vitamin: "A, B1",
    sumber: "https://nilaigizi.com/gizi/detailproduk/107/nilai-kandungan-gizi-mie-bakso"
  },

  // ==== CAMILAN TRADISIONAL ====
  {
    nama: "Intip Goreng",
    gambar: "images/intip_goreng.jpg",
    deskripsi: "Kerak nasi goreng (snack). Per 100 g.",
    kategori: "Camilan",
    kalori: 474,
    protein: 7.6,
    lemak: 21.6,
    karbohidrat: 62.3,
    vitamin: "B1",
    sumber: "https://nilaigizi.com/gizi/detailproduk/71/nilai-kandungan-gizi-intip-goreng"
  },

  // ==== PROTEIN HEWANI ====
  {
    nama: "Telur Ceplok (goreng)",
    gambar: "images/telur_ceplok.jpg",
    deskripsi: "Telur goreng mata sapi. Per 1 porsi.",
    kategori: "Protein Hewani",
    kalori: 196,
    protein: 14.0,
    lemak: 15.0,
    karbohidrat: 0.9,
    vitamin: "A",
    sumber: "https://nilaigizi.com/gizi/detailproduk/1191/nilai-kandungan-gizi-telur-goreng-telur-ceplok"
  }
  
];