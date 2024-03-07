import { Request, Response } from "express";
import * as yup from 'yup';
import { IPessoa } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { PessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../shared/middlewares";



interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'> {  }


export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    sobrenome: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
  })),

  params: get<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}))




export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  if(!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O "id" precisa ser passado'
      }
    })
  }

  const result = await PessoasProvider.updateById(Number(req.params.id), req.body)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  res.status(StatusCodes.NO_CONTENT).json(result)

}