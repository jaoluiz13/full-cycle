export interface FindAProductInputDto {
    id: string;
}

export interface FindAProductOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}