import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";




describe('Pessoas - GetAll', () => {
  let cidadeId: number | undefined = undefined
  beforeAll(async () => {

    const resCity = await testServer
    .post('/cidades')
    .send({nome: 'Caxias do Sul'});
    
    cidadeId = resCity.body;
  })

  it('Tentar buscar todas pessoas', async () => {


    const res1 = await testServer
    .post('/pessoas')
    .send({nome: "Richard", sobrenome: "Mota", email: "richard@gmail.com", cidadeId})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')

    const resGet = await testServer.get('/pessoas').send()
    
    expect(Number(resGet.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK)
    expect(resGet.body.length).toBeGreaterThan(0);


  })


})