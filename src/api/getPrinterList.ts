import { ConectorPlugin } from "../utils/ConectorImpresoras";

const conectorPlugin = new ConectorPlugin();

export async function getPrinterList(): Promise<unknown[]> {
  const printers = await conectorPlugin.obtenerImpresoras();
  console.log(printers);
  return printers;
}
