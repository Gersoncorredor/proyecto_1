import type { Request, Response } from "express";
import User from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";
dotenv.config();

const MAX_LOGIN_ATTEMPTS: number = 5;
const BLOCK_TIME_MINUTES: number = 15;

// INICIAR  DE SESION
export const Login = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({
      msg: "Email y contraseña son requeridos.",
      success: false,
    });
  }
  try {
    const user = await User.findOne({ where: { correo } });

    if (!user) {
      return res
        .status(401)
        .json({ msg: "Usuario o contraseña incorrectos.", success: false });
    }

    if (user.id_estado_usuario !== 1) {
      return res.status(401).json({
        msg: "Usuarios inactivo.",
        success: false,
      });
    }

    // VERIFICA QUE NO ESTE BLOQUEADO
    if (
      Number(user.id_estado_usuario) === 3 &&
      new Date(user.bloqueado_hasta!) > new Date()
    ) {
      const timeRemaining = Math.ceil(
        new Date(user.bloqueado_hasta!).getTime() - new Date().getTime() / (1000 * 60)
      );
      return res.status(401).json({
        msg: `cuenta bloqueada, intentalo mas tarde: ${timeRemaining} minutos`,
        success: false,
        timeRemaining,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.clave);
    // SI LA CONTRASEÑA ES INCORRECTA, SUMA EL CONTADOR DE INTETOS FALLIDOS.
    if (!isPasswordValid) {
      const intentos = (user.intentos_fallidos ?? 0) + 1;
      if (intentos >= MAX_LOGIN_ATTEMPTS) {
        const timeblock = new Date(Date.now() + BLOCK_TIME_MINUTES * 60 * 1000); // 10 minutos

        await User.update(
          {
            id_estado_usuario: 3,
            bloqueado_hasta: timeblock,
            intentos_fallidos: 0,
          },
          { where: { correo } }
        );
        return res.status(401).json({
          msg: `Cuenta bloqueada por ${BLOCK_TIME_MINUTES} minutos debido a múltiples intentos fallidos`,
        });
      } else {
        await User.update(
          { intentos_fallidos: intentos },
          { where: { correo } }
        );
        return res
          .status(401)
          .json({ msg: "Usuario o contraseña incorrectos.", success: false });
      }
    }

    // SI LA CONTRASEÑA ES CORRECTA
    const token = jwt.sign(
      { numero_documento: user.numero_documento, correo: user.correo, id_rol: user.id_rol, nombres: user.nombres, apellidos: user.apellidos },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" }
    );

    res.cookie("dlytime_token", token,{
      httpOnly: true,
      secure:true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 
    })

    await User.update(
      { id_estado_usuario: 1, bloqueado_hasta: null, intentos_fallidos: 0 },
      { where: { correo } }
    );

    return res
      .status(200)
      .json({ msg: "Inicio de sesión exitoso", success: true, token, user });
  } catch (err) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// REGISTRAR UN USARIO NUEVO
export const register = async (req: Request, res: Response) => {
  const {
    numero_documento,
    id_tipo_identificacion,
    nombres,
    apellidos,
    id_genero,
    correo,
    clave,
  } = req.body;
  try {
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ correo }, { numero_documento }] },
    });

    if (existingUser) {
       const field = existingUser.correo === correo ? "email" : "número de documento";
      return res.status(400).json({ 
        msg: `Ya existe un usuario con este ${field}`,
        success: false 
      });
    }
    const hashedPassword = await bcrypt.hash(clave, 12);
    await User.create({
      numero_documento,
      id_tipo_identificacion,
      nombres,
      apellidos,
      id_genero,
      correo,
      clave: hashedPassword,
    });
    res.status(200).json({ msg: "Usuario registrado con exito" });
  } catch (err: unknown) {
    if(err instanceof Error){
      console.log(err.message);
    }
    res.status(500).json({ msg: "Error al registrar el usuario" });
  }
};
