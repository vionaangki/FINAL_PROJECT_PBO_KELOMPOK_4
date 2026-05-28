/**
 * SISTEM SEWA MOBIL - OOP JAVASCRIPT & MANAJEMEN DATA LENGKAP (CRUD)
 */

// ==========================================
// 1. KELAS & ENKAPSULASI
//    - Membuat kelas dasar dengan atribut dan metode
//    - Implementasi getter/setter (enkapsulasi)
// ==========================================

/**
 * Kelas dasar EntitasDasar yang beroperasi sebagai model utama
 * yang merangkum data ID unik dan waktu pembuatannya.
 */
class EntitasDasar {
    constructor() {
        if (this.constructor === EntitasDasar) {
            throw new Error("Class 'EntitasDasar' adalah abstract class dan tidak bisa diinstansiasi langsung.");
        }
        this._id = this.generateId();
        this._createdAt = new Date().toISOString();
    }

    generateId() {
        return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit ID acak
    }

    // Penerapan Enkapsulasi: Menggunakan Getter untuk ID yang bersifat read-only
    get id() {
        return this._id;
    }

    get createdAt() {
        return this._createdAt;
    }

    // Metode abstrak wajib diimplementasikan oleh kelas turunan
    getDetailSummary() {
        throw new Error("Method 'getDetailSummary()' wajib diimplementasikan di subclass.");
    }
}

/**
 * Kelas Pelanggan mewarisi EntitasDasar (Kelas & Enkapsulasi)
 * Memiliki validasi properti sensitif seperti NIK dan Kata Sandi via Setter.
 */
class Pelanggan extends EntitasDasar {
    constructor(namaLengkap, nik, email, whatsapp, password, role = 'pelanggan') {
        super();
        this.namaLengkap = namaLengkap;
        this.nik = nik; // Memicu validasi setter nik
        this.email = email;
        this.whatsapp = whatsapp;
        this.password = password; // Memicu validasi setter password
        this._role = role; 
    }

    // Getter & Setter namaLengkap
    get namaLengkap() { return this._namaLengkap; }
    set namaLengkap(val) { 
        if (!val || val.trim() === "") throw new Error("Nama lengkap tidak boleh kosong.");
        this._namaLengkap = val.trim(); 
    }

    // Enkapsulasi NIK KTP dengan validasi ketat wajib tepat 16 digit
    get nik() { return this._nik; }
    set nik(val) {
        const cleanNik = val.toString().trim();
        if (cleanNik.length !== 16) {
            throw new Error("NIK KTP wajib tepat 16 digit.");
        }
        this._nik = cleanNik;
    }

    get email() { return this._email; }
    set email(val) { this._email = val; }

    get whatsapp() { return this._whatsapp; }
    set whatsapp(val) { this._whatsapp = val; }

    // Enkapsulasi Password dengan validasi minimal 6 karakter, wajib angka dan simbol
    get password() { return this._password; }
    set password(val) {
        const hasNumber = /\d/.test(val);
        const hasSymbol = /[^A-Za-z0-9]/.test(val);
        if (val.length < 6 || !hasNumber || !hasSymbol) {
            throw new Error("Kata sandi lemah! Harus minimal 6 karakter dengan angka & simbol.");
        }
        this._password = val;
    }

    get role() { return this._role; }
    set role(val) { this._role = val; }

    getDetailSummary() {
        return `Pelanggan: ${this._namaLengkap} - NIK: ${this._nik} (${this._role})`;
    }
}

// ==========================================
// 2. ABSTRAK
//    - Membuat kelas turunan dari kelas dasar
//    - Implementasi kelas/antarmuka abstrak
// ==========================================

/**
 * Kelas Turunan: Merk Mobil (Subclass dari EntitasDasar)
 */
class Merk extends EntitasDasar {
    constructor(nama, asal) {
        super();
        this.nama = nama;
        this.asal = asal;
    }

    get nama() { return this._nama; }
    set nama(val) { 
        if (!val || val.trim() === "") throw new Error("Nama merk harus diisi.");
        this._nama = val.trim(); 
    }

    get asal() { return this._asal; }
    set asal(val) { this._asal = val ? val.trim() : "Jepang"; }

    // Mengimplementasikan metode abstrak dari kelas dasar (Polimorfisme)
    getDetailSummary() {
        return `Merk: ${this._nama} (Asal Negara: ${this._asal})`;
    }
}

/**
 * Kelas Turunan: Mobil (Subclass dari EntitasDasar)
 */
class Mobil extends EntitasDasar {
    constructor(nama, merkId, hargaPerHari, kapasitas, kategori = 'biasa', imgUrl = '', isTersedia = true) {
        super();
        this.nama = nama;
        this.merkId = merkId;
        this.hargaPerHari = hargaPerHari;
        this.kapasitas = kapasitas;
        this.kategori = kategori;
        this.imgUrl = imgUrl;
        this.isTersedia = isTersedia;
    }

    get nama() { return this._nama; }
    set nama(val) { this._nama = val; }

    get merkId() { return this._merkId; }
    set merkId(val) { this._merkId = val; }

    get hargaPerHari() { return this._hargaPerHari; }
    set hargaPerHari(val) {
        if (val < 0) throw new Error("Harga sewa tidak boleh bernilai negatif.");
        this._hargaPerHari = parseInt(val) || 0;
    }

    get kapasitas() { return this._kapasitas; }
    set kapasitas(val) { this._kapasitas = parseInt(val) || 4; }

    get kategori() { return this._kategori; }
    set kategori(val) { this._kategori = val; }

    get imgUrl() { return this._imgUrl; }
    set imgUrl(val) { this._imgUrl = val; }

    get isTersedia() { return this._isTersedia; }
    set isTersedia(val) { this._isTersedia = !!val; }

    // Mengimplementasikan metode abstrak dari kelas dasar (Polimorfisme)
    getDetailSummary() {
        return `Mobil: ${this._nama} - Tarif Harian: Rp ${this._hargaPerHari.toLocaleString('id-ID')}`;
    }
}

/**
 * Kelas Turunan: JenisBayar (Subclass dari EntitasDasar)
 */
class JenisBayar extends EntitasDasar {
    constructor(namaBank, norek, atasNama) {
        super();
        this.namaBank = namaBank;
        this.norek = norek;
        this.atasNama = atasNama;
    }

    get namaBank() { return this._namaBank; }
    set namaBank(val) { this._namaBank = val; }

    get norek() { return this._norek; }
    set norek(val) { this._norek = val; }

    get atasNama() { return this._atasNama; }
    set atasNama(val) { this._atasNama = val; }

    getDetailSummary() {
        return `${this._namaBank} - Rek: ${this._norek} (${this._atasNama})`;
    }
}

/**
 * Kelas Turunan: Transaksi (Subclass dari EntitasDasar)
 */
class Transaksi extends EntitasDasar {
    constructor(pelangganId, mobilId, tglMulai, tglSelesai, pakaiSopir, totalHarga) {
        super();
        this._pelangganId = pelangganId;
        this._mobilId = mobilId;
        this._tglMulai = tglMulai;
        this._tglSelesai = tglSelesai;
        this._pakaiSopir = pakaiSopir;
        this._totalHarga = totalHarga;
        this._status = 'Pending'; 
        this._buktiTransfer = ''; 
        this._bankTransfer = '';
    }

    get pelangganId() { return this._pelangganId; }
    get mobilId() { return this._mobilId; }
    get tglMulai() { return this._tglMulai; }
    get tglSelesai() { return this._tglSelesai; }
    get pakaiSopir() { return this._pakaiSopir; }
    get totalHarga() { return this._totalHarga; }

    get status() { return this._status; }
    set status(val) { this._status = val; }

    get buktiTransfer() { return this._buktiTransfer; }
    set buktiTransfer(val) { this._buktiTransfer = val; }

    get bankTransfer() { return this._bankTransfer; }
    set bankTransfer(val) { this._bankTransfer = val; }

    getDetailSummary() {
        return `Pemesanan #${this.id} Status: ${this._status} - Total: Rp ${this._totalHarga}`;
    }
}


// ==========================================
// 3. IMPLEMENTASI FITUR & CRUD
//    - Membuat fitur CRUD lengkap (Create, Read, Update, Delete)
//    - Validasi input pengguna
//    - Menu utama aplikasi
// ==========================================

const DATABASE_KEYS = {
    MERK: 'sewa_mobil_merk',
    MOBIL: 'sewa_mobil_armada',
    USER: 'sewa_mobil_pengguna',
    TRANSAKSI: 'sewa_mobil_transaksi',
    JENIS_BAYAR: 'sewa_mobil_jenis_bayar',
    SESSION: 'sewa_mobil_session',
    THEME: 'sewa_mobil_theme'
};

// Pengguna Admin & Pelanggan Awal (Database Seed)
const defaultUsers = [
    {
        _id: '1001',
        _namaLengkap: 'Admin',
        _nik: '1111222233334444',
        _email: 'admin@admin.com',
        _whatsapp: '081241277050',
        _password: 'admin123',
        _role: 'admin',
        _createdAt: new Date().toISOString()
    }
];

class AppStorage {
    static get(key, defaultValue) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    }

    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // READ: Memuat daftar awal dari HTML ke LocalStorage jika belum disetup
    static initializeDatabase() {
        if (!localStorage.getItem(DATABASE_KEYS.USER)) {
            this.set(DATABASE_KEYS.USER, defaultUsers);
        }
        if (!localStorage.getItem(DATABASE_KEYS.TRANSAKSI)) {
            this.set(DATABASE_KEYS.TRANSAKSI, []);
        }

        // Sinkronisasi data awal Merk dan Mobil dari elemen HTML agar aman & efisien
        const merkList = [
            { _id: '101', _nama: 'Toyota', _asal: 'Jepang', _createdAt: new Date().toISOString() },
            { _id: '102', _nama: 'Mitsubishi', _asal: 'Jepang', _createdAt: new Date().toISOString() },
            { _id: '103', _nama: 'Honda', _asal: 'Jepang', _createdAt: new Date().toISOString() },
            { _id: '104', _nama: 'Daihatsu', _asal: 'Jepang', _createdAt: new Date().toISOString() },
            { _id: '105', _nama: 'Suzuki', _asal: 'Jepang', _createdAt: new Date().toISOString() }
        ];

        const jenisBayarList = [
            { _id: '301', _namaBank: 'BCA', _norek: '8090-1234-56', _atasNama: 'PT FourDrive', _createdAt: new Date().toISOString() },
            { _id: '302', _namaBank: 'BNI', _norek: '0112-2334-45', _atasNama: 'PT FourDrive', _createdAt: new Date().toISOString() },
            { _id: '303', _namaBank: 'BRI', _norek: '0012-01-001234-50-6', _atasNama: 'PT FourDrive', _createdAt: new Date().toISOString() }
        ];

        if (!localStorage.getItem(DATABASE_KEYS.MERK)) {
            this.set(DATABASE_KEYS.MERK, merkList);
        }
        if (!localStorage.getItem(DATABASE_KEYS.JENIS_BAYAR)) {
            this.set(DATABASE_KEYS.JENIS_BAYAR, jenisBayarList);
        }

        // Ekstraksi Katalog Mobil bawaan yang ada di HTML ke LocalStorage (Sinkronisasi awal)
        if (!localStorage.getItem(DATABASE_KEYS.MOBIL)) {
            const htmlCars = document.querySelectorAll('.cars-grid .car-card');
            const parsedCars = [];
            htmlCars.forEach(el => {
                const id = el.getAttribute('data-car-id');
                const title = el.querySelector('.car-card-title').textContent;
                const cat = el.getAttribute('data-category');
                const brand = el.getAttribute('data-brand');
                const price = parseInt(el.getAttribute('data-price'));
                const seats = parseInt(el.getAttribute('data-seats'));
                const img = el.querySelector('.car-card-img').getAttribute('src');

                parsedCars.push({
                    _id: id,
                    _nama: title,
                    _merkId: brand,
                    _hargaPerHari: price,
                    _kapasitas: seats,
                    _kategori: cat,
                    _imgUrl: img,
                    _isTersedia: true,
                    _createdAt: new Date().toISOString()
                });
            });
            this.set(DATABASE_KEYS.MOBIL, parsedCars);
        }
    }
}


// ==========================================
// GLOBALS, STATE, & CONTROLLERS
// ==========================================
let currentUserSession = null;
let currentSelectedMobilForBooking = null;
let activeFilter = 'semua';
let activeAdminTab = 'admin-overview';

// Inisialisasi awal saat halaman termuat
window.onload = function() {
    AppStorage.initializeDatabase();
    
    // Memulihkan data sesi pengguna aktif
    currentUserSession = AppStorage.get(DATABASE_KEYS.SESSION, null);
    updateNavbarState();
    
    // Memulihkan mode visual (light / dark)
    const savedTheme = AppStorage.get(DATABASE_KEYS.THEME, 'light-theme');
    document.body.className = savedTheme;
    updateThemeToggleIcon();

    // Render katalog interaktif
    renderCarsCatalog();
    
    // PERBAIKAN #4: Sinkronisasi stok awal untuk data mobil lama
    sinkronStokAwal();
    
    if (currentUserSession) {
        if (currentUserSession._role === 'admin') {
            showSection('adminDashboard');
            renderAdminDashboard();
        } else {
            showSection('customerDashboard');
            renderCustomerDashboard();
        }
    } else {
        showSection('hero');
    }

    // Toggle Navigasi Hamburger untuk tampilan Mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
};

// Mode Gelap & Terang Toggle
function toggleThemeMode() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.className = 'light-theme';
        AppStorage.set(DATABASE_KEYS.THEME, 'light-theme');
    } else {
        document.body.className = 'dark-theme';
        AppStorage.set(DATABASE_KEYS.THEME, 'dark-theme');
    }
    updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
    const btn = document.getElementById('themeToggleBtn');
    if (document.body.classList.contains('dark-theme')) {
        btn.innerHTML = `<i class="fa-solid fa-sun" style="color: var(--warning-color)"></i>`;
    } else {
        btn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
}

// Navigasi scroll mulus
function scrollToSection(sectionId) {
    showSection('hero'); 
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.getElementById('navMenu').classList.remove('active');
    // Update active navbar link sesuai section yang dikunjungi
    updateActiveNavLink(sectionId);
}

// ============================================================
// PERBAIKAN #2: FUNGSI UPDATE ACTIVE NAVBAR LINK
// Memindahkan warna active secara smooth ke tombol yang diklik
// ============================================================
function updateActiveNavLink(sectionId) {
    // Hapus semua active terlebih dahulu (smooth transition via CSS)
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    // Mapping section ke nav link ID
    const navMap = {
        'hero': 'navLinkBeranda',
        'daftar-mobil': 'navLinkDaftarMobil',
        'cara-sewa': 'navLinkCaraSewa',
        'hubungi-kami': 'navLinkHubungi'
    };
    
    const targetNavId = navMap[sectionId] || 'navLinkBeranda';
    const targetNav = document.getElementById(targetNavId);
    if (targetNav) targetNav.classList.add('active');
}

function showSection(sectionId) {
    const landingSections = ['hero', 'daftar-mobil', 'cara-sewa', 'hubungi-kami'];
    
    document.getElementById('customerDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    
    if (sectionId === 'hero') {
        landingSections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('hidden');
        });
        document.getElementById('hero').classList.add('section-active');
        updateActiveNavLink('hero');
    } else if (sectionId === 'customerDashboard') {
        landingSections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        document.getElementById('customerDashboard').classList.remove('hidden');
    } else if (sectionId === 'adminDashboard') {
        landingSections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        document.getElementById('adminDashboard').classList.remove('hidden');
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toastNotification');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}


// ==========================================
// OTENTIKASI & VALIDASI INPUT
// ==========================================
function openLoginModal() {
    document.getElementById('authModal').classList.remove('hidden');
    switchAuthTab('masuk');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function switchAuthTab(tab) {
    const tabMasuk = document.getElementById('tabMasuk');
    const tabDaftar = document.getElementById('tabDaftar');
    const formMasuk = document.getElementById('formMasuk');
    const formDaftar = document.getElementById('formDaftar');

    if (tab === 'masuk') {
        tabMasuk.classList.add('active');
        tabDaftar.classList.remove('active');
        formMasuk.classList.remove('hidden');
        formDaftar.classList.add('hidden');
    } else {
        tabMasuk.classList.remove('active');
        tabDaftar.classList.add('active');
        formMasuk.classList.add('hidden');
        formDaftar.classList.remove('hidden');
    }
}

function validatePasswordStrength() {
    const pass = document.getElementById('regPassword').value;
    const msgEl = document.getElementById('passStrengthMsg');
    
    if (pass.length === 0) {
        msgEl.textContent = '';
        return;
    }

    const hasNumber = /\d/.test(pass);
    const hasSymbol = /[^A-Za-z0-9]/.test(pass);
    const isLengthValid = pass.length >= 6;

    if (!isLengthValid || !hasNumber || !hasSymbol) {
        msgEl.textContent = 'Kata sandi lemah! (Minimal 6 karakter, wajib angka & simbol)';
        msgEl.style.color = 'var(--danger-color)';
    } else {
        msgEl.textContent = 'Kombinasi Kata Sandi Kuat';
        msgEl.style.color = 'var(--success-color)';
    }
}

// CREATE (Daftar Akun Pelanggan Baru)
function handleRegister(e) {
    e.preventDefault();
    const nama = document.getElementById('regNama').value.trim();
    const nik = document.getElementById('regNik').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const whatsapp = document.getElementById('regWhatsapp').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmEl = document.getElementById('regPasswordConfirm');
    const confirmPassword = confirmEl ? confirmEl.value : password;

    // VALIDASI INPUT PENGGUNA (NIK WAJIB 16 DIGIT)
    if (nik.length !== 16) {
        showToast("Registrasi Gagal! NIK KTP harus tepat 16 digit.", "danger");
        return;
    }

    // VALIDASI KONFIRMASI PASSWORD
    if (password !== confirmPassword) {
        showToast("Konfirmasi sandi tidak cocok dengan kata sandi!", "danger");
        return;
    }

    let users = AppStorage.get(DATABASE_KEYS.USER, []);
    
    if (users.some(u => u._email.toLowerCase() === email.toLowerCase())) {
        showToast("Email tersebut sudah pernah terdaftar!", "danger");
        return;
    }

    try {
        // Implementasi Pembentukan Objek dari Kelas Pelanggan dengan Validasi Konstruktor & Enkapsulasi
        const pelangganBaru = new Pelanggan(nama, nik, email, whatsapp, password);
        
        users.push({
            _id: pelangganBaru.id,
            _namaLengkap: pelangganBaru.namaLengkap,
            _nik: pelangganBaru.nik,
            _email: pelangganBaru.email,
            _whatsapp: pelangganBaru.whatsapp,
            _password: pelangganBaru.password,
            _role: pelangganBaru.role,
            _createdAt: pelangganBaru.createdAt
        });

        AppStorage.set(DATABASE_KEYS.USER, users);
        showToast("Registrasi akun berhasil! Silakan masuk.");
        switchAuthTab('masuk');
        document.getElementById('loginEmail').value = email;
    } catch (err) {
        showToast(err.message, "danger");
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const users = AppStorage.get(DATABASE_KEYS.USER, []);
    const match = users.find(u => u._email.toLowerCase() === email.toLowerCase() && u._password === password);

    if (!match) {
        showToast("Email atau Kata Sandi salah!", "danger");
        return;
    }

    currentUserSession = match;
    AppStorage.set(DATABASE_KEYS.SESSION, currentUserSession);
    
    closeAuthModal();
    updateNavbarState();
    showToast(`Selamat datang, ${match._namaLengkap}!`);

    if (match._role === 'admin') {
        showSection('adminDashboard');
        renderAdminDashboard();
    } else {
        showSection('customerDashboard');
        renderCustomerDashboard();
    }
}

function handleLogout() {
    currentUserSession = null;
    localStorage.removeItem(DATABASE_KEYS.SESSION);
    updateNavbarState();
    showSection('hero');
    showToast("Anda telah keluar.");
}

function updateNavbarState() {
    const authNavBtn = document.getElementById('authNavBtn');
    const userSessionInfo = document.getElementById('userSessionInfo');
    const adminPanelNavBtn = document.getElementById('adminPanelNavBtn');
    const dataBookingNavBtn = document.getElementById('dataBookingNavBtn');

    if (currentUserSession) {
        authNavBtn.textContent = 'Keluar';
        authNavBtn.onclick = handleLogout;
        authNavBtn.className = 'btn-login-nav btn-danger';

        userSessionInfo.textContent = `${currentUserSession._role === 'admin' ? ' ' : ''}${currentUserSession._namaLengkap}`;
        userSessionInfo.classList.remove('hidden');

        if (currentUserSession._role === 'admin') {
            adminPanelNavBtn.classList.remove('hidden');
            if (dataBookingNavBtn) dataBookingNavBtn.classList.add('hidden');
        } else {
            adminPanelNavBtn.classList.add('hidden');
            if (dataBookingNavBtn) dataBookingNavBtn.classList.remove('hidden');
        }
    } else {
        authNavBtn.textContent = 'Masuk / Daftar';
        authNavBtn.onclick = openLoginModal;
        authNavBtn.className = 'btn-login-nav';

        userSessionInfo.textContent = '';
        userSessionInfo.classList.add('hidden');
        adminPanelNavBtn.classList.add('hidden');
        if (dataBookingNavBtn) dataBookingNavBtn.classList.add('hidden');
    }
}


// ==========================================
// RENDER KATALOG DAN WORKFLOW SEWA KENDARAAN
// ==========================================

function handleSewaSekarangBtn() {
    if (!currentUserSession) {
        openLoginModal();
    } else {
        if (currentUserSession._role === 'admin') {
            // ADMIN TIDAK BISA MELAKUKAN BOOKING/SEWA
            showToast("Admin utama tidak diijinkan untuk melakukan booking persewaan!", "danger");
        } else {
            showSection('customerDashboard');
            renderCustomerDashboard();
            switchDashTab('dash-booking-new');
        }
    }
}

function renderCarsCatalog() {
    const carsGrid = document.getElementById('carsGrid');
    const mobilList = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    const merkList = AppStorage.get(DATABASE_KEYS.MERK, []);

    carsGrid.innerHTML = '';

    const filteredList = mobilList.filter(car => {
        if (activeFilter === 'semua') return true;
        return car._kategori === activeFilter;
    });

    if (filteredList.length === 0) {
        carsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 50px 0; color: #9ca3af;">Tidak ada unit mobil yang sesuai kategori ini.</div>`;
        return;
    }

    filteredList.forEach(car => {
        const rMerk = merkList.find(m => m._id === car._merkId) || { _nama: 'Toyota' };
        const imgUrl = car._imgUrl || `images/toyota-avanza.png`;

        // ============================================================
        // PERBAIKAN #3: CEK STOK UNIT & STATUS KETERSEDIAAN
        // unitTersedia = totalUnit - unitDisewa (dari transaksi aktif)
        // Jika unitTersedia <= 0 maka tombol jadi "Sedang Disewa"
        // ============================================================
        const totalUnit = car._totalUnit || 1;
        const unitDisewa = getUnitDisewa(car._id);
        const unitTersedia = Math.max(0, totalUnit - unitDisewa);
        const isTersedia = unitTersedia > 0;

        // Indikator status: warna hijau = tersedia, merah = habis
        const statusHTML = isTersedia
            ? `<span class="car-status-indicator tersedia"><i class="fa-solid fa-circle-check"></i> Tersedia (${unitTersedia} unit)</span>`
            : `<span class="car-status-indicator disewa"><i class="fa-solid fa-circle-xmark"></i> Sedang Disewa</span>`;

        // Tombol sewa: disable jika habis
        const sewaBtn = isTersedia
            ? `<button class="btn btn-primary btn-sm" onclick="startBookingProcess('${car._id}')">Sewa</button>`
            : `<button class="btn btn-sm btn-sedang-disewa" disabled title="Semua unit sedang disewa">Sedang Disewa</button>`;

        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${imgUrl}" alt="${car._nama}" class="car-card-img" onerror="this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'">
            <div class="car-card-body">
                <span class="car-card-merk">${rMerk._nama}</span>
                ${statusHTML}
                <h3 class="car-card-title">${car._nama}</h3>
                <div class="car-features">
                    <div class="car-feature-item">
                        <i class="fa-solid fa-users"></i> ${car._kapasitas} Kursi
                    </div>
                    <div class="car-feature-item">
                        <i class="fa-solid fa-gears"></i> ${car._transmisi || (parseInt(car._id) % 2 === 0 ? 'Automatic' : 'Manual')}
                    </div>
                    <div class="car-feature-item">
                        <i class="fa-solid fa-gas-pump"></i> Bensin
                    </div>
                </div>
                <div class="car-price-block">
                    <div class="car-price">
                        <span class="car-price-val">Rp ${(car._hargaPerHari).toLocaleString('id-ID')}</span>
                        <span class="car-price-unit">per hari</span>
                    </div>
                    ${sewaBtn}
                </div>
            </div>
        `;
        carsGrid.appendChild(card);
    });
}

// ============================================================
// PERBAIKAN #3 & #4: HITUNG UNIT YANG SEDANG DISEWA
// Menghitung jumlah transaksi aktif (Disetujui) per mobil
// ============================================================
function getUnitDisewa(mobilId) {
    const trxList = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    // Unit dianggap disewa jika status = 'Disetujui' (belum selesai)
    return trxList.filter(t => t._mobilId === mobilId && t._status === 'Disetujui').length;
}

function filterMobil(kategori) {
    activeFilter = kategori;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const clickedBtn = Array.from(buttons).find(btn => btn.innerText.toLowerCase().includes(kategori === 'biasa' ? 'harian' : kategori === 'semua' ? 'semua' : kategori));
    if (clickedBtn) clickedBtn.classList.add('active');

    renderCarsCatalog();
}

function renderCustomerDashboard() {
    document.getElementById('custDashboardName').textContent = currentUserSession._namaLengkap;
    const quickCarsGrid = document.getElementById('quickCarSelection');
    const mobilList = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    const merkList = AppStorage.get(DATABASE_KEYS.MERK, []);

    quickCarsGrid.innerHTML = '';
    
    mobilList.slice(0, 4).forEach(car => {
        const rMerk = merkList.find(m => m._id === car._merkId) || { _nama: 'Toyota' };
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${car._imgUrl || 'images/toyota-avanza.png'}" class="car-card-img" onerror="this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'">
            <div class="car-card-body">
                <span class="car-card-merk">${rMerk._nama}</span>
                <h3 class="car-card-title">${car._nama}</h3>
                <div class="car-price-block">
                    <div class="car-price">
                        <span class="car-price-val">Rp ${car._hargaPerHari.toLocaleString('id-ID')}</span>
                        <span class="car-price-unit">per hari</span>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="startBookingProcess('${car._id}')">Booking</button>
                </div>
            </div>
        `;
        quickCarsGrid.appendChild(card);
    });

    renderMyBookingHistory();
}

function switchDashTab(tabId) {
    const tabs = document.querySelectorAll('.dash-tab');
    const panes = document.querySelectorAll('.dash-content-pane');

    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('hidden'));
    panes.forEach(p => {
        if (p.id !== tabId) p.style.display = 'none';
        else p.style.display = 'block';
    });

    const activeTab = Array.from(tabs).find(t => t.getAttribute('onclick').includes(tabId));
    if (activeTab) activeTab.classList.add('active');
}

// Memulai Booking (Notifikasi Proteksi Ditambahkan)
function startBookingProcess(mobilId) {
    if (!currentUserSession) {
        openLoginModal();
        return;
    }

    // PROTEKSI: ADMIN TIDAK BISA BOOKING KENDARAAN
    if (currentUserSession._role === 'admin') {
        showToast("Akses Ditolak! Akun Admin utama tidak diperbolehkan melakukan booking sewa mobil.", "danger");
        return;
    }

    const listMobil = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    currentSelectedMobilForBooking = listMobil.find(m => m._id === mobilId);

    if (!currentSelectedMobilForBooking) {
        showToast("Error: Unit mobil tidak ditemukan.", "danger");
        return;
    }

    // PERBAIKAN #3: Cek stok sebelum booking
    const totalUnit = currentSelectedMobilForBooking._totalUnit || 1;
    const unitDisewa = getUnitDisewa(mobilId);
    const unitTersedia = totalUnit - unitDisewa;
    if (unitTersedia <= 0) {
        showToast("Maaf, semua unit mobil ini sedang disewa. Silakan coba lagi nanti.", "danger");
        return;
    }

    document.getElementById('bookNamaMobil').value = currentSelectedMobilForBooking._nama;
    
    const besok = new Date();
    besok.setDate(besok.getDate() + 1);
    const lusa = new Date();
    lusa.setDate(lusa.getDate() + 2);

    document.getElementById('bookTglMulai').value = besok.toISOString().split('T')[0];
    document.getElementById('bookTglSelesai').value = lusa.toISOString().split('T')[0];
    document.getElementById('bookPakaiSopir').checked = false;

    calculateBookingPrice();
    document.getElementById('bookingModal').classList.remove('hidden');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
}

function calculateBookingPrice() {
    if (!currentSelectedMobilForBooking) return;

    const tglMulai = new Date(document.getElementById('bookTglMulai').value);
    const tglSelesai = new Date(document.getElementById('bookTglSelesai').value);
    const pakaiSopir = document.getElementById('bookPakaiSopir').checked;

    const selisihWaktu = tglSelesai.getTime() - tglMulai.getTime();
    let totalHari = Math.ceil(selisihWaktu / (1000 * 3600 * 24));
    
    if (totalHari <= 0 || isNaN(totalHari)) {
        totalHari = 1; 
    }

    const hargaSewaMobil = currentSelectedMobilForBooking._hargaPerHari * totalHari;
    const biayaSopir = pakaiSopir ? (150000 * totalHari) : 0;
    const totalTagihan = hargaSewaMobil + biayaSopir;

    document.getElementById('sumHargaDasar').textContent = `Rp ${currentSelectedMobilForBooking._hargaPerHari.toLocaleString('id-ID')}`;
    document.getElementById('sumDurasi').textContent = `${totalHari} Hari`;
    document.getElementById('sumBiayaSopir').textContent = `Rp ${biayaSopir.toLocaleString('id-ID')}`;
    document.getElementById('sumTotalTagihan').textContent = `Rp ${totalTagihan.toLocaleString('id-ID')}`;

    return { totalHari, biayaSopir, totalTagihan };
}

// CREATE (Sewa/Booking Unit)
function submitBooking(e) {
    e.preventDefault();

    const tglMulai = document.getElementById('bookTglMulai').value;
    const tglSelesai = document.getElementById('bookTglSelesai').value;
    const pakaiSopir = document.getElementById('bookPakaiSopir').checked;

    const calc = calculateBookingPrice();
    if (!calc) return;

    const listTransaksi = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);

    const trx = new Transaksi(
        currentUserSession._id,
        currentSelectedMobilForBooking._id,
        tglMulai,
        tglSelesai,
        pakaiSopir,
        calc.totalTagihan
    );

    const trxData = {
        _id: trx.id,
        _pelangganId: trx.pelangganId,
        _mobilId: trx.mobilId,
        _tglMulai: trx.tglMulai,
        _tglSelesai: trx.tglSelesai,
        _pakaiSopir: trx.pakaiSopir,
        _totalHarga: trx.totalHarga,
        _status: trx.status,
        _buktiTransfer: trx.buktiTransfer,
        _bankTransfer: trx.bankTransfer,
        _createdAt: trx.createdAt
    };

    listTransaksi.push(trxData);
    AppStorage.set(DATABASE_KEYS.TRANSAKSI, listTransaksi);

    closeBookingModal();
    showToast("Booking berhasil dibuat! Silakan pilih metode pembayaran.");
    openPaymentModal(trxData);
}


// ==========================================
// METODE PEMBAYARAN & SINKRONISASI QRIS
// ==========================================
let activeTrxForPayment = null;

function openPaymentModal(trx) {
    activeTrxForPayment = trx;
    document.getElementById('payNamaPelanggan').textContent = currentUserSession._namaLengkap;
    
    const listMobil = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    const mobil = listMobil.find(m => m._id === trx._mobilId);
    
    document.getElementById('payMobil').textContent = mobil ? mobil._nama : 'Unit Mobil';
    document.getElementById('payPeriode').textContent = `${trx._tglMulai} s/d ${trx._tglSelesai}`;
    document.getElementById('payTotal').textContent = `Rp ${trx._totalHarga.toLocaleString('id-ID')}`;

    document.getElementById('payBankSelect').value = '';
    document.getElementById('bankAccountBox').classList.add('hidden');
    document.getElementById('qrisPaymentBox').classList.add('hidden');
    document.getElementById('payProofFile').value = '';

    document.getElementById('paymentModal').classList.remove('hidden');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.add('hidden');
    renderMyBookingHistory();
    showSection('customerDashboard');
    switchDashTab('dash-my-booking');
}

function updatePaymentMethodDisplay() {
    const paymentSelected = document.getElementById('payBankSelect').value;
    const accountBox = document.getElementById('bankAccountBox');
    const qrisBox = document.getElementById('qrisPaymentBox');
    const bankNameDisplay = document.getElementById('bankNameDisplay');
    const bankNumberDisplay = document.getElementById('bankNumberDisplay');

    if (!paymentSelected) {
        accountBox.classList.add('hidden');
        qrisBox.classList.add('hidden');
        return;
    }

    if (paymentSelected === 'QRIS') {
        accountBox.classList.add('hidden');
        qrisBox.classList.remove('hidden');
        // Cek apakah ada gambar QRIS tersimpan dari admin
        const listJenisBayar = AppStorage.get(DATABASE_KEYS.JENIS_BAYAR, []);
        const qrisData = listJenisBayar.find(jb => jb._namaBank.toUpperCase() === 'QRIS');
        const qrisImg = document.getElementById('qrisImage');
        if (qrisData && qrisData._qrisImg && qrisImg) {
            qrisImg.src = qrisData._qrisImg;
        }
    } else {
        qrisBox.classList.add('hidden');
        const listJenisBayar = AppStorage.get(DATABASE_KEYS.JENIS_BAYAR, []);
        const match = listJenisBayar.find(jb => jb._namaBank.toUpperCase() === paymentSelected.toUpperCase());

        bankNameDisplay.textContent = paymentSelected;
        if (match) {
            bankNumberDisplay.textContent = match._norek;
        } else {
            const fallbackNorek = paymentSelected === 'BCA' ? '8090-1122-33' : '0122-3344-55';
            bankNumberDisplay.textContent = fallbackNorek;
        }
        accountBox.classList.remove('hidden');
    }
}

function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    const input = document.createElement('input');
    input.value = textToCopy;
    document.body.appendChild(input);
    input.select();
    try {
        document.execCommand('copy');
        showToast("Nomor rekening berhasil disalin!");
    } catch (err) {
        showToast("Gagal menyalin otomatis.", "danger");
    }
    document.body.removeChild(input);
}

function submitPaymentProof() {
    const paymentSelected = document.getElementById('payBankSelect').value;
    const fileInput = document.getElementById('payProofFile');

    if (!paymentSelected) {
        showToast("Silakan pilih metode pembayaran!", "danger");
        return;
    }

    if (fileInput.files.length === 0) {
        showToast("Silakan unggah foto bukti transfer terlebih dahulu!", "danger");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const base64Image = e.target.result;
        const listTrx = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
        const idx = listTrx.findIndex(t => t._id === activeTrxForPayment._id);

        if (idx !== -1) {
            listTrx[idx]._status = 'Menunggu Konfirmasi';
            listTrx[idx]._bankTransfer = paymentSelected;
            listTrx[idx]._buktiTransfer = base64Image;

            AppStorage.set(DATABASE_KEYS.TRANSAKSI, listTrx);
            showToast("Sukses! Bukti pembayaran diunggah. Menunggu konfirmasi admin.");
            closePaymentModal();
        } else {
            showToast("Gagal memproses pembayaran.", "danger");
        }
    };
    reader.readAsDataURL(file);
}

// DELETE (Batalkan pesanan sebelum disetujui dari menu pelanggan)
function cancelBooking(trxId) {
    const confirmCancel = confirm("Apakah Anda yakin ingin membatalkan transaksi sewa ini?");
    if (!confirmCancel) return;

    let listTrx = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    const idx = listTrx.findIndex(t => t._id === trxId);

    if (idx !== -1) {
        // Hapus atau ubah status transaksi menjadi ditolak / dibatalkan
        listTrx.splice(idx, 1);
        AppStorage.set(DATABASE_KEYS.TRANSAKSI, listTrx);
        showToast("Pesanan booking berhasil dibatalkan.");
        renderMyBookingHistory();
    }
}

function renderMyBookingHistory() {
    const myBookingContainer = document.getElementById('myBookingContainer');
    const myBookingCountEl = document.getElementById('myBookingCount');
    const allTransactions = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    const mobilList = AppStorage.get(DATABASE_KEYS.MOBIL, []);

    const myTrx = allTransactions.filter(t => t._pelangganId === currentUserSession._id);
    myBookingCountEl.textContent = myTrx.length;

    myBookingContainer.innerHTML = '';

    if (myTrx.length === 0) {
        myBookingContainer.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--theme-text-secondary);">Anda belum pernah melakukan pemesanan mobil.</div>`;
        return;
    }

    myTrx.reverse().forEach(trx => {
        const mobil = mobilList.find(m => m._id === trx._mobilId) || { _nama: 'Armada Terhapus' };
        
        let badgeClass = 'badge-pending';
        if (trx._status === 'Menunggu Konfirmasi') badgeClass = 'badge-menunggu';
        if (trx._status === 'Disetujui') badgeClass = 'badge-disetujui';
        if (trx._status === 'Ditolak') badgeClass = 'badge-ditolak';
        if (trx._status === 'Selesai') badgeClass = 'badge-selesai';

        // PERBAIKAN #6: Tampilkan informasi denda keterlambatan pada riwayat pelanggan
        let dendaInfoHTML = '';
        if (trx._dendaHari && trx._dendaHari > 0) {
            dendaInfoHTML = `
                <div class="denda-info-box">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <strong>Denda Keterlambatan: ${trx._dendaHari} hari × Rp 100.000</strong><br>
                    Total Denda: <strong>Rp ${(trx._dendaTotal || 0).toLocaleString('id-ID')}</strong>
                    ${trx._tglKembaliAktual ? `<br><small>Dikembalikan: ${trx._tglKembaliAktual}</small>` : ''}
                </div>
            `;
        }

        const ticket = document.createElement('div');
        ticket.className = 'booking-ticket';
        ticket.innerHTML = `
            <div class="ticket-header">
                <span class="ticket-id"><i class="fa-solid fa-receipt"></i> Booking ID: #${trx._id}</span>
                <span class="badge ${badgeClass}">${trx._status}</span>
            </div>
            <div class="ticket-body">
                <div class="ticket-details">
                    <h4>${mobil._nama}</h4>
                    <p><i class="fa-regular fa-calendar-days"></i> Periode: <strong>${trx._tglMulai} s/d ${trx._tglSelesai}</strong></p>
                    <p><i class="fa-solid fa-user-tie"></i> Jasa Sopir: <strong>${trx._pakaiSopir ? 'Ya (+Rp 150.000/Hari)' : 'Lepas Kunci'}</strong></p>
                    <p><i class="fa-solid fa-wallet"></i> Total Bayar: <strong style="color:var(--primary-color);">Rp ${trx._totalHarga.toLocaleString('id-ID')}</strong></p>
                    ${dendaInfoHTML}
                </div>
                <div class="ticket-payment-state">
                    ${trx._status === 'Pending' ? `
                        <button class="btn btn-primary btn-sm w-full" onclick="resumePaymentProcess('${trx._id}')">Bayar Sekarang</button>
                        <button class="btn btn-danger btn-sm w-full btn-batalkan" onclick="cancelBooking('${trx._id}')">Batalkan</button>
                    ` : `
                        <span style="font-size: 13px;"><i class="fa-solid fa-circle-check"></i> Transfer via <strong>${trx._bankTransfer || 'BCA'}</strong></span>
                        ${trx._status === 'Menunggu Konfirmasi' ? `
                            <button class="btn btn-danger btn-sm w-full btn-batalkan" onclick="cancelBooking('${trx._id}')">Batalkan Sewa</button>
                        ` : ''}
                    `}
                </div>
            </div>
        `;
        myBookingContainer.appendChild(ticket);
    });
}

function resumePaymentProcess(trxId) {
    const allTrx = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    const match = allTrx.find(t => t._id === trxId);
    if (match) {
        openPaymentModal(match);
    }
}


// ==========================================
// CONTROL & DASHBOARD ADMIN (CRUD LENGKAP)
// ==========================================
function switchAdminTab(tabId) {
    activeAdminTab = tabId;
    const tabs = document.querySelectorAll('.admin-nav-btn');
    const contents = document.querySelectorAll('.admin-tab-content');

    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    const clickedTab = Array.from(tabs).find(t => t.getAttribute('onclick').includes(tabId));
    if (clickedTab) clickedTab.classList.add('active');

    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add('active');

    renderAdminDashboard();
}

function renderAdminDashboard() {
    const merkList = AppStorage.get(DATABASE_KEYS.MERK, []);
    const mobilList = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    const userList = AppStorage.get(DATABASE_KEYS.USER, []);
    const trxList = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    const jbList = AppStorage.get(DATABASE_KEYS.JENIS_BAYAR, []);

    // Info Penghitung Sidebar
    document.getElementById('countMerk').textContent = merkList.length;
    document.getElementById('countMobil').textContent = mobilList.length;
    
    const pendingCount = trxList.filter(t => t._status === 'Menunggu Konfirmasi').length;
    const transBtn = document.getElementById('pendingTransBtn');
    if (pendingCount > 0) {
        transBtn.innerHTML = `<i class="fa-solid fa-file-invoice-dollar"></i> Transaksi & Booking (<span style="background-color: var(--danger-color); color: white; padding: 2px 6px; border-radius: 50%; font-size:11px;">${pendingCount}</span>)`;
    } else {
        transBtn.innerHTML = `<i class="fa-solid fa-file-invoice-dollar"></i> Transaksi & Booking (<span>${trxList.length}</span>)`;
    }

    // TAMPILKAN OVERVIEW DATA UTAMA
    document.getElementById('statTotalMobil').textContent = mobilList.length;
    document.getElementById('statTotalPesanan').textContent = trxList.length;
    
    const omset = trxList.filter(t => t._status === 'Disetujui').reduce((acc, curr) => acc + curr._totalHarga, 0);
    document.getElementById('statOmset').textContent = `Rp ${omset.toLocaleString('id-ID')}`;

    // Render Recent Bookings Table
    const recentBody = document.getElementById('recentBookingsTableBody');
    recentBody.innerHTML = '';
    
    trxList.slice().reverse().slice(0, 5).forEach(trx => {
        const user = userList.find(u => u._id === trx._pelangganId) || { _namaLengkap: 'Anonim' };
        const mob = mobilList.find(m => m._id === trx._mobilId) || { _nama: 'Armada Terhapus' };
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${trx._id}</td>
            <td><strong>${user._namaLengkap}</strong></td>
            <td>${mob._nama}</td>
            <td>Rp ${trx._totalHarga.toLocaleString('id-ID')}</td>
            <td><span class="badge ${trx._status === 'Disetujui' ? 'badge-disetujui' : trx._status === 'Pending' ? 'badge-pending' : trx._status === 'Ditolak' ? 'badge-ditolak' : 'badge-menunggu'}">${trx._status}</span></td>
            <td><button class="btn btn-primary btn-sm" onclick="switchAdminTab('admin-transaksi')">Detail</button></td>
        `;
        recentBody.appendChild(tr);
    });

    // CRUD: READ DATA MERK TABLE
    const merkBody = document.getElementById('merkTableBody');
    merkBody.innerHTML = '';
    merkList.forEach(m => {
        const totalMobilTerkait = mobilList.filter(car => car._merkId === m._id).length;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${m._id}</td>
            <td><strong>${m._nama}</strong></td>
            <td>${m._asal}</td>
            <td><span class="badge badge-menunggu">${totalMobilTerkait} Unit</span></td>
            <td>
                <button class="table-action-btn edit" onclick="openMerkModal('edit', '${m._id}')"><i class="fa-solid fa-edit"></i></button>
                <button class="table-action-btn delete" onclick="deleteMerk('${m._id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        merkBody.appendChild(tr);
    });

    // CRUD: READ DATA MOBIL TABLE
    const mobilBody = document.getElementById('mobilTableBody');
    mobilBody.innerHTML = '';
    mobilList.forEach(car => {
        const merk = merkList.find(m => m._id === car._merkId) || { _nama: 'Tidak Diketahui' };
        // PERBAIKAN #4: Hitung stok tersedia dan disewa
        const totalUnit = car._totalUnit || 1;
        const unitDisewa = getUnitDisewa(car._id);
        const unitTersedia = Math.max(0, totalUnit - unitDisewa);
        const isTersedia = unitTersedia > 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${car._imgUrl || 'images/toyota-avanza.png'}" class="admin-table-img"></td>
            <td><strong>${car._nama}</strong></td>
            <td>${merk._nama}</td>
            <td><span style="text-transform: capitalize; font-size: 13px;">${car._kategori}</span></td>
            <td>Rp ${car._hargaPerHari.toLocaleString('id-ID')}</td>
            <td>${car._kapasitas} Kursi</td>
            <td>
                <!-- PERBAIKAN #4: Kontrol stok +/- -->
                <div class="stock-control">
                    <button onclick="ubahStokMobil('${car._id}', -1)" title="Kurangi Total Unit">−</button>
                    <span class="stock-num">${totalUnit}</span>
                    <button onclick="ubahStokMobil('${car._id}', 1)" title="Tambah Total Unit">+</button>
                </div>
            </td>
            <td><span class="stock-badge tersedia">${unitTersedia}</span></td>
            <td><span class="stock-badge disewa">${unitDisewa}</span></td>
            <td><span class="badge ${isTersedia ? 'badge-disetujui' : 'badge-ditolak'}">${isTersedia ? 'Tersedia' : 'Habis'}</span></td>
            <td>
                <button class="table-action-btn edit" onclick="openMobilModal('edit', '${car._id}')"><i class="fa-solid fa-edit"></i></button>
                <button class="table-action-btn delete" onclick="deleteMobil('${car._id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        mobilBody.appendChild(tr);
    });

    // CRUD: READ DATA METODE PEMBAYARAN
    const jbBody = document.getElementById('jenisBayarTableBody');
    jbBody.innerHTML = '';
    jbList.forEach(jb => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${jb._id}</td>
            <td><strong>${jb._namaBank}</strong></td>
            <td>${jb._norek}</td>
            <td>${jb._atasNama}</td>
            <td>
                <button class="table-action-btn edit" onclick="openJenisBayarModal('edit', '${jb._id}')"><i class="fa-solid fa-edit"></i></button>
                <button class="table-action-btn delete" onclick="deleteJenisBayar('${jb._id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        jbBody.appendChild(tr);
    });

    // READ: DATA PEMESAN/AKUN
    const pemesanBody = document.getElementById('pemesanTableBody');
    pemesanBody.innerHTML = '';
    userList.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${u._namaLengkap}</strong></td>
            <td>${u._nik}</td>
            <td>${u._email}</td>
            <td><a href="https://wa.me/${u._whatsapp}" target="_blank" style="color:#198754; text-decoration:none;"><i class="fa-brands fa-whatsapp"></i> ${u._whatsapp}</a></td>
            <td><span class="badge ${u._role === 'admin' ? 'badge-disetujui' : 'badge-menunggu'}">${u._role}</span></td>
            <td>
                ${u._role !== 'admin' ? `
                    <button class="table-action-btn delete" onclick="deleteUser('${u._id}')"><i class="fa-solid fa-user-minus"></i> Hapus</button>
                ` : `<span style="font-size: 11px; opacity:0.6;">Sistem Proteksi</span>`}
            </td>
        `;
        pemesanBody.appendChild(tr);
    });

    // READ & VERIFIKASI TRANSAKSI
    const trxBody = document.getElementById('transaksiTableBody');
    trxBody.innerHTML = '';
    trxList.slice().reverse().forEach(trx => {
        const u = userList.find(user => user._id === trx._pelangganId) || { _namaLengkap: 'User Terhapus' };
        const mob = mobilList.find(m => m._id === trx._mobilId) || { _nama: 'Armada Terhapus' };
        
        let badgeClass = 'badge-pending';
        if (trx._status === 'Menunggu Konfirmasi') badgeClass = 'badge-menunggu';
        if (trx._status === 'Disetujui') badgeClass = 'badge-disetujui';
        if (trx._status === 'Ditolak') badgeClass = 'badge-ditolak';
        if (trx._status === 'Selesai') badgeClass = 'badge-selesai';

        // PERBAIKAN #6: Hitung denda keterlambatan jika ada
        let dendaHTML = '<span style="opacity:0.4; font-size:11px;">-</span>';
        if (trx._dendaHari && trx._dendaHari > 0) {
            dendaHTML = `
                <div class="denda-badge">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    ${trx._dendaHari}h × Rp100rb
                </div>
                <div style="font-size:11px; font-weight:700; color:#dc2626; margin-top:2px;">
                    Rp ${(trx._dendaTotal || 0).toLocaleString('id-ID')}
                </div>
            `;
        }

        // PERBAIKAN #5: Tombol Selesai Sewa - hanya muncul jika status = 'Disetujui'
        let aksiHTML = `<span style="font-size:12px; opacity:0.6;"><i class="fa-solid fa-circle-check"></i> Terarsip</span>`;
        if (trx._status === 'Menunggu Konfirmasi') {
            aksiHTML = `
                <div style="display:flex; gap:5px;">
                    <button class="table-action-btn edit" style="background-color:#dcfce7; color:#15803d; font-weight:700;" onclick="verifyPayment('${trx._id}', 'Disetujui')"><i class="fa-solid fa-check"></i> Setuju</button>
                    <button class="table-action-btn delete" onclick="verifyPayment('${trx._id}', 'Ditolak')"><i class="fa-solid fa-times"></i> Tolak</button>
                </div>
            `;
        } else if (trx._status === 'Disetujui') {
            aksiHTML = `
                <button class="btn-selesai-sewa" onclick="openSelesaiSewaModal('${trx._id}')">
                    <i class="fa-solid fa-flag-checkered"></i> Selesai Sewa
                </button>
            `;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${trx._id}</td>
            <td><strong>${u._namaLengkap}</strong></td>
            <td>${mob._nama}</td>
            <td><span style="font-size:12px;">${trx._tglMulai} s/d ${trx._tglSelesai}</span></td>
            <td>${trx._pakaiSopir ? 'Sopir' : 'Lepas Kunci'}</td>
            <td><strong>Rp ${trx._totalHarga.toLocaleString('id-ID')}</strong></td>
            <td>${dendaHTML}</td>
            <td>
                ${trx._buktiTransfer ? `
                    <button class="table-action-btn view-proof-btn" onclick="viewProof('${trx._id}')"><i class="fa-regular fa-image"></i> LIHAT</button>
                ` : `<span style="opacity:0.5; font-size:11px;">Belum Upload</span>`}
            </td>
            <td><span class="badge ${badgeClass}">${trx._status}</span></td>
            <td>${aksiHTML}</td>
        `;
        trxBody.appendChild(tr);
    });
}


// --- CRUD IMPLEMENTATION: MERK ---
function openMerkModal(mode, id = null) {
    document.getElementById('merkModal').classList.remove('hidden');
    const title = document.getElementById('merkModalTitle');
    
    if (mode === 'tambah') {
        title.textContent = 'Tambah Merk Baru';
        document.getElementById('merkIdHidden').value = '';
        document.getElementById('merkNama').value = '';
        document.getElementById('merkAsal').value = '';
    } else {
        title.textContent = 'Edit Data Merk';
        const list = AppStorage.get(DATABASE_KEYS.MERK, []);
        const match = list.find(m => m._id === id);
        if (match) {
            document.getElementById('merkIdHidden').value = match._id;
            document.getElementById('merkNama').value = match._nama;
            document.getElementById('merkAsal').value = match._asal;
        }
    }
}

function closeMerkModal() {
    document.getElementById('merkModal').classList.add('hidden');
}

function handleMerkSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('merkIdHidden').value;
    const nama = document.getElementById('merkNama').value.trim();
    const asal = document.getElementById('merkAsal').value.trim();

    const list = AppStorage.get(DATABASE_KEYS.MERK, []);

    if (id) {
        // UPDATE (Data Merk)
        const idx = list.findIndex(m => m._id === id);
        if (idx !== -1) {
            try {
                const temp = new Merk(nama, asal);
                list[idx]._nama = temp.nama;
                list[idx]._asal = temp.asal;
                showToast("Data merk berhasil diperbarui.");
            } catch (err) {
                showToast(err.message, "danger");
                return;
            }
        }
    } else {
        // CREATE (Merk Baru)
        try {
            const temp = new Merk(nama, asal);
            list.push({
                _id: temp.id,
                _nama: temp.nama,
                _asal: temp.asal,
                _createdAt: temp.createdAt
            });
            showToast("Merk baru berhasil ditambahkan.");
        } catch (err) {
            showToast(err.message, "danger");
            return;
        }
    }

    AppStorage.set(DATABASE_KEYS.MERK, list);
    closeMerkModal();
    renderAdminDashboard();
}

// DELETE (Data Merk)
function deleteMerk(id) {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus merk ini?");
    if (!confirmDelete) return;

    let list = AppStorage.get(DATABASE_KEYS.MERK, []);
    list = list.filter(m => m._id !== id);
    AppStorage.set(DATABASE_KEYS.MERK, list);
    
    showToast("Merk berhasil dihapus.");
    renderAdminDashboard();
}


// --- CRUD IMPLEMENTATION: MOBIL ---
function previewMobilImage(input) {
    const previewBox = document.getElementById('mobilImgPreview');
    const previewImg = document.getElementById('mobilImgPreviewImg');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewBox.style.display = 'block';
            document.getElementById('mobilImgUrl').value = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function openMobilModal(mode, id = null) {
    document.getElementById('mobilModal').classList.remove('hidden');
    const title = document.getElementById('mobilModalTitle');
    const selectMerk = document.getElementById('mobilMerkId');

    const merkList = AppStorage.get(DATABASE_KEYS.MERK, []);
    selectMerk.innerHTML = '';
    merkList.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m._id;
        opt.textContent = m._nama;
        selectMerk.appendChild(opt);
    });

    if (mode === 'tambah') {
        title.textContent = 'Tambah Unit Armada Baru';
        document.getElementById('mobilIdHidden').value = '';
        document.getElementById('mobilNama').value = '';
        document.getElementById('mobilHarga').value = '300000';
        document.getElementById('mobilKapasitas').value = '7';
        document.getElementById('mobilKategori').value = 'biasa';
        document.getElementById('mobilImgUrl').value = '';
        document.getElementById('mobilImgFile').value = '';
        document.getElementById('mobilImgPreview').style.display = 'none';
        // PERBAIKAN #4: Default nilai stok
        const totalUnitEl = document.getElementById('mobilTotalUnit');
        if (totalUnitEl) totalUnitEl.value = '1';
        const transmisiEl = document.getElementById('mobilTransmisi');
        if (transmisiEl) transmisiEl.value = 'Manual';
    } else {
        title.textContent = 'Edit Armada Mobil';
        const list = AppStorage.get(DATABASE_KEYS.MOBIL, []);
        const match = list.find(m => m._id === id);
        if (match) {
            document.getElementById('mobilIdHidden').value = match._id;
            document.getElementById('mobilNama').value = match._nama;
            document.getElementById('mobilHarga').value = match._hargaPerHari;
            document.getElementById('mobilKapasitas').value = match._kapasitas;
            document.getElementById('mobilKategori').value = match._kategori;
            document.getElementById('mobilImgUrl').value = match._imgUrl || '';
            document.getElementById('mobilImgFile').value = '';
            // PERBAIKAN #4: Isi nilai stok dan transmisi dari data tersimpan
            const totalUnitEl = document.getElementById('mobilTotalUnit');
            if (totalUnitEl) totalUnitEl.value = match._totalUnit || 1;
            const transmisiEl = document.getElementById('mobilTransmisi');
            if (transmisiEl) transmisiEl.value = match._transmisi || 'Manual';
            // Tampilkan preview gambar lama jika ada
            const previewBox = document.getElementById('mobilImgPreview');
            const previewImg = document.getElementById('mobilImgPreviewImg');
            if (match._imgUrl) {
                previewImg.src = match._imgUrl;
                previewBox.style.display = 'block';
            } else {
                previewBox.style.display = 'none';
            }
            document.getElementById('mobilMerkId').value = match._merkId;
        }
    }
}

function closeMobilModal() {
    document.getElementById('mobilModal').classList.add('hidden');
}

function handleMobilSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('mobilIdHidden').value;
    const nama = document.getElementById('mobilNama').value.trim();
    const harga = parseInt(document.getElementById('mobilHarga').value);
    const kapasitas = parseInt(document.getElementById('mobilKapasitas').value);
    const kategori = document.getElementById('mobilKategori').value;
    const merkId = document.getElementById('mobilMerkId').value;
    let imgUrl = document.getElementById('mobilImgUrl').value.trim();
    // PERBAIKAN #4: Ambil nilai stok dan transmisi dari form
    const totalUnitEl = document.getElementById('mobilTotalUnit');
    const totalUnit = totalUnitEl ? (parseInt(totalUnitEl.value) || 1) : 1;
    const transmisiEl = document.getElementById('mobilTransmisi');
    const transmisi = transmisiEl ? transmisiEl.value : 'Manual';

    if (!imgUrl) {
        imgUrl = `images/toyota-avanza.png`;
    }

    const list = AppStorage.get(DATABASE_KEYS.MOBIL, []);

    if (id) {
        // UPDATE (Data Mobil)
        const idx = list.findIndex(m => m._id === id);
        if (idx !== -1) {
            try {
                const temp = new Mobil(nama, merkId, harga, kapasitas, kategori, imgUrl, list[idx]._isTersedia);
                list[idx]._nama = temp.nama;
                list[idx]._merkId = temp.merkId;
                list[idx]._hargaPerHari = temp.hargaPerHari;
                list[idx]._kapasitas = temp.kapasitas;
                list[idx]._kategori = temp.kategori;
                list[idx]._imgUrl = temp.imgUrl;
                // PERBAIKAN #4: Update stok dan transmisi
                list[idx]._totalUnit = totalUnit;
                list[idx]._transmisi = transmisi;
                showToast("Data armada mobil berhasil diperbarui.");
            } catch (err) {
                showToast(err.message, "danger");
                return;
            }
        }
    } else {
        // CREATE (Mobil Baru)
        try {
            const temp = new Mobil(nama, merkId, harga, kapasitas, kategori, imgUrl);
            list.push({
                _id: temp.id,
                _nama: temp.nama,
                _merkId: temp.merkId,
                _hargaPerHari: temp.hargaPerHari,
                _kapasitas: temp.kapasitas,
                _kategori: temp.kategori,
                _imgUrl: temp.imgUrl,
                _isTersedia: temp.isTersedia,
                // PERBAIKAN #4: Simpan stok dan transmisi
                _totalUnit: totalUnit,
                _transmisi: transmisi,
                _createdAt: temp.createdAt
            });
            showToast("Unit armada mobil berhasil terdaftar.");
        } catch (err) {
            showToast(err.message, "danger");
            return;
        }
    }

    AppStorage.set(DATABASE_KEYS.MOBIL, list);
    closeMobilModal();
    renderCarsCatalog(); 
    renderAdminDashboard();
}

// DELETE (Data Mobil)
function deleteMobil(id) {
    const confirmDelete = confirm("Hapus armada ini dari daftar persewaan?");
    if (!confirmDelete) return;

    let list = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    list = list.filter(m => m._id !== id);
    AppStorage.set(DATABASE_KEYS.MOBIL, list);

    showToast("Mobil berhasil dihapus.");
    renderCarsCatalog();
    renderAdminDashboard();
}


// --- CRUD IMPLEMENTATION: JENIS BAYAR ---
function openJenisBayarModal(mode, id = null) {
    document.getElementById('jenisBayarModal').classList.remove('hidden');
    const title = document.getElementById('jenisBayarModalTitle');

    if (mode === 'tambah') {
        title.textContent = 'Tambah Metode Pembayaran';
        document.getElementById('jenisBayarIdHidden').value = '';
        document.getElementById('bayarNamaBank').value = '';
        document.getElementById('bayarNorek').value = '';
        document.getElementById('bayarAtasNama').value = 'PT FourDrive';
        const qrisFile = document.getElementById('bayarQrisFile');
        if (qrisFile) qrisFile.value = '';
        const qrisPreview = document.getElementById('bayarQrisPreview');
        if (qrisPreview) qrisPreview.style.display = 'none';
        const qrisData = document.getElementById('bayarQrisImgData');
        if (qrisData) qrisData.value = '';
    } else {
        title.textContent = 'Edit Rekening Pembayaran';
        const list = AppStorage.get(DATABASE_KEYS.JENIS_BAYAR, []);
        const match = list.find(jb => jb._id === id);
        if (match) {
            document.getElementById('jenisBayarIdHidden').value = match._id;
            document.getElementById('bayarNamaBank').value = match._namaBank;
            document.getElementById('bayarNorek').value = match._norek;
            document.getElementById('bayarAtasNama').value = match._atasNama;
            const qrisFile = document.getElementById('bayarQrisFile');
            if (qrisFile) qrisFile.value = '';
            const qrisData = document.getElementById('bayarQrisImgData');
            if (qrisData) qrisData.value = match._qrisImg || '';
            const qrisPreview = document.getElementById('bayarQrisPreview');
            const qrisPreviewImg = document.getElementById('bayarQrisPreviewImg');
            if (match._qrisImg && qrisPreview && qrisPreviewImg) {
                qrisPreviewImg.src = match._qrisImg;
                qrisPreview.style.display = 'block';
            } else if (qrisPreview) {
                qrisPreview.style.display = 'none';
            }
        }
    }
}

function closeJenisBayarModal() {
    document.getElementById('jenisBayarModal').classList.add('hidden');
}

function handleJenisBayarSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('jenisBayarIdHidden').value;
    const namaBank = document.getElementById('bayarNamaBank').value.trim();
    const norek = document.getElementById('bayarNorek').value.trim();
    const atasNama = document.getElementById('bayarAtasNama').value.trim();
    const qrisImgEl = document.getElementById('bayarQrisImgData');
    const qrisImg = qrisImgEl ? qrisImgEl.value : '';

    const list = AppStorage.get(DATABASE_KEYS.JENIS_BAYAR, []);

    if (id) {
        // UPDATE (Metode Pembayaran)
        const idx = list.findIndex(jb => jb._id === id);
        if (idx !== -1) {
            try {
                const temp = new JenisBayar(namaBank, norek, atasNama);
                list[idx]._namaBank = temp.namaBank;
                list[idx]._norek = temp.norek;
                list[idx]._atasNama = temp.atasNama;
                if (qrisImg) list[idx]._qrisImg = qrisImg;
                showToast("Metode pembayaran telah diperbarui.");
            } catch (err) {
                showToast(err.message, "danger");
                return;
            }
        }
    } else {
        // CREATE (Metode Pembayaran)
        try {
            const temp = new JenisBayar(namaBank, norek, atasNama);
            list.push({
                _id: temp.id,
                _namaBank: temp.namaBank,
                _norek: temp.norek,
                _atasNama: temp.atasNama,
                _qrisImg: qrisImg || '',
                _createdAt: temp.createdAt
            });
            showToast("Metode pembayaran baru disimpan.");
        } catch (err) {
            showToast(err.message, "danger");
            return;
        }
    }

    AppStorage.set(DATABASE_KEYS.JENIS_BAYAR, list);
    closeJenisBayarModal();
    renderAdminDashboard();
}

// DELETE (Metode Pembayaran)
function deleteJenisBayar(id) {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus metode pembayaran ini?");
    if (!confirmDelete) return;

    let list = AppStorage.get(DATABASE_KEYS.JENIS_BAYAR, []);
    list = list.filter(jb => jb._id !== id);
    AppStorage.set(DATABASE_KEYS.JENIS_BAYAR, list);

    showToast("Metode pembayaran berhasil dihapus.");
    renderAdminDashboard();
}


// --- DETAIL VERIFIKASI TRANSAKSI ---
function viewProof(trxId) {
    const trxList = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    const match = trxList.find(t => t._id === trxId);

    if (match && match._buktiTransfer) {
        const imgContainer = document.getElementById('proofImgContainer');
        imgContainer.innerHTML = `<img src="${match._buktiTransfer}" alt="Bukti Transfer">`;
        document.getElementById('proofViewModal').classList.remove('hidden');
    } else {
        showToast("Bukti transfer tidak dapat ditampilkan.", "danger");
    }
}

function closeProofViewModal() {
    document.getElementById('proofViewModal').classList.add('hidden');
}

function verifyPayment(trxId, statusMulai) {
    const trxList = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    const idx = trxList.findIndex(t => t._id === trxId);

    if (idx !== -1) {
        trxList[idx]._status = statusMulai; 
        
        if (statusMulai === 'Disetujui') {
            const mobilList = AppStorage.get(DATABASE_KEYS.MOBIL, []);
            const mIdx = mobilList.findIndex(m => m._id === trxList[idx]._mobilId);
            if (mIdx !== -1) {
                mobilList[mIdx]._isTersedia = false;
                AppStorage.set(DATABASE_KEYS.MOBIL, mobilList);
            }
        }

        AppStorage.set(DATABASE_KEYS.TRANSAKSI, trxList);
        showToast(`Transaksi #${trxId} telah diverifikasi: ${statusMulai}`);
        renderCarsCatalog(); 
        renderAdminDashboard();
    }
}

// DELETE (Data User Pelanggan)
function deleteUser(id) {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus akun pelanggan ini?");
    if (!confirmDelete) return;

    let list = AppStorage.get(DATABASE_KEYS.USER, []);
    list = list.filter(u => u._id !== id);
    AppStorage.set(DATABASE_KEYS.USER, list);

    showToast("Akun pelanggan berhasil dihapus.");
    renderAdminDashboard();
}

// ==========================================
// FUNGSI TAMBAHAN (FITUR BARU)
// ==========================================

/** Tombol Data Booking navbar pelanggan -> langsung ke tab riwayat booking */
function goToMyBookings() {
    if (!currentUserSession) { openLoginModal(); return; }
    showSection('customerDashboard');
    renderCustomerDashboard();
    switchDashTab('dash-my-booking');
}

/** Toggle show/hide password */
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

/** Validasi konfirmasi password di form daftar */
function validateConfirmPassword() {
    const pass = document.getElementById('regPassword') ? document.getElementById('regPassword').value : '';
    const confirm = document.getElementById('regPasswordConfirm') ? document.getElementById('regPasswordConfirm').value : '';
    const msgEl = document.getElementById('confirmPassMsg');
    if (!msgEl) return;
    if (confirm.length === 0) { msgEl.textContent = ''; return; }
    if (pass === confirm) {
        msgEl.textContent = 'Sandi cocok ✓';
        msgEl.style.color = 'var(--success-color)';
    } else {
        msgEl.textContent = 'Sandi tidak cocok!';
        msgEl.style.color = 'var(--danger-color)';
    }
}

/** Preview gambar QRIS di modal jenis bayar */
function previewQrisImage(input) {
    const previewBox = document.getElementById('bayarQrisPreview');
    const previewImg = document.getElementById('bayarQrisPreviewImg');
    const hiddenInput = document.getElementById('bayarQrisImgData');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewBox.style.display = 'block';
            if (hiddenInput) hiddenInput.value = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// ============================================================
// PERBAIKAN #4: FUNGSI UBAH STOK MOBIL (TAMBAH/KURANGI UNIT)
// Admin dapat menambah atau mengurangi total unit kendaraan
// Sistem otomatis sinkron dengan dashboard pelanggan
// ============================================================
function ubahStokMobil(mobilId, delta) {
    const mobilList = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    const idx = mobilList.findIndex(m => m._id === mobilId);
    if (idx === -1) return;

    const currentTotal = mobilList[idx]._totalUnit || 1;
    const unitDisewa = getUnitDisewa(mobilId);
    const newTotal = currentTotal + delta;

    // Validasi: tidak boleh kurang dari unit yang sedang disewa
    if (newTotal < unitDisewa) {
        showToast(`Tidak bisa dikurangi! ${unitDisewa} unit sedang disewa.`, "danger");
        return;
    }
    if (newTotal < 1) {
        showToast("Stok mobil tidak bisa kurang dari 1!", "danger");
        return;
    }

    mobilList[idx]._totalUnit = newTotal;
    // Sinkronisasi isTersedia dengan stok
    mobilList[idx]._isTersedia = (newTotal - unitDisewa) > 0;
    AppStorage.set(DATABASE_KEYS.MOBIL, mobilList);

    showToast(`Stok ${mobilList[idx]._nama} diperbarui: ${newTotal} unit total.`);
    renderCarsCatalog();
    renderAdminDashboard();
}

// ============================================================
// PERBAIKAN #5: MODAL KONFIRMASI SELESAI SEWA
// Admin mengklik "Selesai Sewa" → modal konfirmasi muncul
// Setelah dikonfirmasi: status = 'Selesai', stok bertambah
// ============================================================
function openSelesaiSewaModal(trxId) {
    const trxList = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    const trx = trxList.find(t => t._id === trxId);
    if (!trx) return;

    document.getElementById('selesaiTrxId').value = trxId;
    document.getElementById('selesaiTglRencana').textContent = trx._tglSelesai;

    // Set tanggal hari ini sebagai default tanggal kembali aktual
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('selesaiTglAktual').value = today;

    // Hitung preview denda dengan tanggal hari ini
    hitungDendaPreview();

    document.getElementById('selesaiSewaModal').classList.remove('hidden');
}

function closeSelesaiSewaModal() {
    document.getElementById('selesaiSewaModal').classList.add('hidden');
}

// ============================================================
// PERBAIKAN #6: HITUNG PREVIEW DENDA KETERLAMBATAN
// Denda = jumlah hari terlambat × Rp 100.000
// Tampil real-time di modal konfirmasi selesai sewa
// ============================================================
function hitungDendaPreview() {
    const tglRencana = document.getElementById('selesaiTglRencana').textContent;
    const tglAktual = document.getElementById('selesaiTglAktual').value;
    
    if (!tglAktual || !tglRencana) return;

    const tglRencanaDate = new Date(tglRencana);
    const tglAktualDate = new Date(tglAktual);
    
    const selisihMs = tglAktualDate.getTime() - tglRencanaDate.getTime();
    const hariTelat = Math.max(0, Math.ceil(selisihMs / (1000 * 3600 * 24)));
    const totalDenda = hariTelat * 100000; // Rp 100.000 per hari

    document.getElementById('previewHariTelat').textContent = `${hariTelat} hari`;
    document.getElementById('previewTotalDenda').textContent = `Rp ${totalDenda.toLocaleString('id-ID')}`;
    
    // Warna merah jika ada denda
    const dendaBox = document.getElementById('dendaPreviewBox');
    if (dendaBox) {
        dendaBox.style.borderColor = hariTelat > 0 ? '#f59e0b' : 'var(--theme-border)';
    }
}

// ============================================================
// PERBAIKAN #5 & #6: KONFIRMASI SELESAI SEWA
// Proses: update status, hitung denda, kembalikan stok unit
// ============================================================
function konfirmasiSelesaiSewa() {
    const trxId = document.getElementById('selesaiTrxId').value;
    const tglAktual = document.getElementById('selesaiTglAktual').value;

    if (!tglAktual) {
        showToast("Tanggal kembali aktual wajib diisi!", "danger");
        return;
    }

    const trxList = AppStorage.get(DATABASE_KEYS.TRANSAKSI, []);
    const idx = trxList.findIndex(t => t._id === trxId);
    if (idx === -1) {
        showToast("Transaksi tidak ditemukan!", "danger");
        return;
    }

    const trx = trxList[idx];
    const tglRencanaDate = new Date(trx._tglSelesai);
    const tglAktualDate = new Date(tglAktual);
    
    // PERBAIKAN #6: Hitung denda keterlambatan (Rp 100.000 per hari)
    const selisihMs = tglAktualDate.getTime() - tglRencanaDate.getTime();
    const hariTelat = Math.max(0, Math.ceil(selisihMs / (1000 * 3600 * 24)));
    const totalDenda = hariTelat * 100000;

    // Update status transaksi menjadi 'Selesai'
    trxList[idx]._status = 'Selesai';
    trxList[idx]._tglKembaliAktual = tglAktual;
    trxList[idx]._dendaHari = hariTelat;
    trxList[idx]._dendaTotal = totalDenda;
    AppStorage.set(DATABASE_KEYS.TRANSAKSI, trxList);

    // PERBAIKAN #5: Stok mobil otomatis bertambah kembali
    // (karena getUnitDisewa hanya menghitung status 'Disetujui')
    // Dengan status 'Selesai', unit ini tidak terhitung disewa lagi
    // Sinkronisasi isTersedia pada data mobil
    const mobilList = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    const mIdx = mobilList.findIndex(m => m._id === trx._mobilId);
    if (mIdx !== -1) {
        const totalUnit = mobilList[mIdx]._totalUnit || 1;
        const newUnitDisewa = getUnitDisewa(trx._mobilId); // sudah exclude trx yg baru saja selesai
        mobilList[mIdx]._isTersedia = (totalUnit - newUnitDisewa) > 0;
        AppStorage.set(DATABASE_KEYS.MOBIL, mobilList);
    }

    closeSelesaiSewaModal();

    if (hariTelat > 0) {
        showToast(`Selesai! Denda keterlambatan ${hariTelat} hari = Rp ${totalDenda.toLocaleString('id-ID')}`, "danger");
    } else {
        showToast("Mobil berhasil dikembalikan tepat waktu. Stok kembali tersedia.");
    }

    renderCarsCatalog();
    renderAdminDashboard();
}

// ============================================================
// PERBAIKAN #4: SINKRONISASI STOK SAAT INISIALISASI
// Pastikan semua mobil lama memiliki field _totalUnit
// ============================================================
function sinkronStokAwal() {
    const mobilList = AppStorage.get(DATABASE_KEYS.MOBIL, []);
    let perluUpdate = false;
    mobilList.forEach(car => {
        if (car._totalUnit === undefined || car._totalUnit === null) {
            car._totalUnit = 1; // default 1 unit untuk data lama
            perluUpdate = true;
        }
        if (!car._transmisi) {
            car._transmisi = parseInt(car._id) % 2 === 0 ? 'Automatic' : 'Manual';
            perluUpdate = true;
        }
    });
    if (perluUpdate) {
        AppStorage.set(DATABASE_KEYS.MOBIL, mobilList);
    }
}
