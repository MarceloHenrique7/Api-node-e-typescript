import {knex} from 'knex';
import 'dotenv/config'
import pg from 'pg'

if (process.env.NODE_ENV === 'production') {
  pg.types.setTypeParser(20, 'text', parseInt); // convertendo os dados de numero ex: id("12") para id(12), etc.. do postgress para inteiro 
}

import { development, production, test } from './Environment';

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'production': return production;
    case 'test': return test;

    default: return development;
  }
};

export const Knex = knex(getEnvironment());