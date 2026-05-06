# RenameCheetah v1.1.0

A fast, scriptable batch file renaming utility for macOS, Windows, and Linux.

*by Richard Lesh*

---

## Features

- **Rename Scripts** — Create, duplicate, and manage reusable rename scripts
- **Script Steps** — Chain multiple operations: Find & Replace, Remove Text, Add Prefix, Add Suffix, Convert Case
- **Drag & Drop** — Drop files onto the app to preview renames instantly
- **Live Preview** — See "Current Name" vs "New Name" side-by-side before committing
- **Multi-Select** — Select multiple files to remove from the list
- **Inline Rename** — Double-click a filename to rename it immediately
- **Drag-Reorderable Steps** — Reorder script steps by dragging
- **Sortable File List** — Sort by current or new name, ascending or descending
- **Resizable Panels** — Drag dividers to adjust panel and column widths
- **Persistent Layout** — Window size, position, and divider positions saved between sessions
- **Auto-Save** — Scripts auto-save on a configurable interval (default 120s)
- **Context Menu** — Right-click files for Remove, Add Files, or Clear Files
- **Configurable** — Row colors, selection highlight color, and auto-save interval via config and settings
- **Cross-Platform** — macOS, Windows, and Linux builds via electron-builder
- **Code Signing** — macOS code signing and notarization support
- **License Key** — HMAC-SHA256 based license key system with splash nag for unlicensed users

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org) (v22 or later)
- npm

### Setup
```bash
git clone https://github.com/richlesh/RenameCheetah.git
cd RenameCheetah
npm install
```

### Running
```bash
npm start
```

---

## Building Distribution Packages

```bash
# All platforms and architectures
npm run dist:all

# Individual builds
npm run dist:mac:x64       # macOS Intel
npm run dist:mac:arm64     # macOS Apple Silicon
npm run dist:win:x64       # Windows x64
npm run dist:win:arm64     # Windows ARM64
npm run dist:linux:x64     # Linux x64
npm run dist:linux:arm64   # Linux ARM64
```

Output files are placed in the `dist/` folder.

---

## Project Structure

```
RenameCheetah/
├── main.js              # Electron main process
├── index.html           # Main window (three-panel rename UI)
├── styles.css           # Main window styles
├── settings.html        # Settings window
├── settings.js          # Settings module (load/save)
├── about.html           # About dialog
├── license.html         # License key entry
├── splash.html          # Splash screen
├── config.json          # App configuration (colors, autosave interval)
├── package.json         # npm/electron-builder config
├── app_icon.png/.icns/.ico  # App icons
├── generate_license_key.py  # License key generator
├── sign-mac.sh          # macOS code signing script
└── .github/workflows/   # CI/CD workflows
```

---

## License Key

Generate a license key for a user:
```bash
python3 generate_license_key.py user@example.com
```

---

## Tech Stack

- [Electron](https://www.electronjs.org)

---

## License

GPL 3.0
