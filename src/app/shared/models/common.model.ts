export interface Category {
    cateId: string;
    cateNameList?: CategoryItem[];
};
export interface CategoryItem {
    cateName: string | string[];
    cateChild?: string[];
}

export interface Image {
    itemImageSrc?: string;
    thumbnailImageSrc?: string;
    alt?: string;
    title?: string;
    idImg?: string;
    routerLink?: string;
}