export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    address: string;
}

export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
    add(dto: AddClientFacadeInputDto): Promise<void>;
    find(dto: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}