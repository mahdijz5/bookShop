import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        throw new Error(err);
    }
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (err) {
        throw new Error(err);
    }
};

export const genHash = (): string => {
    try {
        return crypto.createHash('md5').update(crypto.randomBytes(32)).digest('hex');
    } catch (err) {
        throw new Error(err);
    }
};

export const genRandomString = (): string => {
    try {
        return crypto.randomBytes(5).toString('hex');
    } catch (err) {
        throw new Error(err);
    }
};

export const genRandomNum = (): string => {
    try {
        return '123456'; // Remove in real production
        return crypto.randomInt(100000, 999999).toString();
    } catch (err) {
        throw new Error(err);
    }
};

export const genRandomNumCode = (max : number): string => {
    try {
        let maxFloat = 9 **(max) - 10**(max-1 ) 
        return ""+(Math.floor(Math.random() * maxFloat) + 10**(max-1 ) )
    } catch (err) {
        throw new Error(err);
    }
};
