import styled from 'styled-components';

export const ContainerSelectSector = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    div.select-sector {
        border-top: 1px solid ${({ theme }) => "rgba(0, 0, 0, 0.87)"};
        border-bottom: 1px solid ${({ theme }) => "rgba(0, 0, 0, 0.87)"};
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    button:last-child {
        border-bottom: none;
    }
    div.confirm {
        margin-top: ${({ theme }) => theme.spacing(4.5)};

        button {
            font-size: ${({ theme }) => "1rem"};
            min-height: ${({ theme }) => theme.spacing(6)};
        }
    }
`;
