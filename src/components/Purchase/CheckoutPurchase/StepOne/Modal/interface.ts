export interface IModal {
    onClose: () => void;
    index: number;
    nome: string;
    idTipo: number;
    open?: boolean;
}
