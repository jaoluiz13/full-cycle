import Id from "../../../@shared/domain/value-object/id-value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1"
})

transaction.process();


const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
}

const transactionDeclined = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "1"
})

transactionDeclined.process();

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined))
    }
}


describe("Process payment use case unit test", () => {
    it("should process a payment", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: '1',
            amount: 100
        }

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe(transaction.orderId);
    });

    it("should decline a payment", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const usecase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            orderId: '1',
            amount: 50
        }

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe(transaction.orderId);
    });

});