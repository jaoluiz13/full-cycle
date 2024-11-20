import AggregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id-value-object";

type TransactionProps = {
    id?: Id,
    amount: number,
    orderId: string,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export class TransactionId extends Id {
    constructor(id: string) {
        super(id);
    }
}

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number;
    private _orderId: string;
    private _status: string;

    constructor(props: TransactionProps) {
        super(props.id);

        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = props.status || "pending";
        this.validate();
    }

    get amount(): number { return this._amount; }
    get orderId(): string { return this._orderId; }
    get status(): string { return this._status; }

    set amount(amount: number) { this._amount = amount; }
    set orderId(orderId: string) { this._orderId = orderId; }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error('Amount must be greater than zero');
        }
    }

    aprove(): void {
        this._status = "approved";
    }

    decline(): void {
        this._status = "declined";
    }

    process(): void {
        if (this.amount >= 100) {
            this.aprove();
            return;
        }
        this.decline();
        return;
    }
}