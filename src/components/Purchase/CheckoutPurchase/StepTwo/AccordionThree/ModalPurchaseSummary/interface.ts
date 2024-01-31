import { IPurchase } from '@/types';

export interface IModalPurchaseSummary {
    onClose: () => void;
    dataPurchase?: IPurchase;
}
