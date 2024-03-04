import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup'


describe('Cidades - Create', () => {



  it('Cria registro', async () => {

    const res1 = await testServer
    .post('/cidades')
    .send({nome: 'Caxias do Sul'});


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });
  
  it('testa se a verificação de nome curto está funcionando', async () => {

    const res1 = await testServer
    .post('/cidades')
    .send({nome: 'Ca'});


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');

  });


});


