import type { Request, Response } from "express";
import User from "../models/user.model.ts";

export const getUserProfile = async (req: Request, res: Response) => {
  const { numero_documento } = req.params;
  try {
    const user = await User.findOne({
      where: {
        numero_documento,
      },
      attributes: ["nombre", "apellidos", "correo"],
    });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (err : unknown) {
    console.log(err);
    res.status(500).json({ msg: "Error con los datos del perfil." });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { numero_documento } = req.params;
  const { nombres, apellidos, correo, newPassword } = req.body;
  try {
    const user = await User.update(
      {nombres, apellidos, correo, clave: newPassword,},
      { where: { numero_documento } }
    );
    if (!user){
      return res.status(404).json({msg: "Usuario no encontrado"})
    }
    res.status(200).json({msg: "Perfil actualizado"})
  } catch (err: unknown) {
    console.log(err);
    res.status(500).json({ msg: "Error al actualizar los datos." });
  }
};
