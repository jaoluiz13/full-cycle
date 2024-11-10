import CustomerRespositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {
    private customerRepository: CustomerRespositoryInterface;

    constructor(customerRepository: CustomerRespositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.customerRepository.find(input.id);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                city: customer.address.city,
                zip: customer.address.zip,
                number: customer.address.number,
                street: customer.address.street
            }
        }
    }
}  