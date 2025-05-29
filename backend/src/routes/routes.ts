/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductosController } from './../controllers/Productos.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ResponseMessageWithData_any_": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "detalles": {"dataType":"any"},
            "data": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseMessage": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "detalles": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "_36_Enums.EstadoProducto": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DISPONIBLE"]},{"dataType":"enum","enums":["AGOTADO"]},{"dataType":"enum","enums":["RESERVADO"]},{"dataType":"enum","enums":["VENCIDO"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstadoProducto": {
        "dataType": "refAlias",
        "type": {"ref":"_36_Enums.EstadoProducto","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductosDTO": {
        "dataType": "refObject",
        "properties": {
            "codigoBarras": {"dataType":"string","required":true},
            "codigoQR": {"dataType":"string","required":true},
            "nombre": {"dataType":"string","required":true},
            "descripcion": {"dataType":"string","required":true},
            "cantidad": {"dataType":"double","required":true},
            "precio": {"dataType":"string","required":true},
            "fechaAdquisicion": {"dataType":"string","required":true},
            "fechaVencimiento": {"dataType":"string","required":true},
            "usuarioId": {"dataType":"double","required":true},
            "estado": {"ref":"EstadoProducto","required":true},
            "imagen": {"dataType":"string","required":true},
            "categoria": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ProductosDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"codigoBarras":{"dataType":"string"},"codigoQR":{"dataType":"string"},"nombre":{"dataType":"string"},"descripcion":{"dataType":"string"},"cantidad":{"dataType":"double"},"precio":{"dataType":"string"},"fechaAdquisicion":{"dataType":"string"},"fechaVencimiento":{"dataType":"string"},"usuarioId":{"dataType":"double"},"estado":{"ref":"_36_Enums.EstadoProducto"},"imagen":{"dataType":"string"},"categoria":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"silently-remove-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsProductosController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                nombre: {"in":"query","name":"nombre","dataType":"string"},
                categoria: {"in":"query","name":"categoria","dataType":"string"},
                estado: {"in":"query","name":"estado","dataType":"string"},
                fechaAdquisicionDesde: {"in":"query","name":"fechaAdquisicionDesde","dataType":"string"},
                fechaAdquisicionHasta: {"in":"query","name":"fechaAdquisicionHasta","dataType":"string"},
                fechaVencimientoDesde: {"in":"query","name":"fechaVencimientoDesde","dataType":"string"},
                fechaVencimientoHasta: {"in":"query","name":"fechaVencimientoHasta","dataType":"string"},
                usuarioId: {"in":"query","name":"usuarioId","dataType":"double"},
        };
        app.get('/Productos',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.getAll)),

            async function ProductosController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_getAll, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'getAll',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductosController_obtenerCategorias: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Productos/categorias',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.obtenerCategorias)),

            async function ProductosController_obtenerCategorias(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_obtenerCategorias, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'obtenerCategorias',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductosController_getByCategoria: Record<string, TsoaRoute.ParameterSchema> = {
                categoria: {"in":"query","name":"categoria","required":true,"dataType":"string"},
        };
        app.get('/Productos/por-categoria',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.getByCategoria)),

            async function ProductosController_getByCategoria(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_getByCategoria, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'getByCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductosController_getCantidadPorCategoria: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Productos/cantidad-por-categoria',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.getCantidadPorCategoria)),

            async function ProductosController_getCantidadPorCategoria(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_getCantidadPorCategoria, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'getCantidadPorCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductosController_getCantidadPorRangoPrecio: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/Productos/cantidad-por-rango-precio',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.getCantidadPorRangoPrecio)),

            async function ProductosController_getCantidadPorRangoPrecio(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_getCantidadPorRangoPrecio, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'getCantidadPorRangoPrecio',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductosController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/Productos/:id',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.getById)),

            async function ProductosController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_getById, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductosController_create: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ProductosDTO"},
        };
        app.post('/Productos',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.create)),

            async function ProductosController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_create, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductosController_updateProducto: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"Partial_ProductosDTO_"},
        };
        app.put('/Productos/:id',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.updateProducto)),

            async function ProductosController_updateProducto(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_updateProducto, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'updateProducto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProductosController_deleteProducto: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/Productos/:id',
            ...(fetchMiddlewares<RequestHandler>(ProductosController)),
            ...(fetchMiddlewares<RequestHandler>(ProductosController.prototype.deleteProducto)),

            async function ProductosController_deleteProducto(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductosController_deleteProducto, request, response });

                const controller = new ProductosController();

              await templateService.apiHandler({
                methodName: 'deleteProducto',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
