// Tandai bahwa JavaScript berjalan (dipakai CSS agar konten tidak hilang kalau JS error)
document.body.classList.add("js-ready");

// ============ NAVBAR BERUBAH SAAT SCROLL ============
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// ============ ANIMASI PROGRESS BAR SKILLS ============
const skillsSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".skills .progress-bar");

if (skillsSection) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            bar.style.width = bar.dataset.width + "%";
          });
          skillObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  skillObserver.observe(skillsSection);
}

// ============ FILTER PROYEK ============
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectItems.forEach((item) => {
      const cocok = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hide", !cocok);
    });
  });
});

// ============ TAHUN OTOMATIS DI FOOTER ============
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============ VALIDASI + KIRIM FORM KE WHATSAPP ============
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

const NOMOR_WA = "6281386088210"; // nomor tujuan (format 62, tanpa 0 dan tanpa tanda -)

function showError(inputId, message) {
  document.getElementById("error-" + inputId).textContent = message;
  document.getElementById(inputId).classList.add("invalid");
}

function clearError(inputId) {
  document.getElementById("error-" + inputId).textContent = "";
  document.getElementById(inputId).classList.remove("invalid");
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.textContent = "";

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if (nama === "") {
      showError("nama", "Nama wajib diisi.");
      valid = false;
    } else {
      clearError("nama");
    }

    if (email === "") {
      showError("email", "Email wajib diisi.");
      valid = false;
    } else if (!emailValid.test(email)) {
      showError("email", "Format email tidak valid.");
      valid = false;
    } else {
      clearError("email");
    }

    if (pesan.length < 10) {
      showError("pesan", "Pesan minimal 10 karakter.");
      valid = false;
    } else {
      clearError("pesan");
    }

    if (!valid) return;

    // susun isi pesan WhatsApp
    const teks =
      "Halo, saya " + nama + "\n" +
      "Email: " + email + "\n\n" +
      pesan;

    const url = "https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(teks);

    window.open(url, "_blank");

    formSuccess.style.color = "#16a34a";
    formSuccess.textContent = "Mengarahkan ke WhatsApp...";
    contactForm.reset();
  });
}

// ============ MENU AKTIF SESUAI SECTION ============
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let current = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ============ MENU MOBILE MENUTUP SETELAH KLIK ============
const menu = document.getElementById("menu");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menu && menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// ============ TOMBOL KEMBALI KE ATAS ============
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============ ANIMASI MUNCUL SAAT SCROLL ============
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));