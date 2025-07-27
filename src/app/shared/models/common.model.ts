export interface Category {
    cateId: string;
    cateNameList?: CategoryItem[];
};
export interface CategoryItem {
    cateName: string | string[];
    cateChild?: string[];
}