import Id from "../../../@shared/domain/value-object/id-value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {

    constructor(private readonly transactionRepository: PaymentGateway) { }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {

        const transaction = new Transaction({
            id: new Id(),
            amount: input.amount,
            orderId: input.orderId
        });

        transaction.process();

        const persistTransaction = await this.transactionRepository.save(transaction);

        return {
            amount: persistTransaction.amount,
            orderId: persistTransaction.orderId,
            status: persistTransaction.status,
            transactionId: persistTransaction.id.id,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt
        };
    }

}