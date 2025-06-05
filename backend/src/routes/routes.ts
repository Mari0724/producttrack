/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductosController } from './../controllers/Productos.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NotificacionesController } from './../controllers/Notificaciones.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/log.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EquipoController } from './../controllers/equipo.controller';
import { expressAuthentication } from './../utils/jwt';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ResponseMessageWithToken": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "detalles": {"dataType":"any"},
            "token": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserDTO": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "correo": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "nombreCompleto": {"dataType":"string","required":true},
            "telefono": {"dataType":"string","required":true},
            "direccion": {"dataType":"string","required":true},
            "fotoPerfil": {"dataType":"string"},
            "tipoUsuario": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["INDIVIDUAL"]},{"dataType":"enum","enums":["EMPRESARIAL"]}]},
            "nombreEmpresa": {"dataType":"string"},
            "nit": {"dataType":"string"},
            "rol": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["USUARIO"]},{"dataType":"enum","enums":["EQUIPO"]},{"dataType":"enum","enums":["ADMIN"]},{"dataType":"enum","enums":["DESARROLLADOR"]}],"required":true},
            "rolEquipo": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]}]},
            "estado": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["activo"]},{"dataType":"enum","enums":["inactivo"]}]},
            "empresaId": {"dataType":"double"},
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
    "Partial_UserDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"username":{"dataType":"string"},"correo":{"dataType":"string"},"password":{"dataType":"string"},"nombreCompleto":{"dataType":"string"},"telefono":{"dataType":"string"},"direccion":{"dataType":"string"},"fotoPerfil":{"dataType":"string"},"tipoUsuario":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["INDIVIDUAL"]},{"dataType":"enum","enums":["EMPRESARIAL"]}]},"nombreEmpresa":{"dataType":"string"},"nit":{"dataType":"string"},"rol":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["USUARIO"]},{"dataType":"enum","enums":["EQUIPO"]},{"dataType":"enum","enums":["ADMIN"]},{"dataType":"enum","enums":["DESARROLLADOR"]}]},"rolEquipo":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]}]},"estado":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["activo"]},{"dataType":"enum","enums":["inactivo"]}]},"empresaId":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    "LoginResponse": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true},
            "username": {"dataType":"string","required":true},
            "rol": {"dataType":"string","required":true},
            "tipoUsuario": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "rolEquipo": {"dataType":"string"},
            "requiereCompletarPerfil": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginRequest": {
        "dataType": "refObject",
        "properties": {
            "correo": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "_36_Enums.TipoUsuario": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["INDIVIDUAL"]},{"dataType":"enum","enums":["EMPRESARIAL"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "_36_Enums.rolEquipo": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EquipoDTO": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "correo": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "nombreCompleto": {"dataType":"string","required":true},
            "telefono": {"dataType":"string","required":true},
            "direccion": {"dataType":"string","required":true},
            "fotoPerfil": {"dataType":"string"},
            "rolEquipo": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]}],"required":true},
            "estado": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["activo"]},{"dataType":"enum","enums":["inactivo"]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_EquipoDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"username":{"dataType":"string"},"correo":{"dataType":"string"},"password":{"dataType":"string"},"nombreCompleto":{"dataType":"string"},"telefono":{"dataType":"string"},"direccion":{"dataType":"string"},"fotoPerfil":{"dataType":"string"},"rolEquipo":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]}]},"estado":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["activo"]},{"dataType":"enum","enums":["inactivo"]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_getAll: Record<string, TsoaRoute.ParameterSchema> = {
                username: {"in":"query","name":"username","dataType":"string"},
                correo: {"in":"query","name":"correo","dataType":"string"},
                nombreCompleto: {"in":"query","name":"nombreCompleto","dataType":"string"},
                telefono: {"in":"query","name":"telefono","dataType":"string"},
                nit: {"in":"query","name":"nit","dataType":"string"},
                estado: {"in":"query","name":"estado","dataType":"string"},
                rol: {"in":"query","name":"rol","dataType":"string"},
                tipoUsuario: {"in":"query","name":"tipoUsuario","dataType":"union","subSchemas":[{"dataType":"enum","enums":["INDIVIDUAL"]},{"dataType":"enum","enums":["EMPRESARIAL"]}]},
                rolEquipo: {"in":"query","name":"rolEquipo","dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]}]},
        };
        app.get('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getAll)),

            async function UserController_getAll(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getAll, request, response });

                const controller = new UserController();

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
        const argsUserController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/usuarios/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getById)),

            async function UserController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getById, request, response });

                const controller = new UserController();

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
        const argsUserController_create: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserDTO"},
        };
        app.post('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.create)),

            async function UserController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_create, request, response });

                const controller = new UserController();

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
        const argsUserController_updateUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"Partial_UserDTO_"},
        };
        app.put('/usuarios/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUsuario)),

            async function UserController_updateUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUsuario, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_deleteUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/usuarios/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUsuario)),

            async function UserController_deleteUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUsuario, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
            authenticateMiddleware([{"jwt":[]}]),
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
            authenticateMiddleware([{"jwt":[]}]),
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
            authenticateMiddleware([{"jwt":[]}]),
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
        const argsNotificacionesController_enviarNotificacionStockBajo: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.post('/notificaciones/stock-bajo',
            ...(fetchMiddlewares<RequestHandler>(NotificacionesController)),
            ...(fetchMiddlewares<RequestHandler>(NotificacionesController.prototype.enviarNotificacionStockBajo)),

            async function NotificacionesController_enviarNotificacionStockBajo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNotificacionesController_enviarNotificacionStockBajo, request, response });

                const controller = new NotificacionesController();

              await templateService.apiHandler({
                methodName: 'enviarNotificacionStockBajo',
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
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"LoginRequest"},
        };
        app.post('/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
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
        const argsEquipoController_crearEquipo: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"EquipoDTO"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/equipo',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipoController)),
            ...(fetchMiddlewares<RequestHandler>(EquipoController.prototype.crearEquipo)),

            async function EquipoController_crearEquipo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipoController_crearEquipo, request, response });

                const controller = new EquipoController();

              await templateService.apiHandler({
                methodName: 'crearEquipo',
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
        const argsEquipoController_obtenerTodosLosEquipos: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/equipo',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipoController)),
            ...(fetchMiddlewares<RequestHandler>(EquipoController.prototype.obtenerTodosLosEquipos)),

            async function EquipoController_obtenerTodosLosEquipos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipoController_obtenerTodosLosEquipos, request, response });

                const controller = new EquipoController();

              await templateService.apiHandler({
                methodName: 'obtenerTodosLosEquipos',
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
        const argsEquipoController_filtrarEquipos: Record<string, TsoaRoute.ParameterSchema> = {
                nombreCompleto: {"in":"query","name":"nombreCompleto","dataType":"string"},
                correo: {"in":"query","name":"correo","dataType":"string"},
                rolEquipo: {"in":"query","name":"rolEquipo","dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]}]},
                req: {"in":"request","name":"req","dataType":"object"},
        };
        app.get('/equipo/filtrar',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipoController)),
            ...(fetchMiddlewares<RequestHandler>(EquipoController.prototype.filtrarEquipos)),

            async function EquipoController_filtrarEquipos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipoController_filtrarEquipos, request, response });

                const controller = new EquipoController();

              await templateService.apiHandler({
                methodName: 'filtrarEquipos',
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
        const argsEquipoController_obtenerEquipoPorId: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/equipo/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipoController)),
            ...(fetchMiddlewares<RequestHandler>(EquipoController.prototype.obtenerEquipoPorId)),

            async function EquipoController_obtenerEquipoPorId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipoController_obtenerEquipoPorId, request, response });

                const controller = new EquipoController();

              await templateService.apiHandler({
                methodName: 'obtenerEquipoPorId',
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
        const argsEquipoController_actualizarEquipo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                data: {"in":"body","name":"data","required":true,"ref":"Partial_EquipoDTO_"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/equipo/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipoController)),
            ...(fetchMiddlewares<RequestHandler>(EquipoController.prototype.actualizarEquipo)),

            async function EquipoController_actualizarEquipo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipoController_actualizarEquipo, request, response });

                const controller = new EquipoController();

              await templateService.apiHandler({
                methodName: 'actualizarEquipo',
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
        const argsEquipoController_eliminarEquipo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/equipo/:id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(EquipoController)),
            ...(fetchMiddlewares<RequestHandler>(EquipoController.prototype.eliminarEquipo)),

            async function EquipoController_eliminarEquipo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEquipoController_eliminarEquipo, request, response });

                const controller = new EquipoController();

              await templateService.apiHandler({
                methodName: 'eliminarEquipo',
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

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
