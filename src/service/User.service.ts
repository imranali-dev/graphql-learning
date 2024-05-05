import { prismaClient } from "../lib/db";
const myPlaintextPassword = 's0/\/\P4$$w0rD';
import bcrypt from 'bcryptjs';
import JWTService from "./Token.service";
const saltRounds = 10;
export interface CreateUserPayload {
    lastName?: string
    firstName: string;
    email: string;
    password: string;
    profileImageURL?: string
}
export interface GetusertokenPayload {
    email: string;
    password: string;
}
class UserService {
    public static async getUserById(id: string) {
        return await prismaClient.user.findUnique({
            where: { id }
        })
    };
    public static async finduniqueemail(email: string) {
        const find = await prismaClient.user.findUnique({
            where: { email }
        });
        return find;
    };
    public static async hashing(password: string) {
        let salt = bcrypt.genSaltSync(saltRounds);
        const passwordhashing = bcrypt.hashSync(password, salt)
        return passwordhashing;
    };
    public static async dehashing(password: string, hashedPassword: string) {
        const compare = bcrypt.compare(password, hashedPassword);
        return compare;
    };


    public static async createNew(payload: CreateUserPayload): Promise<any> {
        const user = await UserService.finduniqueemail(payload.email);
        if (user) {
            throw new Error('User Already exist')
        };
        const hashedPassword = await UserService.hashing(payload.password);
        const createNewone = await prismaClient.user.create({
            data: {
                lastName: payload.lastName,
                email: payload.email,
                firstName: payload.firstName,
                password: hashedPassword,
                profileImageURL: payload.profileImageURL
            }
        });
        const againfindindb = await UserService.finduniqueemail(payload.email)
        if (!againfindindb) throw new Error("User with email not found");
        return createNewone;
    };

    public static async loginandtoken(payload: GetusertokenPayload) {
        try {
            const { email, password } = payload;
            const user = await UserService.finduniqueemail(email);
            if (!user) {
                throw new Error('User Already exist')
            };
            if (user.password === null) {
                throw new Error('User password is null');
            }
            console.log(user.password)
            const passwordMatch = await UserService.dehashing(password, user.password);
            console.log(passwordMatch)
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }
            const token = JWTService.generateTokenForUser(user);
            return token;
        } catch (error: any) {
            throw new Error(`Login failed: ${error.message}`);

        }


    }

}
export default UserService;