import { Thread } from './Thread';

enum Role {
    admin = 1,
    modo = 2,
    membre = 3
}

export class Post extends Thread {
    parentid: string;
    role: Role;
    threadHead: boolean;
}