export type TProductCreate = {
    name: string,
    description: string,
    price?: number,
    image: string,
    isCatalog: boolean;
    product_id?: number;
    isPublished: boolean;
}

export type TProductGetOne = {
    id: number,
}