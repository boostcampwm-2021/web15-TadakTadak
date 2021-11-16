import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

export const HttpsOptionsConfig: HttpsOptions = {
  key: 'key',
  ca: 'ca',
  cert: 'cert',
};
