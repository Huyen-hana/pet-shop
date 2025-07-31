export interface User {
    id: string | number;
    fullname: string;
    email: string;
    passWord: string;
    role: string;
    createdAt?: Date;
    avatar?: string;
    phone?: string;
}