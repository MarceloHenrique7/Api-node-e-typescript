import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {

  const token = req.cookies.jwt

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Não autenticado'
      }
    })
  }

  const isValidToken = await JWTService.verify(token)
  if( isValidToken === "JWT_SECRET_NOT_FOUND") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro ao criar token de autenticação'
      }
    })
}
  
  if( isValidToken === "INVALID_TOKEN") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Token invalido'
      }
    })
  }

  return next();
}