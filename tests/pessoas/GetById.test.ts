import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";


describe('Pessoas - GetById', () => {

  let cidadeId: number | undefined = undefined
  beforeAll(async () => {

    const resCity = await testServer
    .post('/cidades')
    .send({nome: 'Caxias do Sul'});
    
    cidadeId = resCity.body;
  })

  it('Tentar buscar pessoa por id', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({nome: "Richard", sobrenome: "Mota", email: "richard@gmail.com", cidadeId})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')

    const resGetById = await testServer.get(`/pessoas/${res1.body}`).send()

    expect(resGetById.statusCode).toEqual(StatusCodes.OK)
    expect(resGetById.body).toHaveProperty('nome');

  })


  it('Tentar buscar pessoa por id que não existe', async () => {
    const res1 = await testServer.get('/pessoas/99999').send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

  })


})