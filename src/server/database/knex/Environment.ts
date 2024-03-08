import { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()

let {DATABASE_URL, DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, ENDPOINT_ID, DATABASE_PORT} = process.env


// configuração de desenvolvimento pro knex e sqlite
export const development: Knex.Config = {
  client: 'pg',

  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds')
  },


  connection: {
    host: 'ep-summer-dream-a590vpw7.us-east-2.aws.neon.tech',
    port: 5432,
    user: 'yanzinbugt',
    database: 'api-node-typescript',
    password: 'XWVZDORT0b6Q',
    ssl: { rejectUnauthorized: false },
  }
};

// configuração de test pro knex e sqlite
export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
};



// configuração de produção pro knex e sqlite

export const production: Knex.Config = {
  ...development
}