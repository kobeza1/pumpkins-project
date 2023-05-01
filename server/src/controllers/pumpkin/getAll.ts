import { Request, Response } from "express";
import { PumpkinModel } from "../../models/pumpkin.js";

export const getAll = async (req: Request, res: Response) => {
        const pumpkins = await PumpkinModel.find();
        res.status(200).json({
          status: "success",
          code: 200,
          message: "all pumpkins fetched",
          data: { result: pumpkins },
        });
  
}