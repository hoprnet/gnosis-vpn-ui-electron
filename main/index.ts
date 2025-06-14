const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
import {
  updateConfigFile,
  startService,
  stopService,
  connectToServer,
  getStatusInfo,
} from "./commands";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const isDev = process.env.NODE_ENV === "development";
let isQuitting = false;
let mainWindow: any = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    // During development, load the React dev server
    mainWindow.loadURL("http://localhost:5173"); // or your dev server port
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../renderer/dist/index.html"));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Send message after the window finishes loading
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send(
      "message",
      "Window loaded to the main process!",
    );
  });

  ipcMain.on("message", async (_event: any, msg: string) => {
    console.log("Received from renderer: ", msg);

    const json = JSON.parse(msg);
    const type = json.type;
    const payload = json.payload;

    switch (type) {
      case "updateConfigFile":
        try {
          await updateConfigFile(payload.apiEndpoint, payload.apiToken);
          mainWindow.webContents.send(
            "message",
            JSON.stringify({
              type: "updateConfigFileResponse",
              payload: "Success",
            }),
          );
        } catch (e) {
          mainWindow.webContents.send(
            "message",
            JSON.stringify({
              error: e,
            }),
          );
        }
        break;
      case "startVPN":
        try {
          await startService();
          console.info("Service status:", await getStatusInfo());
          await new Promise((r) => setTimeout(r, 2000));
          await connectToServer(
            "12D3KooWMEXkxWMitwu9apsHmjgDZ7imVHgEsjXfcyZfrqYMYjW7",
          );

          mainWindow.webContents.send(
            "message",
            JSON.stringify({
              type: "startVPNResponse",
              payload: "Success",
            }),
          );
        } catch (e) {
          mainWindow.webContents.send(
            "message",
            JSON.stringify({
              error: e,
            }),
          );
        }
        break;
      case "stopVPN":
        try {
          await stopService();
          mainWindow.webContents.send(
            "message",
            JSON.stringify({
              type: "stopVPNResponse",
              payload: "Success",
            }),
          );
        } catch (e) {
          mainWindow.webContents.send(
            "message",
            JSON.stringify({
              error: e,
            }),
          );
        }
        break;
      case "status":
        try {
          const payload = await getStatusInfo();
          mainWindow.webContents.send(
            "message",
            JSON.stringify({
              type: "statusResponse",
              payload,
            }),
          );
        } catch (e) {
          mainWindow.webContents.send(
            "message",
            JSON.stringify({
              error: e,
            }),
          );
        }
        break;
      default:
        mainWindow.webContents.send(
          "message",
          "Sending message back to renderer: " + msg,
        );
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('before-quit', (event: { preventDefault: () => void; }) => {
  if (isQuitting) return; //
  event.preventDefault(); // Prevent default quit
  isQuitting = true;
  if (mainWindow) {
    console.info("Sending message to renderer before quitting");
    mainWindow.webContents.send(
      "message",
      JSON.stringify({
        type: "quitingApplication",
      }),
    );
  }
  (async () => {
    //await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate async work
    await stopService();
    app.quit(); // Quit after async work is done
  })();
});

app.on("quit", () => {
  console.info("Quitting");
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
