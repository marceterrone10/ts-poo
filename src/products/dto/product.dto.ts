import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';


export class ProductDTO extends BaseDTO {
    @IsNotEmpty()
    product_name!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    price!: number;
}