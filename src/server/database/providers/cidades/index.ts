import * as create from './Create';
import * as updateById from './UpdateById';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as count from './Count';



export const CidadesProvider = {
  ...create,
  ...updateById,
  ...getAll,
  ...getById,
  ...deleteById,
  ...count,
}


