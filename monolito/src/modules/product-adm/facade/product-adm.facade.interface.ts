
export interface AddProductFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number
}

export interface CheckStockFacadeInputDto {
    productId: string;
}

export interface CheckProductFacadeOutputDto {
    productId: string;
    stock: number;
}


export default interface ProductAdmnFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckProductFacadeOutputDto>;
}