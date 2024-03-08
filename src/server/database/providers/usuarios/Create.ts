import { ETableNames } from "../../ETableNames"
import { IUsuario } from "../../models"
import {Knex} from "../../knex"
import { PasswordCrypto } from "../../../shared/services"


export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
  
  try {
    const hashPassword = await PasswordCrypto.hashPassword(usuario.password);
    const [result] = await Knex(ETableNames.usuario).insert({...usuario, password:  hashPassword}).returning('id');

    if (typeof result === 'object') {
        return result.id;
    } else if (typeof result === 'number') {
        return result;
    }

    return new Error('Erro ao cadastrar o registro'); 
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
}