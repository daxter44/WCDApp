export class User {
    constructor() {
        this.role = 'User';
    }
    id: number;
    eMail: string;
    password: string;
    role: string;
    token: string;
}