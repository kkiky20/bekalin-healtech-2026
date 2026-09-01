# BEKALIN

### Best Clinical Logistics Integration Network

**Clinical Supply Coordination Platform for Smarter Hospital Logistics**

---

## 🏆 Front-Line Code Challenge — HealTech 2026

**Tema:**
**MEDISTOCK: Precision Management for Clinical Supply Chain**

**Nama Tim:**
`SEGOPADANK`

**Anggota Tim:**

1. `Muhammad Rizky Al-Aziz`
2. `Inas Hasna Mufida`


---

# 📌 Tentang BEKALIN

**BEKALIN (Best Clinical Logistics Integration Network)** adalah platform digital untuk membantu rumah sakit mengelola dan mengoordinasikan kebutuhan logistik klinis secara lebih terstruktur, terukur, dan terintegrasi.

BEKALIN dirancang untuk mendukung pengelolaan obat, alat kesehatan, dan bahan medis habis pakai melalui monitoring stok, pengajuan kebutuhan, validasi dan persetujuan, redistribusi stok, distribusi, hingga penerimaan barang.

BEKALIN berfokus pada pengelolaan dan koordinasi kebutuhan:

* Obat
* Alat kesehatan
* Bahan medis habis pakai
* Persediaan logistik klinis

Platform ini menghubungkan proses monitoring ketersediaan stok dengan pengajuan kebutuhan, validasi, persetujuan, redistribusi, distribusi, penerimaan, monitoring, pelaporan, dan audit aktivitas.

Tujuan utama BEKALIN adalah membantu menciptakan proses pengelolaan clinical supply chain yang lebih transparan, terkoordinasi, dan mudah dipantau oleh pihak terkait.

---

# 🎯 Latar Belakang

Pengelolaan logistik klinis membutuhkan koordinasi yang baik antara ketersediaan persediaan dan kebutuhan setiap unit pelayanan.

Permasalahan tidak hanya muncul ketika stok habis, tetapi juga ketika:

* Informasi stok tidak mudah dipantau.
* Kebutuhan antar unit tidak terkoordinasi.
* Proses permintaan membutuhkan validasi dan persetujuan.
* Stok yang tersedia pada suatu unit belum dimanfaatkan untuk memenuhi kebutuhan unit lain.
* Proses distribusi sulit dipantau.
* Penerimaan barang dapat memiliki perbedaan jumlah dengan barang yang dikirim.
* Riwayat perubahan data sulit ditelusuri.
* Informasi operasional tersebar pada beberapa proses.

BEKALIN dirancang untuk mengintegrasikan proses tersebut dalam satu platform.

---

# 💡 Solusi

BEKALIN menyediakan alur koordinasi clinical supply chain:

```text
Monitoring Stok
      ↓
Permintaan Logistik
      ↓
Validasi
      ↓
Persetujuan
      ↓
Pemenuhan / Redistribusi
      ↓
Distribusi
      ↓
Penerimaan
      ↓
Monitoring
      ↓
Laporan & Analitik
      ↓
Audit Trail
```

---

# ✨ Fitur Utama

### ⚡ Live Requisition

Pengajuan kebutuhan logistik secara digital dengan pemantauan status permintaan secara real-time.

**Alur status:**

```text
Pending → Prepping → Ready → Received
```

### 📦 Auto-Kitting

Pengelolaan kebutuhan dalam bentuk bundle atau kit sehingga beberapa item dapat diproses secara bersamaan dan stok diperbarui berdasarkan komponen kit.

### 📊 Inventory Monitoring

Monitoring ketersediaan, penggunaan, dan kondisi stok logistik klinis secara terpusat.

### 🔄 Stock Redistribution

Mendukung redistribusi stok antarunit untuk mengoptimalkan persediaan yang tersedia sebelum dilakukan pengadaan tambahan.

### 🚚 Distribution Tracking

Memantau proses pemenuhan dan distribusi barang dari sumber persediaan hingga diterima oleh unit yang membutuhkan.

### 📥 Receiving & Verification

Mencatat penerimaan barang serta membantu melakukan verifikasi antara jumlah barang yang dikirim dan jumlah yang diterima.

### 📈 Reporting & Analytics

Menyediakan informasi dan ringkasan data logistik untuk membantu monitoring, evaluasi, dan pengambilan keputusan.

### 🧾 Audit Trail

Mencatat aktivitas dan perubahan data sehingga proses pengelolaan logistik dapat ditelusuri dengan lebih transparan.

---

# 🎯 Tujuan BEKALIN

BEKALIN dikembangkan untuk membantu rumah sakit membangun **clinical supply chain yang lebih terintegrasi, transparan, dan responsif**.

Tujuan utama BEKALIN meliputi:

* **Meningkatkan visibilitas stok** agar kondisi persediaan dapat dipantau dengan lebih mudah.
* **Mempercepat koordinasi kebutuhan** antara unit pelayanan dan pihak pengelola logistik.
* **Mengoptimalkan pemanfaatan stok** melalui koordinasi pemenuhan dan redistribusi antarunit.
* **Meningkatkan akurasi distribusi dan penerimaan** melalui pencatatan serta verifikasi barang.
* **Mempermudah monitoring dan evaluasi** melalui data, laporan, dan analitik.
* **Meningkatkan transparansi proses** melalui pencatatan aktivitas dan audit trail.

Pada akhirnya, BEKALIN tidak hanya berfokus pada **ketersediaan stok**, tetapi juga memastikan bahwa logistik yang tersedia dapat **terkoordinasi, terlacak, dan sampai kepada unit yang membutuhkan secara tepat**.

---

# ⚙️ Cara Instalasi

Ikuti langkah berikut untuk menjalankan aplikasi BEKALIN di lingkungan lokal.

## 1. Prasyarat

Pastikan perangkat sudah terinstall:

* Node.js versi LTS
* npm
* Git

Periksa versi yang terinstall:

```bash
node -v
npm -v
git --version
```

## 2. Clone Repository

Clone repository BEKALIN menggunakan Git:

```bash
git clone [REPOSITORY_URL]
```

Masuk ke direktori project:

```bash
cd BEKALIN
```

## 3. Install Dependencies

Install seluruh dependencies yang dibutuhkan:

```bash
npm install
```

## 4. Konfigurasi Environment

Buat file `.env` pada root project dan masukkan konfigurasi yang diperlukan.

Contoh:

```env
DATABASE_URL=
API_URL=
```

> Sesuaikan variabel environment dengan konfigurasi project BEKALIN.

## 5. Jalankan Aplikasi

Jalankan development server:

```bash
npm run dev
```

Setelah server berjalan, buka alamat lokal yang ditampilkan pada terminal.

---

# 🚀 Ringkasan

**BEKALIN** mengintegrasikan proses clinical supply chain mulai dari **monitoring stok hingga audit aktivitas** dalam satu platform.

```text
        BEKALIN
           │
           ▼
   ┌─────────────────┐
   │  Monitoring Stok │
   └────────┬────────┘
            ↓
   ┌─────────────────┐
   │ Request &        │
   │ Validation       │
   └────────┬────────┘
            ↓
   ┌─────────────────┐
   │ Fulfillment /    │
   │ Redistribution   │
   └────────┬────────┘
            ↓
   ┌─────────────────┐
   │ Distribution &   │
   │ Receiving        │
   └────────┬────────┘
            ↓
   ┌─────────────────┐
   │ Reporting &      │
   │ Audit Trail      │
   └─────────────────┘
```

> **BEKALIN — Connecting Clinical Needs with Smarter Supply Coordination.**