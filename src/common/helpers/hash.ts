import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);

    return hash;
}

export async function comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}
