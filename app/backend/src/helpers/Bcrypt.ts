import * as bcrypt from 'bcryptjs';
import { Ibycript } from './auth.interfaces';

export default class Bcrypt implements Ibycript {
  encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  comparePassword = async (password:string, encrypted: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(password, encrypted);
    return isValid;
  };
}
