import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import User from "../models/user.model.ts";
dotenv.config();
import type { JwtPayload } from "../types/jwtPayload.ts";


const JWT_COOKIE_NAME = "dlytime_token";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[JWT_COOKIE_NAME];

    if (!token)
      return res.status(401).json({
        msg: "Acceso denegado. No hay token de autenticación.",
        success: false,
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findOne({
      where: {
        numero_documento: decoded.numero_documento,
        id_estado_usuario: 1,
      },
    });

    if (!user) {
      res.clearCookie(JWT_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return res.status(401).json({
        msg: "Sesion invalida o usuario inactivo",
        success: false,
      });
    }

    req.user = {
      numero_documento: user.numero_documento,
      correo: user.correo,
      id_rol: user.id_rol,
      nombres: user.nombres,
      apellidos: user.apellidos,
    };
    next();
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : "Error desconocido");
    res.clearCookie(JWT_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return res.status(401).json({
      msg: "Token inválido o expirado.",
      success: false,
    });
  }
};

export const authorizeRoles = (...allwedRoles: Number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        msg: "Usuario no autenticado.",
        success: false,
      });
    }
    if (!allwedRoles.includes(req.user.id_rol)) {
      return res.status(403).json({
        msg: "No tienes permiso para acceder a estos recursos.",
        success: false,
      });
    }
    next();
  };
};

export const requireAdmin = authorizeRoles(1); // 1 ES EL ROL DE ADMIN;
export const requireOftal = authorizeRoles(1, 2); // 2 ES EL ROL DE OFTALMOLOGIA;
export const requireUser = authorizeRoles(1, 3); // 3 ES EL ROL DE USUARIO;
export const requireTodos =  authorizeRoles(1, 2, 3);

export const requireOwnershipOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ msg: "Usuario no autenticado.", success: false });
  }
  const requestedUserId = parseInt(
    req.params.numero_documento ||
      req.body.numero_documento ||
      (req.query.numero_documento as string)
  );
  if (isNaN(requestedUserId)) {
    return res.status(400).json({
      msg: "ID de usuario inválido",
      success: false,
    });
  }
  if (req.user.id_rol === 1 || req.user.numero_documento === requestedUserId) {
    next();
  } else {
    return res.status(403).json({
      msg: "Solo puedes acceder a tu propia informacion",
      success: false,
    });
  }
};
