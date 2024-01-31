import { Auth } from '../interface';

export interface IRegister {
    handleChangeType?: (type: Auth) => void;
    onClickPurchase?: () => void;
}
