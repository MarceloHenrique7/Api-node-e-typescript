import e, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { validation } from "../../shared/middlewares";
import { JWTService, PasswordCrypto } from "../../shared/services";


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome' > {
  email: string;
  password: string;
}


export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().min(6),
    password: yup.string().required().min(5)}))
}))



export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
  const {email, password} = req.body


  const usuario = await UsuariosProvider.getByEmail(email);

  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    })
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(password, usuario.password)

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    })
  } else {

    const token = await JWTService.sign({ uid: usuario.id })
  
    if (token === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Não foi possivel criar o token'
        }
      })
    }
    
    res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24})
    return res.status(StatusCodes.CREATED).json(token)
  }
}
