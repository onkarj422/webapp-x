import { Injectable, Inject } from '@angular/core';
import * as bcrypt from "bcryptjs";

@Injectable()
export class CryptService {

  constructor() { }

  encrypt(string: string) {
  	return bcrypt.hashSync(string, bcrypt.genSaltSync(2));
  }

  compare(hash: string, plain: string) {
  	return bcrypt.compareSync(plain, hash);
  }

}
