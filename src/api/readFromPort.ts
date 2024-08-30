import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

export async function readFromPort(portName: string, baudRate: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const port = new SerialPort({ path: portName, baudRate: baudRate }, (err) => {
      if (err) {
        return reject(`Error opening port: ${err.message}`);
      }
    });

    const parser = port.pipe(new ReadlineParser({ delimiter: "=" }));

    parser.on("data", (data: string) => {
      resolve(data.trim());
      closePort(); // Cierra el puerto una vez se recibe y resuelve el dato
    });

    port.on("error", (err) => {
      reject(`Serial port error: ${err.message}`);
      closePort(); // Cierra el puerto si ocurre un error
    });

    // Cierra el puerto después de un timeout si no se recibe ningún dato
    const timeoutId = setTimeout(() => {
      if (port.isOpen) {
        closePort();
        reject(new Error("Timeout: No data received"));
      }
    }, 10000);

    function closePort(): void {
      if (port.isOpen) {
        port.close((err) => {
          if (err) {
            console.error(`Error closing port: ${err.message}`);
          }
        });
      }
      clearTimeout(timeoutId); // Limpia el timeout si el puerto se cierra
    }
  });
}
