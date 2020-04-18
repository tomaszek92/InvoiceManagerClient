import { InvoiceRow } from './invoice-row.model';
import { Month } from './month.model';
import { PaymentType } from './payment-type.model';

export class Invoice {
    id: number;
    year: number;
    month: Month;
    number: number;
    clientId: number;
    sellDate: Date;
    issueDate: Date;
    paytime: number;
    paymentType: PaymentType;
    isPayed: boolean;
    rows: InvoiceRow[];
    priceNet: number;
    priceGross: number;
}
