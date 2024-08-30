import { useEffect, useState } from "react";
const baudRates: number[] = [
  110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200, 128000, 256000, 500000,
  1000000
];
type SerialPort = {
  path: string;
};
type receiptData = {
  cn: string;
  date: string;
  hour: string;
  customer: string;
  id: string;
  loc: string;
  peso: string;
};
function App(): JSX.Element {
  const [serialPorts, setSerialPorts] = useState<SerialPort[]>([{ path: "" }]);
  const [peso, setPeso] = useState<number | string>("???");
  const [config, setConfig] = useState({ port: "COM3", baud: 9600 });
  const [readPortError, setReadPortError] = useState<boolean>(false);
  const [hora, setHora] = useState<number | string>(0);
  const [receipt, setReceipt] = useState<receiptData>({
    cn: "",
    date: new Date().toLocaleDateString(),
    hour: hora.toString(),
    customer: "",
    id: "",
    loc: "s",
    peso: peso.toString()
  });
  useEffect(() => {
    (window.api as { getAvailableSerialPorts: () => Promise<SerialPort[]> })
      .getAvailableSerialPorts()
      .then((serialPortsList) => {
        console.log(serialPortsList);
        setSerialPorts(serialPortsList);
      })
      .catch(() => {
        alert("Error obteniendo puertos seriales");
      });
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const hora: string = new Date().toLocaleTimeString();
      setHora(hora);
      (window.api as { readFromPort: (portName: string, baudRate: number) => Promise<string> })
        .readFromPort(config.port, config.baud)
        .then((peso) => {
          if (!readPortError) {
            setReadPortError(false);
          }
          setPeso(peso);
        })
        .catch((error) => {
          setReadPortError(true);
          console.log("Error al leer el puerto serial", error);
        });
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonte
    return (): void => clearInterval(intervalId);
  }, [config]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setReceipt({ ...receipt, [e.target.name]: e.target.value });
  }
  return (
    <div className="bg-gray-100 w-full h-screen flex flex-col gap-4 p-2">
      <div className="flex flex-col p-4 items-center bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md">
        <h1 className="font-semibold text-2xl">TicketPrinter V. 1.0</h1>
        <h2 className="flex gap-1 font-light text-sm">
          Developed With <p className="text-red-600">♥</p> And Code By Freddy Puerta
        </h2>
      </div>
      <div className="flex flex-col gap-2 w-full p-2 border rounded-xl mt-2">
        <h1 className="mt-[-20px] ml-2 bg-gray-100 w-[100px] font-semibold">Configuración</h1>
        <div className="grid grid-cols-2 gap-2 items-center justify-center">
          <div className="flex flex-row gap-1 items-center">
            <label htmlFor="">COM:</label>
            <select
              className="border h-8 w-full"
              onChange={(e) => {
                setConfig({ ...config, port: e.target.value });
                console.log(config);
              }}
            >
              <option value="COM4">COM4</option>
              {serialPorts.map((serialPort) => (
                <option key={serialPort.path} value={serialPort.path}>
                  {serialPort.path}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-1 items-center ">
            <label htmlFor="">Baud Rate:</label>
            <select
              className="border h-8"
              onChange={(e) => {
                setConfig({ ...config, baud: parseInt(e.target.value) });
                console.log(config);
              }}
            >
              {baudRates.map((baudRate) => (
                <option key={baudRate} value={baudRate}>
                  {baudRate}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full border h-8 text-xs text-center">
          {readPortError
            ? "Error al leer puerto serial, intente cambiar el puerto COM o el Baud Rate"
            : "Leyendo puerto serial..."}
        </div>
      </div>
      <div className="flex flex-col border rounded-xl w-full h-full p-2">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="font-semibold text-2xl">Peso:</h1>
          <div className="w-full border h-full text-center justify-center font-bold text-4xl p-2 text-yellow-600">
            {readPortError ? "ERROR" : `${peso} Kg`}
          </div>
        </div>
        <form action="" className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex gap-2">
              <label htmlFor="">CN:</label>
              <input
                type="text"
                className="bg-transparent w-full border-b"
                name="cn"
                onChange={(e) => {
                  onInputChange(e);
                }}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="">Fecha:</label>
              <label htmlFor="">{new Date().toLocaleDateString()}</label>
            </div>
            <div className="flex gap-2">
              <label htmlFor="">Hora:</label>
              <label htmlFor="">{hora}</label>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Id:</label>
            <input
              type="text"
              className="bg-transparent border-b"
              name="id"
              onChange={(e) => {
                onInputChange(e);
              }}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Cliente:</label>
            <input
              type="text"
              className="bg-transparent border-b"
              name="customer"
              onChange={(e) => {
                onInputChange(e);
              }}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Loc:</label>
            <input
              type="text"
              className="bg-transparent border-b"
              name="loc"
              onChange={(e) => {
                onInputChange(e);
              }}
            />
          </div>
        </form>
      </div>
      <button
        onClick={() => {
          console.log("Datos a imprimir:", {
            cn: receipt.cn,
            date: receipt.date,
            hour: receipt.hour,
            customer: receipt.customer,
            id: receipt.id,
            loc: receipt.loc,
            peso: receipt.peso
          });

          (
            window.api as {
              print: (
                cn: string,
                date: string,
                hour: string,
                customer: string,
                id: string,
                loc: string,
                peso: string
              ) => Promise<unknown>;
            }
          )
            .print(
              receipt.cn,
              receipt.date,
              hora.toString(),
              receipt.customer,
              receipt.id,
              receipt.loc,
              peso.toString()
            )
            .then((result) => {
              console.log("Resultado de impresión:", result);
            })
            .catch((error) => {
              console.log("Error al imprimir:", error);
            });
        }}
      >
        Print
      </button>
    </div>
  );
}

export default App;
