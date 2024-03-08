import * as signIn from './SignIn'
import * as signUp from './SignUp'
import * as logout from './Logout'

export const UsuariosController = {
  ...signIn,
  ...signUp,
  ...logout
}