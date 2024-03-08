import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Cidades - DeleteById', () => {
  
  let accessToken = '';

  beforeAll(async () => {
      const email = 'create-cidades@gmail.com'
      await testServer.post('/cadastrar').send({ nome: 'teste', email, password: '123456' })
      const SignInRes = await testServer.post('/entrar').send({ email, password: '123456' })
      accessToken = SignInRes.body.accessToken
  })

  it('apaga Registro', async () => {
    const res1 = await testServer
    .post('/cidades')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({ nome: "Caxias do Sul" });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED)


    const resApagada = await testServer
    .delete(`/cidades/${res1.body}`)
    .set({ Authorization: `Bearer ${accessToken}` })
    .send();

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Apaga Registro que não existe', async () => {
    const res1 = await testServer
    .delete('/cidades/99999')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  });

})