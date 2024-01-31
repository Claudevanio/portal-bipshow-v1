import styled from 'styled-components';
import { FormAddressVariantType } from './interface';

export const ContainerFormAddress = styled.div<{
    variant: FormAddressVariantType;
}>`
    width: 100%;
    display: flex;
    flex-direction: column;
    div.complement-number {
        display: flex;
        gap: ${({ theme }) => theme.spacing(1)};
    }
    div.state-city {
        display: flex;
        flex-direction: column;
        div {
            width: 100%;
        }
    }
`;
