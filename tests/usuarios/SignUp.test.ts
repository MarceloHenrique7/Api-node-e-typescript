import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('SignUp - Usuários', () => {

  it('Tenta cadastrar um usuário', async () => {
     
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      nome: "JulioTeste",
      email: "Julioteste@gmail.com",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.statusCode).toEqual('number')
  })
  it('Tenta cadastrar um usuário com email DUPLICADO', async () => {
     
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      nome: "JulioTeste",
      email: "Julioduplicado@gmail.com",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.statusCode).toEqual('number')

    const resDuplicado = await testServer
    .post('/cadastrar')
    .send({
      nome: "JulioTestando",
      email: "Julioduplicado@gmail.com",
      password: "Julio123"
    })

    expect(resDuplicado.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(resDuplicado.body).toHaveProperty('errors.default')
  })
  it('Tenta cadastrar um usuário SEM email', async () => {
     
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      nome: "JulioTeste",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })
  it('Tenta cadastrar um usuário SEM nome', async () => {
     
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      email: "Julioteste@gmail.com",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
  })
  it('Tenta cadastrar um usuário com EMAIL INVALIDO', async () => {
    
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      nome: "JulioTeste",
      email: "Julioteste   gmail.com",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })
  it('Tenta cadastrar um usuário com NOME curto', async () => {
     
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      nome: "Ju",
      email: "Julioteste@gmail.com",
      password: "Julioteste123"
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
  })
  it('Tenta cadastrar um usuário com PASSWORD curta', async () => {
    
    const res1 = await testServer
    .post('/cadastrar')
    .send({
      nome: "JulioTeste",
      email: "Julioteste@gmail.com",
      password: "J"
    })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.password')
  })

})