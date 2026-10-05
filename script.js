/**
 * KREATIVLABS — LINK HUB
 * Vanilla JavaScript (No Frameworks, Light Mode Only)
 * Powered by Bootstrap Icons & Data-driven architecture
 */

// -----------------------------------------------------------------------------
// 1. DATA SOURCES: LINKS & SOCIAL PROFILES
//    Edit daftar di bawah ini untuk memperbarui link dengan mudah.
// -----------------------------------------------------------------------------

const linksData = [
  {
    id: "whatsapp",
    title: "Konsultasi WhatsApp (Resmi)",
    url: "https://wa.me/6287816270140?text=Halo%20KreativLabs%2C%20saya%20ingin%20konsultasi%20project",
    icon: "bi-whatsapp",
    isPrimary: true
  },
  {
    id: "website",
    title: "Website Resmi KreativLabs.id",
    url: "https://www.kreativlabs.id/",
    icon: "bi-globe2",
    isPrimary: false
  },
  {
    id: "portfolio",
    title: "Portofolio & Hasil Proyek",
    url: "https://www.kreativlabs.id/#projects",
    icon: "bi-folder2-open",
    isPrimary: false
  },
  {
    id: "kasir",
    title: "Aplikasi Kasir Web (Tip Top)",
    url: "https://www.kreativlabs.id/blog/aplikasi-kasir-web-modern",
    icon: "bi-shop",
    isPrimary: false
  },
  {
    id: "service-web",
    title: "Jasa Pembuatan Website",
    url: "https://www.kreativlabs.id/services/website",
    icon: "bi-laptop",
    isPrimary: false
  },
  {
    id: "service-design",
    title: "Jasa Desain Grafis & Logo",
    url: "https://www.kreativlabs.id/services/design",
    icon: "bi-palette",
    isPrimary: false
  },
  {
    id: "email",
    title: "Email Kerjasama & Penawaran",
    url: "mailto:hello@kreativlabs.id",
    icon: "bi-envelope",
    isPrimary: false
  }
];

const socialsData = [
  {
    name: "Instagram",
    url: "https://instagram.com/kreativlabs.id",
    icon: "bi-instagram"
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@kreativlabs.id",
    icon: "bi-tiktok"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/kreativlabs-id/",
    icon: "bi-linkedin"
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/kreativlabsid",
    icon: "bi-twitter-x"
  },
  {
    name: "Threads",
    url: "https://www.threads.net/@kreativlabs.id",
    icon: "bi-threads"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/6287816270140?text=Halo%20KreativLabs,%20saya%20ingin%20konsultasi%20langsung",
    icon: "bi-whatsapp"
  }
];

// -----------------------------------------------------------------------------
// 2. RENDER FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Merender daftar link kartu ke dalam container DOM
 */
function renderLinks(links) {
  const container = document.getElementById("linksContainer");
  if (!container) return;

  container.innerHTML = "";

  links.forEach(item => {
    const linkEl = document.createElement("a");
    linkEl.href = item.url;
    linkEl.className = `link-card ${item.isPrimary ? "is-primary" : ""}`;
    linkEl.id = `link-${item.id}`;

    // Keamanan untuk external link
    if (!item.url.startsWith("mailto:")) {
      linkEl.target = "_blank";
      linkEl.rel = "noopener noreferrer";
    }

    linkEl.innerHTML = `
      <div class="link-content">
        <i class="bi ${item.icon} link-icon" aria-hidden="true"></i>
        <span class="link-title">${escapeHTML(item.title)}</span>
      </div>
      <i class="bi bi-arrow-up-right link-arrow" aria-hidden="true"></i>
    `;

    container.appendChild(linkEl);
  });
}

/**
 * Merender deretan icon media sosial
 */
function renderSocials(socials) {
  const container = document.getElementById("socialsContainer");
  if (!container) return;

  container.innerHTML = "";

  socials.forEach(soc => {
    const socLink = document.createElement("a");
    socLink.href = soc.url;
    socLink.className = "social-btn";
    socLink.target = "_blank";
    socLink.rel = "noopener noreferrer";
    socLink.setAttribute("aria-label", soc.name);
    socLink.title = soc.name;

    socLink.innerHTML = `<i class="bi ${soc.icon}" aria-hidden="true"></i>`;

    container.appendChild(socLink);
  });
}

/**
 * Sanitasi string untuk mencegah injeksi HTML
 */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// -----------------------------------------------------------------------------
// 3. SHARE & TOAST INTERACTION
// -----------------------------------------------------------------------------

function initShare() {
  const shareBtn = document.getElementById("shareBtn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async () => {
    const canonicalUrl = window.location.href.startsWith("http") ? window.location.href : "https://link.kreativlabs.id/";
    const shareData = {
      title: "KreativLabs — Link Hub Resmi",
      text: "Koleksi link dan kanal resmi KreativLabs Studio Digital.",
      url: canonicalUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User dismiss
      }
    } else {
      try {
        await navigator.clipboard.writeText(canonicalUrl);
        showToast("Tautan link.kreativlabs.id berhasil disalin!");
      } catch (e) {
        showToast("Kunjungi https://link.kreativlabs.id/");
      }
    }
  });
}

let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.textContent = msg;
  toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// -----------------------------------------------------------------------------
// 4. INITIALIZATION ON DOM READY
// -----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Tahun dinamis di footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Render komponen
  renderLinks(linksData);
  renderSocials(socialsData);

  // Inisialisasi fitur share
  initShare();
});
