import { PaymentType } from '../payment-type.model';

export const PaymentTypes: { id: PaymentType, name: string }[] = [{
    id: PaymentType.BankTransfer,
    name: 'Przelew'
}, {
    id: PaymentType.Cash,
    name: 'Gotówka'
}, {
    id: PaymentType.CreditCard,
    name: 'Karta'
}];
