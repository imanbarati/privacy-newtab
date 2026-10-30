# Privacy Policy — Privacy New Tab

**Last updated:** 2026-10-30

## Summary

Privacy New Tab does **not** collect, transmit, or sell any personal data.

## What the extension does

- Replaces the browser new-tab page with a local HTML/CSS/JS page
- Shows a clock, search box, most-visited sites (via Chrome’s `topSites` API), and user-defined quick links
- Stores preferences and quick links in `chrome.storage.local` only

## Network activity

- **None** for the core page itself
- When you type a search and press Enter, your query goes **directly** to the search engine you chose (default: DuckDuckGo)
- Favicons may be fetched from Chrome’s internal favicon cache or, as a fallback, from a public favicon endpoint — never from a server controlled by this extension’s author

## Permissions

| Permission   | Reason                                      |
|--------------|---------------------------------------------|
| `storage`    | Save settings & quick links locally         |
| `topSites`   | Display the same most-visited list Chrome already keeps |
| `favicon`    | Show site icons from Chrome’s cache         |

No host permissions, no background scripts that phone home, no content scripts.

## Contact

Open an issue on the GitHub repository if you have privacy questions.
