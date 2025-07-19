import { Controller, Get, Path, Route, Tags, } from "tsoa";
import { obtenerHistorialInventario } from "../services/historial.service";
import { HistorialInventarioDTO } from "../types/historial";

@Route("historial")
@Tags("Historial")
export class HistorialController extends Controller {
    @Get("/usuario/{idUsuario}")
    public async obtenerHistorialPorUsuario(
        @Path() idUsuario: number
    ): Promise<HistorialInventarioDTO[]> {
        return await obtenerHistorialInventario(idUsuario);
    }
}