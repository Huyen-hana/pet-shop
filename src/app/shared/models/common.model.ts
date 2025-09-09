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

export interface MenuCategory {
    key: string;
    label: string;
    items: MenuChild[]
};
export interface MenuChild {
    key: string;
    label: string;
    icon?: string;
    routerLink?: string;
    items?: MenuChild[]
};

export interface SummaryCard {
    title: string;
    data: string;
    subtitle: string[];
    icon: string;
    color?: string;
    bgColor?: string
};

export interface BestSellingItem {
    name: string;
    data: number;
    category: string;
    color: string;
    backGround: string
};