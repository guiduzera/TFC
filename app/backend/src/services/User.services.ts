import { ReqBodyUser, IUserServices } from '../interfaces/User.interfaces';
import CustomError from '../helpers/CustomError';
import Users from '../database/models/UsersModel';
import { Ibycript, Ijwt } from '../helpers/auth.interfaces';

export default class UserServices implements IUserServices {
  private user = Users;
  private jwt: Ijwt;
  private bcrypt: Ibycript;

  constructor(j: Ijwt, b: Ibycript) {
    this.jwt = j;
    this.bcrypt = b;
  }

  async login(body: ReqBodyUser): Promise<string> {
    const result = await this.user.findOne({ where: { email: body.email } });
    if (!result) throw new CustomError(401, 'Incorrect email or password');
    const { username, email, password, role } = result;
    const isValid = await this.bcrypt.comparePassword(body.password, password);
    if (!isValid) throw new CustomError(401, 'Incorrect email or password');
    return this.jwt.createToken({ username, role, email });
  }
}
