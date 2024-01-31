export interface InstallmentProps {
    installments: number;
    installment_value: 57.5;
    interest_free: boolean;
    amount: {
      value: number;
      currency: string;
    };
}
