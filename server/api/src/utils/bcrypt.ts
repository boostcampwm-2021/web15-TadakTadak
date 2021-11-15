import * as bcrypt from 'bcrypt';

export class Bcrypt {
  static hash(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  static compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
