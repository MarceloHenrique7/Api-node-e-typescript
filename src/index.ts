import { server } from './server/Server';
import { Knex } from './server/database/knex';


const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {console.log(`App Rodando! Em : ${process.env.PORT || 3333}`)})
}


if (process.env.IS_LOCALHOST  != 'true') { // configuração para rodar as seeds e as migrations, quando o server estiver em produção
  Knex.migrate
  .latest()
  .then(() => {
    Knex.seed.run()
    .then(() => startServer())
    .catch(console.log)
  })
  .catch(console.log)
} else {
    startServer(); // caso a variavel de ambiente "IS_LOCALHOST" esteja definida como 'true' ele roda o server sem precisar rodar as migrations e as seeds
}
