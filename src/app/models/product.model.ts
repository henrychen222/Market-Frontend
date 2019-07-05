import { Sale } from './sale.model';
import { Manufacture } from './manufacture.model';

export class Product {
    name: string;
    description: string;
    attributes: object;
    manufacturerId: string;
    productId: number;
    productID: number;
    details: string;
    documentUrl: string;
    saleId: number;
    subCategoryID: number;
    sale: Sale;
    manufacture: Manufacture;
    detailsArray: string[];

    constructor(response: any) {
        this.description = response.description;
        this.attributes = response.attributes;
        this.productId = response.productId;
    }
}
