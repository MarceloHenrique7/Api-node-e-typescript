import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import e from "express";

describe('Pessoas - Delete',  () => {

  let cidadeId: number | undefined = undefined
  beforeAll(async () => {

    const resCity = await testServer
    .post('/cidades')
    .send({nome: 'Caxias do Sul'});
    
    cidadeId = resCity.body;
  })

  it('Tenta deletar uma pessoa', async () => {

    const res1 = await testServer
        .post('/pessoas')
        .send({nome: "Richard", sobrenome: "Mota", email: "richard@gmail.com", cidadeId})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resDelete = await testServer
        .delete(`/pessoas/${res1.body}`)
        .send()

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Tenta deletar uma pessoa QUE NÃO EXISTE', async () => {

    const resDelete = await testServer
        .delete('/pessoas/99999')
        .send()

    expect(resDelete.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(resDelete.body).toHaveProperty('errors.default')
  })

})