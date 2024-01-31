import styled from 'styled-components';

export const ContainerStepThree = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    div.complement-number {
        display: flex;
        gap: ${({ theme }) => theme.spacing(1)};
        div:first-child {
            border-radius: 8px 0px 0px 0px;
        }
        div:last-child {
            width: 40%;
            border-radius: 0px 8px 0px 0px;
        }
    }
    div.state-city {
        display: flex;
        flex-direction: column;
        div {
            width: 100%;
        }
    }
`;
