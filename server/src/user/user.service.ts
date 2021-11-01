import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getUserInfo(): string {
        return 'userInfo 입입니니당당';
    }
}
