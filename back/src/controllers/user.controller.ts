import type { Request, Response } from "express";
import User from "../models/user.model.ts";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findAll();
    res.json(user);

    
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json(err.message);
    }
  }
};
