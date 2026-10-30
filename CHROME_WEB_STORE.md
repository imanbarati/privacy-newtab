# Chrome Web Store — Submission Guide & Paste-Ready Listing

Use this document while submitting **Privacy New Tab** at  
https://chrome.google.com/webstore/devconsole

---

## A. One-time setup (before first publish)

1. Go to https://chrome.google.com/webstore/devconsole  
2. Sign in with the Google account that will own the extension.  
3. Pay the **one-time $5 USD developer registration fee** if you have not already.  
4. Accept the Developer Agreement.

---

## B. Prepare the ZIP to upload

From the project folder (the folder that contains `manifest.json` at its root — **not** a parent folder):

```bash
cd privacy-newtab
zip -r ../privacy-newtab-1.0.1.zip . -x "*.git*" -x "*DS_Store*"
```

**Critical:** `manifest.json` must be at the **root** of the ZIP, not inside a subfolder.

---

## C. Create the item in the dashboard

1. Developer Dashboard → **New item**  
2. Upload the ZIP.  
3. After upload succeeds, fill every tab below.

---

## D. Store listing — copy/paste fields

### Product name
```
Privacy New Tab
```

### Summary (short description — max 132 characters)
```
Clean private new tab: clock, search, top sites & quick links. No AI ads, no tracking, no telemetry.
```

### Detailed description
```
Privacy New Tab restores a simple, classic new-tab page — without AI suggestions, sponsored content, or tracking.

WHAT YOU GET
• Live clock and date
• Search box (DuckDuckGo by default — switch to Google, Bing, Brave, or Startpage)
• Most Visited sites from Chrome’s own list
• Custom quick links you add and remove yourself
• Soft themes: gradient, dark, light, or nature vibe
• 12- or 24-hour clock

PRIVACY FIRST
• No accounts
• No analytics or telemetry
• No ads and no AI features
• Settings and quick links stay in chrome.storage.local on your device only
• Opening a new tab does not contact any developer server
• Search queries go only to the engine you choose, when you press Enter

PERMISSIONS (minimal)
• storage — save your preferences and quick links locally
• topSites — show the same most-visited list Chrome already keeps
• favicon — show site icons from Chrome’s cache

Open source: https://github.com/imanbarati/privacy-newtab
Privacy policy: https://raw.githubusercontent.com/imanbarati/privacy-newtab/main/PRIVACY.md

If you want a new tab that stays out of your way, this is it.
```

### Category
```
Productivity
```

### Language
```
English
```

### Official URL
```
https://github.com/imanbarati/privacy-newtab
```

### Support URL
```
https://github.com/imanbarati/privacy-newtab/issues
```

---

## E. Graphic assets

| Asset | Size | Required? |
|-------|------|-----------|
| Store icon | 128 × 128 PNG | Yes — use icons/icon128.png |
| Screenshots | 1280 × 800 or 640 × 400 | Yes (min 1, max 5) |

Capture the real new-tab UI with the extension loaded.

---

## F. Privacy practices

**Single purpose**
```
Provides a private new-tab page with clock, search, most-visited sites, and user-defined quick links. No tracking or ads.
```

**Collects user data?** → No

**Privacy policy URL**
```
https://raw.githubusercontent.com/imanbarati/privacy-newtab/main/PRIVACY.md
```

**Permission justifications**

- storage — Stores preferences and quick links only on-device via chrome.storage.local.
- topSites — Displays Chrome’s most-visited list; not transmitted.
- favicon — Icons from Chrome’s cache only.

---

## G. Submit

Visibility: Public · Pricing: Free · Submit for review.
