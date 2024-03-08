import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import e from "express";

describe('Pessoas - Delete',  () => {
  let accessToken = '';

  beforeAll(async () => {
      const email = 'create-cidades@gmail.com'
      await testServer.post('/cadastrar').send({ nome: 'teste', email, password: '123456' })
      const SignInRes = await testServer.post('/entrar').send({ email, password: '123456' })
      accessToken = SignInRes.body.accessToken
  })

  let cidadeId: number | undefined = undefined
  beforeAll(async () => {

    const resCity = await testServer
    .post('/cidades')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({nome: 'Caxias do Sul'});
    
    cidadeId = resCity.body;
  })

  it('Tenta deletar uma pessoa', async () => {

    const res1 = await testServer
        .post('/pessoas')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({nome: "Richard", sobrenome: "Mota", email: "richard@gmail.com", cidadeId})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)

    const resDelete = await testServer
        .delete(`/pessoas/${res1.body}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send()

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Tenta deletar uma pessoa QUE NÃO EXISTE', async () => {

    const resDelete = await testServer
        .delete('/pessoas/99999')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send()

    expect(resDelete.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(resDelete.body).toHaveProperty('errors.default')
  })

})