export class Operacion {
  nombre: string;
  argumentos: unknown[];

  constructor(nombre: string, argumentos: unknown[]) {
    this.nombre = nombre;
    this.argumentos = argumentos;
  }
}

export class ConectorPlugin {
  static URL_PLUGIN_POR_DEFECTO: string = "http://localhost:8000";
  static Operacion = Operacion;
  static TAMAÑO_IMAGEN_NORMAL: number = 0;
  static TAMAÑO_IMAGEN_DOBLE_ANCHO: number = 1;
  static TAMAÑO_IMAGEN_DOBLE_ALTO: number = 2;
  static TAMAÑO_IMAGEN_DOBLE_ANCHO_Y_ALTO: number = 3;
  static ALINEACION_IZQUIERDA: number = 0;
  static ALINEACION_CENTRO: number = 1;
  static ALINEACION_DERECHA: number = 2;
  static RECUPERACION_QR_BAJA: number = 0;
  static RECUPERACION_QR_MEDIA: number = 1;
  static RECUPERACION_QR_ALTA: number = 2;
  static RECUPERACION_QR_MEJOR: number = 3;

  ruta: string;
  serial: string;
  operaciones: Operacion[];

  constructor(ruta: string = ConectorPlugin.URL_PLUGIN_POR_DEFECTO, serial: string = "") {
    this.ruta = ruta;
    this.serial = serial;
    this.operaciones = [];
  }

  CargarImagenLocalEImprimir(
    ruta: string,
    tamaño: number,
    maximoAncho: number,
    ...args: unknown[]
  ): this {
    this.operaciones.push(
      new Operacion("CargarImagenLocalEImprimir", [ruta, tamaño, maximoAncho, ...args])
    );
    return this;
  }

  Corte(lineas: number): this {
    this.operaciones.push(new Operacion("Corte", [lineas]));
    return this;
  }

  CorteParcial(): this {
    this.operaciones.push(new Operacion("CorteParcial", []));
    return this;
  }

  DefinirCaracterPersonalizado(caracterRemplazo: string, matriz: number[][]): this {
    this.operaciones.push(
      new Operacion("DefinirCaracterPersonalizado", [caracterRemplazo, matriz])
    );
    return this;
  }

  DescargarImagenDeInternetEImprimir(
    urlImagen: string,
    tamaño: number,
    maximoAncho: number,
    ...args: unknown[]
  ): this {
    this.operaciones.push(
      new Operacion("DescargarImagenDeInternetEImprimir", [urlImagen, tamaño, maximoAncho, ...args])
    );
    return this;
  }

  DeshabilitarCaracteresPersonalizados(): this {
    this.operaciones.push(new Operacion("DeshabilitarCaracteresPersonalizados", []));
    return this;
  }

  DeshabilitarElModoDeCaracteresChinos(): this {
    this.operaciones.push(new Operacion("DeshabilitarElModoDeCaracteresChinos", []));
    return this;
  }

  EscribirTexto(texto: string): this {
    this.operaciones.push(new Operacion("EscribirTexto", [texto]));
    return this;
  }

  EstablecerAlineacion(alineacion: number): this {
    this.operaciones.push(new Operacion("EstablecerAlineacion", [alineacion]));
    return this;
  }

  EstablecerEnfatizado(enfatizado: boolean): this {
    this.operaciones.push(new Operacion("EstablecerEnfatizado", [enfatizado]));
    return this;
  }

  EstablecerFuente(fuente: number): this {
    this.operaciones.push(new Operacion("EstablecerFuente", [fuente]));
    return this;
  }

  EstablecerImpresionAlReves(alReves: boolean): this {
    this.operaciones.push(new Operacion("EstablecerImpresionAlReves", [alReves]));
    return this;
  }

  EstablecerImpresionBlancoYNegroInversa(invertir: boolean): this {
    this.operaciones.push(new Operacion("EstablecerImpresionBlancoYNegroInversa", [invertir]));
    return this;
  }

  EstablecerRotacionDe90Grados(rotar: boolean): this {
    this.operaciones.push(new Operacion("EstablecerRotacionDe90Grados", [rotar]));
    return this;
  }

  EstablecerSubrayado(subrayado: boolean): this {
    this.operaciones.push(new Operacion("EstablecerSubrayado", [subrayado]));
    return this;
  }

  EstablecerTamañoFuente(multiplicadorAncho: number, multiplicadorAlto: number): this {
    this.operaciones.push(
      new Operacion("EstablecerTamañoFuente", [multiplicadorAncho, multiplicadorAlto])
    );
    return this;
  }

  Feed(lineas: number): this {
    this.operaciones.push(new Operacion("Feed", [lineas]));
    return this;
  }

  HabilitarCaracteresPersonalizados(): this {
    this.operaciones.push(new Operacion("HabilitarCaracteresPersonalizados", []));
    return this;
  }

  HabilitarElModoDeCaracteresChinos(): this {
    this.operaciones.push(new Operacion("HabilitarElModoDeCaracteresChinos", []));
    return this;
  }

  ImprimirCodigoDeBarrasCodabar(
    contenido: string,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasCodabar", [contenido, alto, ancho, tamañoImagen])
    );
    return this;
  }

  ImprimirCodigoDeBarrasCode128(
    contenido: string,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasCode128", [contenido, alto, ancho, tamañoImagen])
    );
    return this;
  }

  ImprimirCodigoDeBarrasCode39(
    contenido: string,
    incluirSumaDeVerificacion: boolean,
    modoAsciiCompleto: boolean,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasCode39", [
        contenido,
        incluirSumaDeVerificacion,
        modoAsciiCompleto,
        alto,
        ancho,
        tamañoImagen
      ])
    );
    return this;
  }

  ImprimirCodigoDeBarrasCode93(
    contenido: string,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasCode93", [contenido, alto, ancho, tamañoImagen])
    );
    return this;
  }

  ImprimirCodigoDeBarrasEan(
    contenido: string,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasEan", [contenido, alto, ancho, tamañoImagen])
    );
    return this;
  }

  ImprimirCodigoDeBarrasEan8(
    contenido: string,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasEan8", [contenido, alto, ancho, tamañoImagen])
    );
    return this;
  }

  ImprimirCodigoDeBarrasPdf417(
    contenido: string,
    nivelSeguridad: number,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasPdf417", [
        contenido,
        nivelSeguridad,
        alto,
        ancho,
        tamañoImagen
      ])
    );
    return this;
  }

  ImprimirCodigoDeBarrasTwoOfFiveITF(
    contenido: string,
    intercalado: boolean,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasTwoOfFiveITF", [
        contenido,
        intercalado,
        alto,
        ancho,
        tamañoImagen
      ])
    );
    return this;
  }

  ImprimirCodigoDeBarrasUpcA(
    contenido: string,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasUpcA", [contenido, alto, ancho, tamañoImagen])
    );
    return this;
  }

  ImprimirCodigoDeBarrasUpcE(
    contenido: string,
    alto: number,
    ancho: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoDeBarrasUpcE", [contenido, alto, ancho, tamañoImagen])
    );
    return this;
  }

  ImprimirCodigoQr(
    contenido: string,
    anchoMaximo: number,
    nivelRecuperacion: number,
    tamañoImagen: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirCodigoQr", [contenido, anchoMaximo, nivelRecuperacion, tamañoImagen])
    );
    return this;
  }

  ImprimirImagenEnBase64(
    imagenCodificadaEnBase64: string,
    tamaño: number,
    maximoAncho: number
  ): this {
    this.operaciones.push(
      new Operacion("ImprimirImagenEnBase64", [imagenCodificadaEnBase64, tamaño, maximoAncho])
    );
    return this;
  }

  Iniciar(): this {
    this.operaciones.push(new Operacion("Iniciar", []));
    return this;
  }

  Pulso(pin: number, tiempoEncendido: number, tiempoApagado: number): this {
    this.operaciones.push(new Operacion("Pulso", [pin, tiempoEncendido, tiempoApagado]));
    return this;
  }

  TextoSegunPaginaDeCodigos(numeroPagina: number, pagina: string, texto: string): this {
    this.operaciones.push(
      new Operacion("TextoSegunPaginaDeCodigos", [numeroPagina, pagina, texto])
    );
    return this;
  }

  async obtenerImpresoras(ruta?: string): Promise<unknown[]> {
    if (ruta) ConectorPlugin.URL_PLUGIN_POR_DEFECTO = ruta;
    const response = await fetch(ConectorPlugin.URL_PLUGIN_POR_DEFECTO + "/impresoras");
    return await response.json();
  }

  static async obtenerImpresorasRemotas(ruta: string, rutaRemota: string): Promise<unknown[]> {
    if (ruta) ConectorPlugin.URL_PLUGIN_POR_DEFECTO = ruta;
    const response = await fetch(
      ConectorPlugin.URL_PLUGIN_POR_DEFECTO + `/reenviar?host=${rutaRemota}`
    );
    return await response.json();
  }

  async imprimirEnImpresoraRemota(nombreImpresora: string, rutaRemota: string): Promise<unknown> {
    const payload = {
      operaciones: this.operaciones,
      nombreImpresora,
      serial: this.serial
    };
    const response = await fetch(`${this.ruta}/reenviar?host=${rutaRemota}`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return await response.json();
  }

  async imprimirEn(nombreImpresora: string): Promise<unknown> {
    const payload = {
      operaciones: this.operaciones,
      nombreImpresora,
      serial: this.serial
    };
    const response = await fetch(`${this.ruta}/imprimir`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return await response.json();
  }
}
