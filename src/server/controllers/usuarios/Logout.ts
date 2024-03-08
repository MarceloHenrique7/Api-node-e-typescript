import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '')
  return res.status(StatusCodes.OK).json({logout: "success"})

}

