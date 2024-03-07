import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe('Pessoas - Update', () => {

  let cidadeId: number | undefined = undefined
  beforeAll(async () => {

    const resCity = await testServer
    .post('/cidades')
    .send({nome: 'Caxias do Sul'});
    
    cidadeId = resCity.body;
  })

  it('Tenta atualizar uma pessoa', async () => {
    const resCreate = await testServer
    .post('/pessoas')
    .send({nome: "Richard", sobrenome: "Mota", email: "richard@gmail.com", cidadeId})

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED)


    const resUpdate = await testServer
    .put(`/pessoas/${resCreate.body}`)
    .send({nome: "Maria", sobrenome: "Jycei", email: "Maria@gmail.com", cidadeId})


    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })

  it('Tenta atualizar uma pessoa que não existe', async () => {

    const resUpdate = await testServer
    .put('/pessoas/99999')
    .send({nome: "Maria", sobrenome: "Jycei", email: "Maria@gmail.com", cidadeId: 99999})


    expect(resUpdate.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)


  })

})  