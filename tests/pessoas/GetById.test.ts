import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";


describe('Pessoas - GetById', () => {

  let accessToken = '';

  beforeAll(async () => {
      const email = 'create-cidades@gmail.com'
      await testServer
      .post('/cadastrar')
      .send({ nome: 'teste', email, password: '123456' })
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

  it('Tentar buscar pessoa por id', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({nome: "Richard", sobrenome: "Mota", email: "richard@gmail.com", cidadeId})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')

    const resGetById = await testServer
    .get(`/pessoas/${res1.body}`)
    .set({ Authorization: `Bearer ${accessToken}` })
    .send()

    expect(resGetById.statusCode).toEqual(StatusCodes.OK)
    expect(resGetById.body).toHaveProperty('nome');

  })


  it('Tentar buscar pessoa por id que não existe', async () => {
    const res1 = await testServer
    .get('/pessoas/99999')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

  })


})