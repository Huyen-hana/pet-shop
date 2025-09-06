export interface Product {
    name: string,
    id?: string | number,
    img?: string,
    category?: string,
    cateChild?: string,
    type: ProductType,
    brand: string,
    price: number,
    sale?: number,
    currentStock: number,
    createdAt?: string;
    variants: string[];
}

export type ProductType = '' | 'dog' | 'cat';
