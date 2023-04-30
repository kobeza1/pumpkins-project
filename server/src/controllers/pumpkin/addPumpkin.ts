import { Request, Response } from "express";
import { PumpkinModel } from "../../models/pumpkin.js";

export const addPumpkin = async (req: Request, res: Response) => {
    const result = await PumpkinModel.create(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      message: `pumpkin added`,
      data: { result },
    });
  
}