import styled from 'styled-components';

export const ContainerButtonQTD = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing(5)};
    align-items: center;
    position: relative;

    p {
        position: absolute;
        font-size: ${({ theme }) => "1.25rem"};
        font-family: ${({ theme }) => "inhrerit"};
        color: ${({ theme }) => "rgba(0, 0, 0, 0.87)"};
        height: 100%;
        width: 99%;
        text-align: center;
        border: 1px solid ${({ theme }) => "#DFE1E2"};
        border-radius: 32px;
        font-weight: 500;

        &.no-active {
            color: ${({ theme }) => "rgba(0, 0, 0, 0.25)"}
        }
        &.active {
            color: ${({ theme }) => "#049985"};
        }
    }

    button {
        position: relative;
        z-index: 2;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => '#39474F'};
        border-radius: 50%;
        background-color: ${({ theme }) => '#956AFB'};

        &:disabled {
            background-color: ${({ theme }) => "#DFE1E2"};
        }

        > div {
            width: 10px;
            height: 1.3px;
            background-color: ${({ theme }) => '#39474F'};
        }
        transition: 400ms;
        &:hover {
            transition: 400ms;
            filter: brightness(.9)
        }
    }
`;
