(() => {
  "use strict";

  const DEFAULTS = {
    searchEngine: "https://duckduckgo.com/?q=",
    showTopsites: true,
    showQuicklinks: true,
    clock24h: false,
    bgStyle: "gradient",
    quickLinks: [
      { title: "GitHub", url: "https://github.com" },
      { title: "Wikipedia", url: "https://en.wikipedia.org" },
      { title: "Reddit", url: "https://www.reddit.com" },
      { title: "YouTube", url: "https://www.youtube.com" }
    ]
  };

  let settings = { ...DEFAULTS };

  function updateClock() {
    const now = new Date();
    const timeEl = document.getElementById("time");
    const dateEl = document.getElementById("date");

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    let period = "";

    if (!settings.clock24h) {
      period = hours >= 12 ? " PM" : " AM";
      hours = hours % 12 || 12;
    } else {
      hours = String(hours).padStart(2, "0");
    }

    timeEl.textContent = `${hours}:${minutes}${period}`;

    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }

  function loadTopSites() {
    const grid = document.getElementById("topsites-grid");
    const section = document.getElementById("topsites");

    if (!settings.showTopsites) {
      section.style.display = "none";
      return;
    }
    section.style.display = "";

    if (!chrome?.topSites) {
      grid.innerHTML = "<p class='site-title' style='grid-column:1/-1'>Top sites unavailable</p>";
      return;
    }

    chrome.topSites.get((sites) => {
      grid.innerHTML = "";
      const list = (sites || []).slice(0, 8);
      list.forEach((site) => {
        const a = document.createElement("a");
        a.className = "site-card";
        a.href = site.url;
        a.title = site.title || site.url;

        const img = document.createElement("img");
        img.className = "site-icon";
        img.alt = "";
        img.src = getFaviconUrl(site.url);
        img.onerror = () => {
          img.src = fallbackIcon(site.title || site.url);
        };

        const span = document.createElement("span");
        span.className = "site-title";
        span.textContent = truncate(site.title || hostname(site.url), 14);

        a.append(img, span);
        grid.appendChild(a);
      });
    });
  }

  function renderQuickLinks() {
    const grid = document.getElementById("quicklinks-grid");
    const section = document.getElementById("quicklinks");

    if (!settings.showQuicklinks) {
      section.style.display = "none";
      return;
    }
    section.style.display = "";

    grid.innerHTML = "";
    (settings.quickLinks || []).forEach((link, idx) => {
      const a = document.createElement("a");
      a.className = "site-card";
      a.href = link.url;
      a.title = link.title;

      const img = document.createElement("img");
      img.className = "site-icon";
      img.alt = "";
      img.src = getFaviconUrl(link.url);
      img.onerror = () => {
        img.src = fallbackIcon(link.title);
      };

      const span = document.createElement("span");
      span.className = "site-title";
      span.textContent = truncate(link.title, 14);

      const remove = document.createElement("button");
      remove.className = "remove-link";
      remove.textContent = "\u00d7";
      remove.title = "Remove";
      remove.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        settings.quickLinks.splice(idx, 1);
        saveSettings();
        renderQuickLinks();
      });

      a.append(img, span, remove);
      grid.appendChild(a);
    });
  }

  function getFaviconUrl(url) {
    try {
      const u = new URL(url);
      if (chrome?.runtime?.id) {
        return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(u.href)}&size=32`;
      }
      return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(u.hostname)}&sz=32`;
    } catch {
      return fallbackIcon("?");
    }
  }

  function fallbackIcon(text) {
    const letter = (text || "?").charAt(0).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><rect width="36" height="36" rx="8" fill="#334155"/><text x="18" y="24" font-size="16" text-anchor="middle" fill="#e2e8f0" font-family="system-ui">${letter}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  function hostname(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  }

  function truncate(str, n) {
    if (!str) return "";
    return str.length > n ? str.slice(0, n - 1) + "\u2026" : str;
  }

  function loadSettings(cb) {
    if (!chrome?.storage?.local) {
      settings = { ...DEFAULTS };
      cb();
      return;
    }
    chrome.storage.local.get("privacyNewTabSettings", (data) => {
      settings = { ...DEFAULTS, ...(data.privacyNewTabSettings || {}) };
      cb();
    });
  }

  function saveSettings() {
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ privacyNewTabSettings: settings });
    }
  }

  function applyTheme() {
    const bg = document.getElementById("bg");
    bg.className = "bg " + (settings.bgStyle === "gradient" ? "" : settings.bgStyle);
    document.body.classList.toggle("light-theme", settings.bgStyle === "light");
  }

  function applySettingsToUI() {
    document.getElementById("search-engine").value = settings.searchEngine;
    document.getElementById("show-topsites").checked = settings.showTopsites;
    document.getElementById("show-quicklinks").checked = settings.showQuicklinks;
    document.getElementById("clock-24h").checked = settings.clock24h;
    document.getElementById("bg-style").value = settings.bgStyle;
    applyTheme();
    updateClock();
    loadTopSites();
    renderQuickLinks();
  }

  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("search-input").value.trim();
    if (!q) return;
    const engine = settings.searchEngine || DEFAULTS.searchEngine;
    if (/^https?:\/\//i.test(q) || /^[\w-]+\.[\w.-]+(\/|$)/.test(q)) {
      let url = q;
      if (!/^https?:\/\//i.test(url)) url = "https://" + url;
      location.href = url;
    } else {
      location.href = engine + encodeURIComponent(q);
    }
  });

  const panel = document.getElementById("settings-panel");
  document.getElementById("settings-btn").addEventListener("click", () => {
    panel.classList.remove("hidden");
  });
  document.getElementById("close-settings").addEventListener("click", () => {
    panel.classList.add("hidden");
  });

  document.getElementById("search-engine").addEventListener("change", (e) => {
    settings.searchEngine = e.target.value;
    saveSettings();
  });
  document.getElementById("show-topsites").addEventListener("change", (e) => {
    settings.showTopsites = e.target.checked;
    saveSettings();
    loadTopSites();
  });
  document.getElementById("show-quicklinks").addEventListener("change", (e) => {
    settings.showQuicklinks = e.target.checked;
    saveSettings();
    renderQuickLinks();
  });
  document.getElementById("clock-24h").addEventListener("change", (e) => {
    settings.clock24h = e.target.checked;
    saveSettings();
    updateClock();
  });
  document.getElementById("bg-style").addEventListener("change", (e) => {
    settings.bgStyle = e.target.value;
    saveSettings();
    applyTheme();
  });

  const modal = document.getElementById("add-link-modal");
  document.getElementById("add-link-btn").addEventListener("click", () => {
    document.getElementById("link-title").value = "";
    document.getElementById("link-url").value = "";
    modal.classList.remove("hidden");
    document.getElementById("link-title").focus();
  });
  document.getElementById("cancel-link").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  document.getElementById("save-link").addEventListener("click", () => {
    const title = document.getElementById("link-title").value.trim();
    let url = document.getElementById("link-url").value.trim();
    if (!title || !url) return;
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    settings.quickLinks = settings.quickLinks || [];
    settings.quickLinks.push({ title, url });
    saveSettings();
    renderQuickLinks();
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  loadSettings(() => {
    applySettingsToUI();
    setInterval(updateClock, 1000);
  });
})();
