import supertest from "supertest";

import { server } from "../src/server/Server"
import { Knex } from "../src/server/database/knex";


beforeAll(async () => { // isso significa que antes dele executar a aplicação ele faça as migrations e as seeds antes
    await Knex.migrate.latest();
    await Knex.seed.run();
});



afterAll(async () => {
  await Knex.destroy();
})


export const testServer = supertest(server)