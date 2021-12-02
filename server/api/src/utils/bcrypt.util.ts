import * as bcrypt from 'bcrypt';

export class Bcrypt {
  static hash(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
