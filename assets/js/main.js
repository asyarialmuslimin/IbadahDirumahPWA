document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    // MEMBERIKAN ACTION PADA SETIAP LINK NAVIGASI
    document.querySelectorAll('.linknav a').forEach(elm => {
        elm.addEventListener("click", () => {
            let page = elm.getAttribute("href").substring(1);
            if (page == "") page = "home";
            loadPage(page);
            const sidenav = document.querySelectorAll('.sidenav');
            M.Sidenav.init(sidenav).close;
        });
    });
});

function loadPage(page) {
    const content = document.querySelector(".content");

    content.innerHTML = `<div class="row"></div>`;

    switch (page) {
        case "home":
            homeload();
            break;
        case "surah":
            surahload();
            break;
        case "doa":
            doaload();
            break;
        case "cerita":
            ceritaload();
            break;
        case "about":
            loadabout();
            break;
        default:
            content.innerHTML = `<h1>404 Not Found</h1>`
            break;
    }
}

// RENDERING HALAMAN HOME
function homeload() {
    const row = document.querySelector('.row');
    row.innerHTML = `
    <div class="card home-card surah-card">
        <div class="home-card-title">
            Baca Surah - Surah di Alquran
        </div>
        <div class="home-card-subtitle">
            Kami Menyediakan Surah - Surah Al Quran yang dapat anda Baca langsung <br>
            Masing Masing Memiliki Faedahnya Sendiri Sendiri.
        </div>
        <div class="linkbtn">
            <a href="#surah" class="waves-effect waves-light btn red darken-1">Baca Disini</a>
        </div>
    </div>
    <div class="card home-card doa-card">
        <div class="home-card-title">
            Doa Setelah Sholat dan Sehari hari
        </div>
        <div class="home-card-subtitle">
            Kami Menyediakan Kumpulan Doa Setelah Sholat Sunnah untuk memudahkan Anda <br>
            yang masih belum hafal dan doa untuk Sehari hari.
        </div>
        <div class="linkbtn">
            <a href="#doa" class="waves-effect waves-light btn red darken-1">Baca Disini</a>
        </div>
    </div>
    <div class="card home-card cerita-card">
        <div class="home-card-title">
            Baca Cerita Islami
        </div>
        <div class="home-card-subtitle">
            Baca kumpulan cerita islami untuk yang penuh hikmah<br>
            Untuk menemani keseharian kita.
        </div>
        <div class="linkbtn">
            <a href="#cerita" class="waves-effect waves-light btn red darken-1">Baca Disini</a>
        </div>
    </div>
    `;
    document.querySelectorAll('.linkbtn a').forEach(elm => {
        elm.addEventListener("click", (event) => {
            let page = elm.getAttribute("href").substring(1);
            if (page == "") page = "home";
            loadPage(page);
        });
    });
}

// RENDERING HALAMAN AYAT SURAH
function ayatload(name) {
    window.scrollTo(0, 0);
    const row = document.querySelector('.row');
    row.innerHTML = `<button class="waves-effect waves-light btn" onclick="loadPage('surah')">< Back to Surah List</button><br>
    <div class="loading-container">
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>`;
    fetch("../assets/data/quran/" + name + ".json")
        .then(res => res.json())
        .then(result => {
            document.querySelector('.preloader-wrapper').classList.add('hide');
            row.innerHTML += `
            <div class="col s12">
                <div class="card blue">
                    <div class="card-content white-text">
                        <div class="quran-header">
                            <div class="title-indo">
                                <div class="title">
                                    ${result.title}
                                </div>
                                <div class="terjemahan">
                                    ${result.arti}
                                </div>
                            </div>
                            <div class="title-arab">
                            ${result.arab}
                            </div>
                        </div>
                        <p class="subtitle">${result.subtitle}</p>
                    </div>
                </div>
            </div>
            `;
            result.isi.forEach(data => {
                row.innerHTML += `
            <div class="col s12">
                <div class="card orange lighten-5">
                    <div class="card-content black-text">
                        <div class="ayat-wrapper">
                            <div class="numAyat">
                                ${data.nomor}
                            </div>
                            <p class="ayat">${data.ayat}</p>
                        </div>
                        <p>${data.terjemahan}</p>
                    </div>
                </div>
            </div>
            `;
            })
        });
}

// RENDERING HALAMAN LIST SURAH
function surahload() {
    const row = document.querySelector('.row');
    fetch("assets/data/quran.json")
        .then(res => res.json())
        .then(result => {
            result.data.forEach(data => {
                row.innerHTML += `
            <div class="col m4">
                <div class="card light-blue darken-4 card-quran">
                    <div class="card-content white-text">
                        <span class="card-title">${data.title}</span>
                        <p>${data.subtitle}</p>
                    </div>
                    <div class="card-action linkbtn">
                        <button onclick="ayatload('${data.link}')" class="btn waves-effect waves-light red">Baca Sekarang</button>
                    </div>
                </div>
            </div>
            `;
            })
        });
}

// RENDERING HALAMAN DOA
function loaddoa(nama) {
    window.scrollTo(0, 0);
    const row = document.querySelector('.row');
    row.innerHTML = `<button class="waves-effect waves-light btn" onclick="loadPage('doa')">< Back to Do'a List</button>`;
    fetch("assets/data/doa/" + nama + ".json")
        .then(res => res.json())
        .then(result => {
            result.data.forEach(data => {
                row.innerHTML += `
            <div class="col s12">
            <div class="card light-green lighten-5 card-doa">
                <div class="card-content black-text">
                    <span class="card-title"><b>${data.title}</b></span>
                    <img class="imgdoa" src="${data.arab}" alt="Doa">
                </div>
            </div>
        </div>
        `;
            })
        })
}

// RENDERING HALAMAN LIST DOA
function doaload() {
    const row = document.querySelector('.row');
    fetch("assets/data/doa.json")
        .then(res => res.json())
        .then(result => {
            result.data.forEach(data => {
                row.innerHTML += `
            <div class="col m6">
                <div class="card blue-grey darken-1 card-doa">
                    <div class="card-content white-text">
                        <span class="card-title">${data.title}</span>
                        <p>${data.subtitle}</p>
                    </div>
                    <div class="card-action">
                        <button onclick="loaddoa('${data.link}')" class="btn waves-effect waves-light red">Baca Sekarang</button>
                    </div>
                </div>
            </div>
            `;
            })
        })
}

// RENDERING HALAMAN CERITA
function loadcerita(pos) {
    window.scrollTo(0, 0);
    const row = document.querySelector('.row');
    row.innerHTML = `<button class="waves-effect waves-light btn" onclick="loadPage('cerita')">< Back to Cerita List</button>`;
    fetch("assets/data/cerita.json")
        .then(res => res.json())
        .then(result => {
            row.innerHTML += `
                <div class="col s12">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${result.data[pos].judul}</span>
                            <p class="paragraf-cerita">${result.data[pos].isi}</p>
                        </div>
                    </div>
                </div>
                `;
        })
}

// RENDERING HALAMAN LIST CERITA
function ceritaload() {
    const row = document.querySelector('.row');
    let i = 0;
    fetch("assets/data/cerita.json")
        .then(res => res.json())
        .then(result => {
            result.data.forEach(data => {
                row.innerHTML += `
                    <div class="col s12">
                        <div class="card blue-grey darken-1 card-doa">
                            <div class="card-content white-text">
                                <span class="card-title">${data.judul}</span>
                                <p>${data.isi.substring(0,175) + "..."}</p>
                            </div>
                            <div class="card-action">
                                <button onclick="loadcerita('${i}')" class="btn waves-effect waves-light red">Baca Sekarang</button>
                            </div>
                        </div>
                    </div>
                    `;
                i++;
            })
        })
}

// RENDERING HALAMAN ABOUT
function loadabout() {
    const row = document.querySelector('.row');
    row.innerHTML = `
            <div class="photo-container">
                <img src="./assets/images/logo.png" alt="Web Logo">
                <img class="author-photo" src="./assets/images/photo.png" alt="Author Photo">
            </div>
            <p class="profil name">Ahmad Saifur Ridlo</p>
            <p class="profil place">Kabupaten Sidoarjo, Jawa Timur</p>
            <p class="profil position">Android & Web Programming Enthusiast</p>
            <div class="row">
                <div class="col m3">
                    <div class="card card-contact whatsapp">
                        <div class="card-content white-text">
                            <p>Whatsapp</p><br>
                            <span class="card-title">0812 2623 9231</span>
                        </div>
                    </div>
                </div>
                <div class="col m3">
                    <div class="card card-contact instagram">
                        <div class="card-content white-text">
                            <p>Instagram</p><br>
                            <span class="card-title">@saifur.ridlo</span>
                        </div>
                    </div>
                </div>
                <div class="col m3">
                    <div class="card card-contact facebook">
                        <div class="card-content white-text">
                            <p>Facebook</p><br>
                            <span class="card-title">asyarialmuslimin</span>
                        </div>
                    </div>
                </div>
                <div class="col m3">
                    <div class="card card-contact github">
                        <div class="card-content white-text">
                            <p>Github</p><br>
                            <span class="card-title">asyarialmuslimin</span>
                        </div>
                    </div>
                </div>
            </div>
    `;
}