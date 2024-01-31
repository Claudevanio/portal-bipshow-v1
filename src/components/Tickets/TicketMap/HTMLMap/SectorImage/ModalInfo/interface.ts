import { SelectedChairProps } from '@/shared/hooks/useEventTicket';

export interface IModalInfo {
    chair: SelectedChairProps;
    onClose: () => void;
}
