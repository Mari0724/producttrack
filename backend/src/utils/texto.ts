// Correcciones manuales que ya sé que pueden ocurrir por OCR defectuoso
const correccionesOCR: Record<string, string> = {
  'ntejas': 'lentejas',
  'ocalola': 'coca-cola'
};

/**
 * Limpia el texto extraído por OCR:
 * - Elimina saltos de línea
 * - Quita símbolos raros
 * - Solo deja letras, tildes y espacios
 * - Convierte a minúsculas y quita espacios extra
 */
export function limpiarTextoOCR(texto: string): string {
  return texto
    .replace(/\n/g, ' ')
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

/**
 * Aplica correcciones manuales conocidas sobre el texto limpio.
 * Sustituye palabras reconocidas por su forma correcta.
 */
export function corregirErroresOCR(texto: string): string {
  const palabras = texto.split(' ');
  const corregidas = palabras.map(palabra =>
    correccionesOCR[palabra] ? correccionesOCR[palabra] : palabra
  );
  return corregidas.join(' ');
}

/**
 * Obtiene las palabras candidatas de un texto (solo palabras de al menos 4 letras)
 * para usarlas en búsquedas de coincidencias parciales.
 */
export function obtenerCandidatosProductos(texto: string): string[] {
  return texto
    .split(' ')
    .filter(p => p.length >= 4);
}

/**
 * Obtiene la palabra más larga del texto.
 * Útil como último recurso si ninguna coincidencia decente se encuentra.
 */
export function palabraMasLarga(texto: string): string {
  const palabras = texto.split(/\s+/);
  let mayor = '';
  for (const palabra of palabras) {
    if (palabra.length > mayor.length) {
      mayor = palabra;
    }
  }
  return mayor;
}

/**
 * Selecciona el mejor producto de la lista según:
 * 1. Coincidencia exacta de palabra clave (ej. contiene 'lenteja' pero no 'pasta')
 * 2. Si no hay, calcula un score de coincidencias parciales y devuelve el de mayor score
 * 
 * productos Lista de productos candidatos desde OpenFoodFacts
 * Texto OCR ya limpio y corregido
 * El mejor producto encontrado o undefined
 */
export function elegirMejorResultado(productos: any[], textoLimpio: string): any | undefined {
  if (productos.length === 0) return undefined;

  const textoLower = textoLimpio.toLowerCase();

  // 1️⃣ Buscar coincidencia exacta (contiene 'lenteja', no contiene 'pasta')
  const matchExacto = productos.find(p => 
    p.nombre.toLowerCase().includes('lenteja') &&
    !p.nombre.toLowerCase().includes('pasta')
  );
  if (matchExacto) return matchExacto;

  // 2️⃣ Si no hay exacto, buscar coincidencias parciales palabra por palabra
  const coincidencias = productos.map(p => {
    const nombreLower = p.nombre.toLowerCase();
    const palabras = textoLower.split(/\s+/);
    const score = palabras.reduce((acc, palabra) => {
      if (palabra.length >= 4 && nombreLower.includes(palabra)) {
        acc += 1;
      }
      return acc;
    }, 0);
    return { producto: p, score };
  });

  // 3️⃣ Ordenar por mayor score y devolver el primero
  coincidencias.sort((a, b) => b.score - a.score);

  return coincidencias[0].producto;
}

/**
 🔄 Flujo completo para procesar texto OCR y elegir mejor producto
  
  textoOCR Texto crudo extraído desde OCR
  productosOpenFoodFacts Resultados desde la API de OpenFoodFacts
 */
export function procesarOCRySeleccionarProducto(textoOCR: string, productosOpenFoodFacts: any[]): any | undefined {
  const textoLimpio = limpiarTextoOCR(textoOCR);
  const textoCorregido = corregirErroresOCR(textoLimpio);
  return elegirMejorResultado(productosOpenFoodFacts, textoCorregido);
}
