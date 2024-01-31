export type Auth = 'login' | 'register';

export interface ILoginAndRegister {
    type: Auth;
    onClickPurchase?: () => void;
    onClose?: () => void;
    handleChangeType?: (type: Auth) => void;
}
