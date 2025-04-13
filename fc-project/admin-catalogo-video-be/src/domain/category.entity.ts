import { Uuid } from "../shared/domain/value-objects/uuid.vo";

export type CategoryConstructorProps = {
    category_id?: Uuid;
    name: string;
    description?: string | null;
    is_active?: boolean;
    created_at?: Date
}

export type CategoryCreateCommand = {
    name: string;
    description?: string;
    is_active?: boolean;
}

export class Category {
    category_id?: Uuid;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date

    constructor(props: CategoryConstructorProps) {

        this.category_id = props.category_id ?? new Uuid();
        this.name = props.name;
        this.description = props.description ?? null;
        this.created_at = props.created_at ?? new Date();
        this.is_active = props.is_active ?? true;
    }

    public static create(props: CategoryConstructorProps): Category {
        return new Category(props);
    }

    public changeName(name: string): void {
        this.name = name;
    }

    public changeDescription(description: string): void {
        this.description = description;
    }

    public activate() {
        this.is_active = true;
    }

    public deactivate() {
        this.is_active = false;
    }

    public toJSON() {
        return {
            category_id: this.category_id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at
        }
    }


}
