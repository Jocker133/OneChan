import { Thread } from './Thread';


export class Post extends Thread {
    parentid: string;
    role: string[] = ['Anonymous', 'Modérateur', 'Administrateur'];
    threadHead: boolean;
}
