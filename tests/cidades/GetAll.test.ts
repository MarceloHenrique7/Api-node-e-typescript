import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';




describe('Cidades - GetAll', () => {

  let accessToken = '';

  beforeAll(async () => {
      const email = 'create-cidades@gmail.com'
      await testServer.post('/cadastrar').send({ nome: 'teste', email, password: '123456' })
      const SignInRes = await testServer.post('/entrar').send({ email, password: '123456' })
      accessToken = SignInRes.body.accessToken
  })

  it('Obter todas cidades', async () => {

      const res1 = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({nome: 'Caxias do Sul'});

      expect(res1.statusCode).toEqual(StatusCodes.CREATED);
      
      const resBuscada = await testServer
      .get('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

      expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
      expect(resBuscada.statusCode).toEqual(StatusCodes.OK)
      expect(resBuscada.body.length).toBeGreaterThan(0);

  
  });
  
});