import { ipcMain } from "electron";
import { getSystemArchitecture } from "../api/sysInfo";
import { getAvailableSerialPorts } from "../api/getAvailableSerialPorts";
import { readFromPort } from "../api/readFromPort";
import { getPrinterList } from "../api/getPrinterList";
import { printSampleReceipt } from "../api/printProofFile";
export function registerIpcHandlers(): void {
  ipcMain.handle("get-arch", () => {
    return getSystemArchitecture();
  });
  ipcMain.handle("get-serialports", () => {
    return getAvailableSerialPorts();
  });
  ipcMain.handle("get-peso", (_event, portName: string, baudRate: number) => {
    return readFromPort(portName, baudRate);
  });
  ipcMain.handle("get-printers", () => {
    return getPrinterList();
  });

  ipcMain.handle(
    "print",
    (
      _event,
      cn: string,
      date: string,
      hour: string,
      customer: string,
      id: string,
      loc: string,
      peso: string
    ) => {
      console.log("Datos recibidos en ipcMain:", { cn, date, hour, customer, id, loc, peso });
      return printSampleReceipt(cn, date, hour, customer, id, loc, peso);
    }
  );
}
