import escpos from "escpos";
import USB from "escpos-usb";

export function printSampleReceipt(
  cn: string,
  date: string,
  hour: string,
  customer: string,
  id: string,
  loc: string,
  peso: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const device = new USB(0x04b8, 0x0202);
    const options = { encoding: "GB18030" };
    const printer = new escpos.Printer(device, options);

    device.open((error) => {
      if (error) {
        console.error(`Error al abrir el dispositivo: ${error}`);
        reject(error);
        return;
      }

      printer
        .font("A")
        .align("CT")
        .style("B")
        .size(1, 1)
        .text("FRIGORIFICO SAS")
        .style("NORMAL")
        .size(1, 1)
        .newLine()
        .text("NIT: 0000000000")
        .text("--------------------------------")
        .newLine()
        .align("LT")
        .text("CN       Fecha        Hora")
        .text(`${cn}    ${date}     ${hour}`)
        .newLine()
        .text(`Cliente: ${customer}`)
        .text(`ID: ${id}`)
        .text(`Loc: ${loc}`)
        .newLine()
        .newLine()
        .text(`Peso: ${peso} Kg`)
        .text("--------------------------------")
        .newLine()
        .newLine()
        .newLine()
        .newLine()
        .newLine()
        .cut()
        .close(() => {
          resolve();
        });
    });
  });
}
