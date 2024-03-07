import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";



describe('Pessoas - Create', () => {

  let cidadeId: number | undefined = undefined
  beforeAll(async () => {

    const resCity = await testServer
    .post('/cidades')
    .send({nome: 'Caxias do Sul'});
    
    cidadeId = resCity.body;
  })
  
  it('Criar UMA pessoa', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({nome: "Richard", sobrenome: "Mota", email: "richard@gmail.com", cidadeId})


    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
  } )
  it('Criar OUTRA pessoa', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({nome: "Richard2", sobrenome: "Mota2", email: "richard2@gmail.com", cidadeId})


    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
  } )
  it('Tenta criar registro com email DUPLICADO', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({nome: "Richard2", sobrenome: "Mota2", email: "richardmota@gmail.com", cidadeId})


    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')

    const res2 = await testServer
    .post('/cidades')
    .send({nome: "Duplicado", sobrenome: "Duplicado2", email: "richard2@gmail.com", cidadeId})

    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res2.body).toHaveProperty('errors.default')
  } )
  it('Tenta criar uma pessoa COM nome e sobrenome curto', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({nome: "Ri", sobrenome: "M", email: "richard@gmail.com", cidadeId})


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.body).toHaveProperty('errors.body.sobrenome')
  } )
  it('Tenta criar uma pessoa SEM nome e sobrenome', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({email: "richard@gmail.com", cidadeId})


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.body).toHaveProperty('errors.body.sobrenome')
  } )
  it('Tenta criar uma pessoa com email INVALIDO', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({nome: "Richard", sobrenome: "Mota", email: "richardgail.com", cidadeId})

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.email')
  })
  it('Tenta criar uma pessoa sem enviar nenhuma propiedade', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send()


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.body).toHaveProperty('errors.body.sobrenome')
    expect(res1.body).toHaveProperty('errors.body.email')
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
  } )
  it('Tenta criar uma pessoa com campo cidadeId INVALIDO', async () => {

    const res1 = await testServer
    .post('/pessoas')
    .send({nome: "Richard", sobrenome: "Mota", email: "richard@gmail.com", cidadeId: 'a'})


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
  } )

})