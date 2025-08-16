export interface Category {
    cateId: string;
    cateNameList?: CategoryItem[];
};
export interface CategoryItem {
    cateName: string | string[];
    cateChild?: string[];
    routerLink?: string[];
};

export interface Image {
    itemImageSrc?: string;
    thumbnailImageSrc?: string;
    alt?: string;
    title?: string;
    idImg?: string;
    routerLink?: string;
};

export interface FooterSection {
    title: string;
    childs: FooterChild[];
};
export interface FooterChild {
    name: string;
    params?: string;
    icon?: string;
};

export interface CartItem {
    id: string | number;
    name: string;
    price: number;
    sale: number;
    quantity: number;
    image?: string;
    currentStock: number;
};