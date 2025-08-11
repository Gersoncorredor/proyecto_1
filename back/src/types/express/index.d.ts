import { JwtPayload } from '../jwtPayload.ts';

declare global {
    namespace Express {
        interface Request{
            user?: {
                numero_documento:number,
                correo:string,
                id_rol: number,
                nombres:string,
                apellidos:string,
            }
        }
    }
}