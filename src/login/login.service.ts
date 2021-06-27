import { getManager } from "typeorm";
import bcryptjs from 'bcryptjs';
import { User } from "../entities/user.model";

async function authenticate(user: Partial<User>) {
    const { login, password } = user;
    const repo = getManager().getRepository(User);
    const finded = await repo.findOne({ login });
    if (finded && await bcryptjs.compare(String(password), String(finded?.password))) {
        return finded;
    }
    return false;
}

export { authenticate };