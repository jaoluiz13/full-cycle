import { Entity } from "../shared/domain/entity";
import { Notification } from "../shared/domain/validators/notification";
import { EntityValidationError } from "../shared/domain/validators/validation.error";
import { ValueObject } from "../shared/domain/value-object";
import { Uuid } from "../shared/domain/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";

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

export class Category extends Entity {

    category_id?: Uuid;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date

    constructor(props: CategoryConstructorProps) {
        super();
        this.category_id = props.category_id ?? new Uuid();
        this.name = props.name;
        this.description = props.description ?? null;
        this.created_at = props.created_at ?? new Date();
        this.is_active = props.is_active ?? true;
    }

    get entity_id(): ValueObject {
        return this.entity_id;
    }

    public static create(props: CategoryConstructorProps): Category {
        const category = new Category(props);
        Category.validate(category);
        return category;
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

    static validate(entity: Category) {
        let validator = CategoryValidatorFactory.create();
        let isValid = validator.validate(new Notification(), entity, ['']);
        if (!isValid) {
            throw new EntityValidationError([]);
        }
    }

}


