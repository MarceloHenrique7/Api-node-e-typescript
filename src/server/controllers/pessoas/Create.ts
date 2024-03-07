import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../shared/middlewares";



interface IBodyProps extends Omit<IPessoa, 'id'> {  }

export const createValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    sobrenome: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
  })),
}))


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
  const result = await PessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  } 

  return res.status(StatusCodes.CREATED).json(result);
}

