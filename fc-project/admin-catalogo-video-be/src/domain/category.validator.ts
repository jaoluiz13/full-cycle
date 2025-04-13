import { MaxLength, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { isBoolean } from 'lodash';
import { Category } from './category.entity';

class CategoryRules {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string | null;

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;

    constructor({ name, description, is_active }: Category) {
        Object.assign(this, { name, description, is_active });
    }

}

export class CategoryValidator {

    validate(entity: Category) {

    }

}