import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";




describe('SignIn - Usuários', () => {
  beforeAll(async () => {
    await testServer
    .post('/cadastrar')
    .send({
      nome: "JulioTeste",
      email: "Julioteste@gmail.com",
      password: "Julioteste123"
    })
  })

  it('Faz Login', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      email: "Julioteste@gmail.com",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.OK)
    expect(res1.body).toHaveProperty('accessToken')
  })

  it('Senha Errada', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      email: "Julioteste@gmail.com",
      password: "Juliosenhaerrada"
    })

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
  })

  it('Email Errado', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      email: "Juliotesteerrado@gmail.com",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
  })

  it('Email invalido', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      email: "Julioteste     gmail.com",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
  })

  it('Senha muito curta', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      email: "Julioteste@gmail.com",
      password: "Ju"
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.password')
  })

  it('Senha não foi passado', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      email: "Julioteste@gmail.com",
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.password')
  })

  it('Email não foi passado', async () => {
    const res1 = await testServer
    .post('/entrar')
    .send({
      password: "Julia"

    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })


})