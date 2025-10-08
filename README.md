# Rocvon - Website dengan Sistem Routing

Proyek website pariwisata dengan sistem routing yang memungkinkan navigasi antar halaman tanpa reload browser.

## Struktur Folder

```
project-seo/
├── assets/                 # Semua asset website
│   ├── css/               # File CSS terpisah
│   │   ├── style.css      # CSS untuk halaman utama & routing
│   │   └── team.css       # CSS untuk halaman tim
│   ├── images/            # Folder gambar
│   │   └── team/          # Foto anggota tim dan dosen
│   └── js/                # File JavaScript
│       └── router.js      # Sistem routing client-side
├── pages/                 # Halaman tambahan
│   ├── tours.html         # Halaman paket tur
│   ├── about.html         # Halaman tentang kami
│   ├── booking.html       # Halaman form booking
│   ├── faq.html          # Halaman FAQ
│   └── team.html          # Halaman anggota kelompok dan dosen
├── index.html             # Halaman utama website
└── README.md              # Dokumentasi proyek
```

## Halaman

- **index.html**: Halaman utama dengan informasi layanan tur dan akomodasi
- **pages/tours.html**: Daftar paket tur wisata dengan harga dan deskripsi
- **pages/about.html**: Informasi tentang perusahaan dan visi misi
- **pages/booking.html**: Formulir pemesanan tur dan akomodasi
- **pages/faq.html**: Pertanyaan yang sering diajukan tentang layanan
- **pages/team.html**: Profil anggota tim dan dosen pengampu mata kuliah SEO

## Teknologi

- HTML5 dengan semantic markup
- CSS3 dengan CSS Variables & Grid/Flexbox
- Vanilla JavaScript untuk sistem routing
- Font Google Fonts (Poppins)
- Responsive design untuk semua device

## Sistem Routing

Website ini menggunakan sistem routing client-side yang memungkinkan navigasi antar halaman tanpa reload browser. Fitur ini memberikan pengalaman user yang lebih smooth dan modern.

### Cara Kerja Routing

1. **Hash-based Navigation**: Menggunakan URL hash (`#page-name`) untuk navigasi
2. **Dynamic Content Loading**: Konten halaman dimuat secara dinamis menggunakan JavaScript
3. **Browser History Support**: Mendukung tombol back/forward browser
4. **SEO-friendly**: File terpisah untuk setiap halaman tetap dapat diakses langsung

### Navigasi

- **Beranda**: `#home` atau `/`
- **Tur Kami**: `#tours`
- **Tentang**: `#about`
- **Booking**: `#booking`
- **FAQ**: `#faq`
- **Tim**: `#team`

### Contoh Penggunaan

```html
<!-- Menu Navigation -->
<nav>
  <a href="#tours">Tur Kami</a>
  <a href="#about">Tentang</a>
  <a href="#booking">Booking</a>
</nav>

<!-- Action Buttons -->
<button class="btn-book" href="#booking">Booking Sekarang</button>
<button class="see-all" href="#tours">Lihat Semua Tur</button>
```

## Cara Menjalankan

1. **Development Server**:
   ```bash
   python -m http.server 8000
   # atau
   npx serve .
   ```

2. **View Website**: Buka `http://localhost:8000` di browser

3. **Production**: Upload semua file ke web server dengan struktur folder yang sama
