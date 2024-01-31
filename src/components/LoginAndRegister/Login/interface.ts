export interface ILogin {
    onClickPurchase?: () => void;
    handleChangeType?: (type: 'login' | 'register') => void;
}
