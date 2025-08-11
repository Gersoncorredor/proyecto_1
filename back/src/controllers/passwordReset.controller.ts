import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import User from "../models/user.model.ts";

export const validarCodigo = async (req: Request, res: Response) => {
  const { correo, codigo_reset } = req.body;
  try {
    const user = await User.findOne({
      where: { correo, codigo_reset },
      attributes: {
        exclude: ["correo", "clave", "codigo_reset", "expira_reset"],
      },
    });

    if (!user)
      return res.status(404).json({ msg: "Codigo invalido.", success: false });

    const now = new Date();
    if (now > new Date(user.expira_reset!)) {
      await User.update(
        { codigo_reset: null, expira_reset: null },
        { where: { correo } }
      );
      return res
        .status(401)
        .json({
          msg: "El código ha expirado. Solicite uno nuevo",
          success: false,
        });
    }

    const isValidCode = await bcrypt.compare(codigo_reset, user.codigo_reset!);

    if (!isValidCode) {
      return res.status(400).json({
        msg: "Código inválido",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Código válido",
      success: true,
      valid: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error al validar el codigo." });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { correo, clave, codigo_reset } = req.body;
  try {
  } catch (err: unknown) {
    console.log(err);
    res.status(500).json({ msg: "Error al cambiar la contraseña" });
  }
  const user = await User.update(
    {
      clave: bcrypt.hashSync(clave, 12),
      codigo_reset: null,
      expira_reset: null,
    },
    { where: { correo, codigo_reset } }
  );

  if (!user) {
    return res.status(404).json({ msg: "Usuario no encontrado." });
  }
};
