import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.pessoa, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome').index().notNullable();
    table.string('sobrenome').index().notNullable();
    table.string('email').unique().notNullable();

    table
      .bigInteger('cidadeId')
      .index() // index significa que vai ser um campo idexado, (melhora a performance na hora da consulta)
      .notNullable()
      .references('id')
      .inTable(ETableNames.cidade) // dizendo que esse campo está fazendo referência com id da tabela cidade
      .onUpdate('CASCADE') // significa que se a cidade que está sendo referênciada, o id dela for trocado por exemplo, o onUpdate vai trocar automaticamente o id alterado da cidade para esse campo "cidadeId", assim os Id vão continuar igual
      .onDelete('RESTRICT'); // significa que se eu tentar apagar uma cidade da tabela de cidade, ele não vai deixar porque o campo id está vinculado com uma pessoa da tabela pessoa por exemplo, poderia se ultilizar também o "SET NULL" como argumento assim quando eu tentar fazer o mesmo processo de deletar a cidade, ele vai deixar e vai colocar "null" no campo cidadeId do registro da pessoa
      
      

    table.comment('Tabela usada para armazenar pessoas do sistema');
  })
  .then(() => {
    console.log(`# Create table ${ETableNames.pessoa}`)
  });

}


export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa)
  .then(() => {
    console.log(`# Dropped table ${ETableNames.pessoa}`)
  });;
}
