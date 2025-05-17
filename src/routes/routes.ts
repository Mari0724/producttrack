/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserDTO": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "correo": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "nombreCompleto": {"dataType":"string","required":true},
            "telefono": {"dataType":"string","required":true},
            "direccion": {"dataType":"string","required":true},
            "fotoPerfil": {"dataType":"string","required":true},
            "tipoUsuario": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["INDIVIDUAL"]},{"dataType":"enum","enums":["EMPRESARIAL"]}],"required":true},
            "nombreEmpresa": {"dataType":"string"},
            "nit": {"dataType":"string"},
            "rol": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["USUARIO"]},{"dataType":"enum","enums":["EQUIPO"]},{"dataType":"enum","enums":["ADMIN"]},{"dataType":"enum","enums":["DESARROLLADOR"]}],"required":true},
            "rolEquipo": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]},{"dataType":"enum","enums":["ADMIN"]}]},
            "estado": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["activo"]},{"dataType":"enum","enums":["inactivo"]}]},
        },
        "additionalProperties": false,
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
                rolEquipo: {"in":"query","name":"rolEquipo","dataType":"union","subSchemas":[{"dataType":"enum","enums":["LECTOR"]},{"dataType":"enum","enums":["COMENTARISTA"]},{"dataType":"enum","enums":["EDITOR"]},{"dataType":"enum","enums":["ADMIN"]}]},
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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
