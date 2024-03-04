import { Knex } from 'knex';
import path from 'path';


// configuração de desenvolvimento pro knex e sqlite
export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds')
  },

  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};

// configuração de test pro knex e sqlite
export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
};

// configuração de produção pro knex e sqlite

export const production: Knex.Config = {
  ...development,
};