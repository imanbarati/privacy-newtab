# Privacy New Tab

A clean, private Chrome/Edge new-tab page that brings back the classic experience — **no AI ads, no tracking, no telemetry**.

Just a clock, a search box, your most-visited sites, and custom quick links. Everything stays on your device.

## Why?

Modern browser new-tab pages push AI suggestions, sponsored content, and data collection. This extension restores a simple, private start page:

- 🕐 Live clock & date  
- 🔍 Search (DuckDuckGo by default, or Google / Bing / Brave / Startpage)  
- 📌 Most Visited (from Chrome’s own list — no extra tracking)  
- 🔗 Custom quick links you control  
- 🎨 Soft themes (gradient / dark / light / nature)  
- 🔒 Zero network calls for core features (except when *you* search or optionally load a favicon)

## Privacy

- **No accounts**
- **No analytics / telemetry**
- **No AI features or suggestions**
- **No ads**
- Data is stored only in `chrome.storage.local` on your machine
- Permissions: `storage`, `topSites`, `favicon`

## Install (developer / sideload)

1. Download the release ZIP or clone this repo  
2. Open `chrome://extensions` (or `edge://extensions`)  
3. Enable **Developer mode**  
4. Click **Load unpacked** and select the `privacy-newtab` folder  

Or install from [Releases](../../releases).

## Pack a CRX yourself

In Chrome:

1. `chrome://extensions` → Developer mode  
2. **Pack extension** → choose the extension folder  
3. Chrome produces a `.crx` + `.pem` key  

## License

MIT — do whatever you want, just don’t turn it into adware.
