import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes"; 



describe('Cidades - UpdateById', () => {
  let accessToken = '';

  beforeAll(async () => {
      const email = 'create-cidades@gmail.com'
      await testServer.post('/cadastrar').send({ nome: 'teste', email, password: '123456' })
      const SignInRes = await testServer.post('/entrar').send({ email, password: '123456' })
      accessToken = SignInRes.body.accessToken
  })

  it('Atualiza Registro', async () => {
    const res1 = await testServer
    .post('/cidades')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({nome: "Caxias do Sul"})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)


    const resAtualiza = await testServer
    .put(`/cidades/${res1.body}`)
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({nome: "Caxias"})


    expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })


  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer
    .put('/cidades/99999')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({nome: "Caxias"});


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

  })


})