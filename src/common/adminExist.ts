import { getRepository } from 'typeorm';
import { User } from '../entities/user.model';

export async function adminIfNotExist() {
    const repo = getRepository(User);
    console.log(repo);
    const finded = await repo.findOne({ where: { login: 'admin', password: 'admin' } });
    if (finded === undefined) {
        const created = repo.create({ name: 'admin', login: 'admin', password: 'admin' });
        await repo.save(created);
    }
}