const { app, BrowserWindow, ipcMain, Menu, nativeImage, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const nodeCrypto = require("crypto");
const { load, save } = require("./settings");

const LICENSE_SALT = "RenameCheetah-2026";

function openExternal(url) {
  if (process.platform === "linux") {
    const child = spawn("xdg-open", [url], { detached: true, stdio: "ignore" });
    child.unref();
  } else {
    shell.openExternal(url);
  }
}

function expectedLicenseKey(userName) {
  const hmac = nodeCrypto.createHmac("sha256", LICENSE_SALT);
  hmac.update(userName.toLowerCase().trim());
  return hmac.digest("hex").slice(0, 16).toUpperCase();
}

function isValidLicense(key, userName) {
  if (!key || !userName) return false;
  return key.toUpperCase() === expectedLicenseKey(userName);
}

const appIcon = nativeImage.createFromPath(path.join(__dirname, "app_icon.icns"));

app.name = "RenameCheetah";

app.setAboutPanelOptions({
  applicationName: "RenameCheetah",
  applicationVersion: require("./package.json").version,
  credits: `by Richard Lesh\nBuilt with Electron v${process.versions.electron}`,
  website: "https://glowingcatsoftware.com/RenameCheetah.html",
  iconImage: appIcon
});

let mainWin, settingsWin;

function createWindow() {
  const settings = load();
  const wb = settings.windowBounds || { width: 1000, height: 700 };
  const win = new BrowserWindow({
    width: wb.width,
    height: wb.height,
    x: wb.x,
    y: wb.y,
    icon: appIcon,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  win.on("close", () => {
    const bounds = win.getBounds();
    const s = load();
    s.windowBounds = bounds;
    save(s);
  });
  win.loadFile("index.html");
  win.webContents.on("will-navigate", (e, url) => {
    e.preventDefault();
    // If navigating to a file:// URL, it's a file drop that wasn't caught by renderer
    if (url.startsWith("file://")) {
      const filePath = decodeURIComponent(url.replace("file://", ""));
      win.webContents.send("files-dropped", [filePath]);
    }
  });
  if (!mainWin) {
    mainWin = win;
    buildMenu();
  }
  return win;
}

let aboutWin;
function showAbout() {
  if (aboutWin && !aboutWin.isDestroyed()) return aboutWin.focus();
  aboutWin = new BrowserWindow({
    width: 320,
    height: 420,
    resizable: false,
    minimizable: false,
    maximizable: false,
    parent: mainWin,
    modal: true,
    icon: appIcon,
    show: false,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  aboutWin.setMenuBarVisibility(false);
  aboutWin.loadFile("about.html");
  aboutWin.once("ready-to-show", () => {
    if (mainWin && !mainWin.isDestroyed()) {
      const [px, py] = mainWin.getPosition();
      const [pw, ph] = mainWin.getSize();
      const [w, h] = aboutWin.getSize();
      aboutWin.setPosition(Math.round(px + (pw - w) / 2), Math.round(py + (ph - h) / 2));
    }
    aboutWin.show();
  });
  aboutWin.webContents.once("did-finish-load", () => {
    aboutWin.webContents.send("icon-path", path.join(__dirname, "app_icon.png"));
    aboutWin.webContents.send("app-version", require("./package.json").version);
    const { licenseKey, userName } = load();
    if (isValidLicense(licenseKey, userName)) aboutWin.webContents.send("licensed");
  });
  ipcMain.handleOnce("close-about", () => aboutWin?.close());
  aboutWin.on("closed", () => { aboutWin = null; });
}

function buildMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    {
      label: app.name,
      submenu: [
        { label: "About RenameCheetah", click: showAbout },
        { type: "separator" },
        { label: "Settings…", click: openSettings },
        { label: "License Key…", click: openLicense },
        { type: "separator" },
        ...(isMac ? [
          { role: "hide" },
          { role: "hideOthers" },
          { role: "unhide" },
          { type: "separator" },
        ] : []),
        { role: "quit" }
      ]
    },
    {
      label: "File",
      submenu: [
        { label: "Add Files…", accelerator: "CmdOrCtrl+O", click: () => mainWin?.webContents.send("menu-add-files") },
        { label: "Remove File", id: "remove-file", enabled: false, click: () => mainWin?.webContents.send("menu-remove-file") },
        { label: "Clear Files", click: () => mainWin?.webContents.send("menu-clear-files") },
        { type: "separator" },
        { role: "close" }
      ]
    },
    { role: "editMenu" },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        ...(isMac ? [{ role: "zoom" }] : []),
        { type: "separator" },
        {
          label: "Toggle Developer Tools",
          accelerator: isMac ? "Cmd+Option+I" : "Ctrl+Shift+I",
          click: () => BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools()
        },
        ...(isMac ? [
          { type: "separator" },
          { role: "front" },
        ] : []),
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

let licenseWin;

function openLicense() {
  if (licenseWin) return licenseWin.focus();
  licenseWin = new BrowserWindow({
    width: 360,
    height: 260,
    resizable: false,
    parent: mainWin,
    modal: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  licenseWin.setMenuBarVisibility(false);
  licenseWin.loadFile("license.html");
  licenseWin.webContents.once("did-finish-load", () => {
    const { licenseKey, userName } = load();
    licenseWin.webContents.send("license-data", { key: licenseKey || "", userName: userName || "" });
  });
  licenseWin.on("closed", () => { licenseWin = null; });
}

ipcMain.handle("license-save", (_e, { key, userName }) => {
  if (!isValidLicense(key, userName)) return;
  const settings = load();
  settings.licenseKey = key.toUpperCase();
  settings.userName = userName;
  save(settings);
  licenseWin?.close();
});

ipcMain.handle("license-cancel", () => licenseWin?.close());

function openSettings() {
  if (settingsWin) return settingsWin.focus();
  settingsWin = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    parent: mainWin,
    modal: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  settingsWin.setMenuBarVisibility(false);
  settingsWin.loadFile("settings.html");
  settingsWin.on("closed", () => { settingsWin = null; });
}

ipcMain.handle("settings-get-data", () => ({ settings: load() }));

ipcMain.handle("settings-save", (_e, newSettings) => {
  const existing = load();
  save({ ...existing, ...newSettings });
  settingsWin?.close();
  mainWin?.webContents.send("settings-updated");
});

ipcMain.handle("settings-cancel", () => settingsWin?.close());

ipcMain.handle("open-external", (_e, url) => openExternal(url));

ipcMain.handle("focus-window", () => {
  if (mainWin) { mainWin.show(); mainWin.focus(); }
});

ipcMain.handle("pick-files", async () => {
  const result = await dialog.showOpenDialog(mainWin, { properties: ["openFile", "multiSelections"] });
  return result.canceled ? [] : result.filePaths;
});

ipcMain.handle("show-file-context-menu", (_e, hasFile) => {
  const template = [
    { label: "Remove File", enabled: hasFile, click: () => mainWin?.webContents.send("menu-remove-file") },
    { type: "separator" },
    { label: "Add Files…", click: () => mainWin?.webContents.send("menu-add-files") },
    { label: "Clear Files", click: () => mainWin?.webContents.send("menu-clear-files") },
  ];
  Menu.buildFromTemplate(template).popup({ window: mainWin });
});

ipcMain.handle("update-selection", (_e, hasSelection) => {
  const menu = Menu.getApplicationMenu();
  const item = menu?.getMenuItemById("remove-file");
  if (item) item.enabled = hasSelection;
});

ipcMain.handle("rename-files", async (_e, ops) => {
  try {
    for (const { oldPath, newPath } of ops) {
      fs.renameSync(oldPath, newPath);
    }
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
});

function showSplash(nagOnly) {
  const splash = new BrowserWindow({
    width: 320,
    height: 340,
    resizable: false,
    minimizable: false,
    maximizable: false,
    frame: false,
    icon: appIcon,
    parent: nagOnly ? mainWin : undefined,
    modal: !!nagOnly,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  splash.loadFile("splash.html");
  splash.webContents.once("did-finish-load", () => {
    splash.webContents.send("icon-path", path.join(__dirname, "app_icon.png"));
    splash.webContents.send("app-version", require("./package.json").version);
  });

  const handler = () => {
    if (!splash.isDestroyed()) splash.close();
    if (!nagOnly) createWindow();
  };
  ipcMain.once("splash-close", handler);
  splash.on("closed", () => ipcMain.removeListener("splash-close", handler));
}

app.whenReady().then(() => {
  const { licenseKey, userName } = load();
  if (isValidLicense(licenseKey, userName)) {
    createWindow();
  } else {
    showSplash();
  }
});
