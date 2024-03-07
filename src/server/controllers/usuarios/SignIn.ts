import e, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { validation } from "../../shared/middlewares";


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


  const result = await UsuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    })
  }

  if (result.password !== password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    })
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: "teste.teste.teste"})
  }
}
