export interface User {
    id?: string | number;
    fullName: string;
    email: string;
    passWord: string;
    role: string;
    createdAt?: string;
    avatar?: string;
    phone?: string;
}