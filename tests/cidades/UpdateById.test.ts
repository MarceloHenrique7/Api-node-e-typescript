import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes"; 



describe('Cidades - UpdateById', () => {

  it('Atualiza Registro', async () => {
    const res1 = await testServer
    .post('/cidades')
    .send({nome: "Caxias do Sul"})

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)


    const resAtualiza = await testServer
    .put(`/cidades/${res1.body}`)
    .send({nome: "Caxias"})


    expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })


  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer
    .put('/cidades/99999')
    .send({nome: "Caxias"});


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

  })


})