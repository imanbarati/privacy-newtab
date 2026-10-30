# Privacy Policy — Privacy New Tab

**Effective date:** October 30, 2026  
**Last updated:** October 30, 2026

## Developer contact

For privacy questions or requests: open an issue at  
https://github.com/imanbarati/privacy-newtab/issues  

(Or use the email listed on the Chrome Web Store developer account that published this extension.)

## Summary

Privacy New Tab does **not** collect, transmit, sell, or share personal data with any third party.  
There is no account system, no analytics, no advertising, and no remote backend controlled by the developer.

## Single purpose

This extension replaces the browser new-tab page with a local page that shows:

- A clock and date  
- A search box that sends queries **only** to the search engine you choose  
- Most-visited sites from Chrome’s built-in list  
- Quick links that you add yourself  

## Data the extension handles

| Data | Where it lives | Why | Shared? |
|------|----------------|-----|---------|
| Settings (search engine choice, theme, clock format, show/hide sections) | `chrome.storage.local` on your device only | Remember your preferences | No |
| Quick links (titles and URLs you enter) | `chrome.storage.local` on your device only | Show your shortcuts | No |
| Most-visited sites | Read via Chrome’s `topSites` API; never stored by us | Display the same list Chrome already keeps | No |
| Favicons | Chrome’s internal favicon cache when available; otherwise a local letter placeholder | Icons next to links | No |

We do **not** collect: browsing history, cookies, IP address, device identifiers, search queries (except the one you explicitly submit to a search engine of your choice), or any form of analytics events.

## Network activity

- Opening a new tab does **not** contact any developer-controlled server.  
- When you press Enter in the search box, the query goes **directly** to the search engine you selected (default: DuckDuckGo). That engine’s own privacy policy applies to the query.  
- No other outbound requests are made by the extension for core functionality.

## Permissions explained

| Permission | Justification |
|------------|----------------|
| `storage` | Save your settings and quick links locally |
| `topSites` | Show Chrome’s most-visited sites on the new tab |
| `favicon` | Display site icons from Chrome’s own cache |

No host permissions, no background service workers that run continuously, no content scripts, no remote code.

## Children’s privacy

This extension is not directed at children under 13. It does not knowingly collect data from anyone.

## Changes

If data handling practices ever change, this policy will be updated and the version of the extension will be increased. Material changes will be noted in the Chrome Web Store listing and in the GitHub repository.

## Your choices

- Uninstall the extension at any time via `chrome://extensions` — all local data stored by the extension is removed with it.  
- Clear extension storage via Chrome’s site settings if needed.

## Source code

The extension is open source: https://github.com/imanbarati/privacy-newtab
