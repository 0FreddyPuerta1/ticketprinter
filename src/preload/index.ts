import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
const api = {
  getArch: (): Promise<string> => ipcRenderer.invoke("get-arch"),
  getAvailableSerialPorts: (): Promise<string[]> => ipcRenderer.invoke("get-serialports"),
  readFromPort: (portName: string, baudRate: number): Promise<string[]> =>
    ipcRenderer.invoke("get-peso", portName, baudRate),
  getPrinterList: (): Promise<unknown[]> => ipcRenderer.invoke("get-printers"),
  print: (
    cn: string,
    date: string,
    hour: string,
    customer: string,
    id: string,
    loc: string,
    peso: string
  ): Promise<unknown> => ipcRenderer.invoke("print", cn, date, hour, customer, id, loc, peso)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
