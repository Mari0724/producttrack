import { createWorker, PSM } from 'tesseract.js';

export async function createOcrClient(imagePath: string): Promise<string> {
  const worker = await createWorker();

  try {

    //reconocer texto en inges y español
    await worker.load();
    await worker.reinitialize('eng+spa');

    //Busca texto suelto
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SPARSE_TEXT
    });

    //Se le da la imagen e intenta leer el texto
    const { data } = await worker.recognize(imagePath);

    return data.text;
  } catch (error: any) {
    console.error('❌ Error en OCR worker:', error);
    throw new Error(`Error en OCR: ${error.message || error}`);
  } finally {
    await worker.terminate();
  }
}