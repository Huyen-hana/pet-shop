export interface User {
    id?: string | number;
    fullName: string;
    email: string;
    passWord: string;
    role: 'admin' | 'customer';
    createdAt?: string;
    avatar?: string;
    phone?: string;
}