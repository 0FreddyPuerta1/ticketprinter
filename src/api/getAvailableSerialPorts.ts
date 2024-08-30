import { SerialPort } from "serialport";

export async function getAvailableSerialPorts(): Promise<unknown[]> {
  const serialPortList = await SerialPort.list();
  return serialPortList;
}
