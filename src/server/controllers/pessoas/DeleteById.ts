import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { PessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../shared/middlewares";



interface IParamsProps {
  id?: number;
}

export const deleteByIdValidation = validation(get => ({
  params: get<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}))




export const deleteById = async (req: Request, res: Response) => {
  if(!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O "id" precisa ser passado'
      }
    })
  }

  const result = await PessoasProvider.deleteById(Number(req.params.id))

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  res.status(StatusCodes.NO_CONTENT).json(result)

}