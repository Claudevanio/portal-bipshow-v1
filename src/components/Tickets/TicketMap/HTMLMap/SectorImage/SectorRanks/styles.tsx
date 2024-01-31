import styled from 'styled-components';

export const ContainerSectorRanks = styled.div`
    position: relative;
    width: 100%;
    header {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 0px ${({ theme }) => theme.spacing(5)};
        padding-top: ${({ theme }) => theme.spacing(3)};
        gap: ${({ theme }) => theme.spacing(2)};
        button {
            font-size: ${({ theme }) => ".875rem"};
            font-family: ${({ theme }) => "inherit"};
            color: ${({ theme }) => '#956AFB'};
            padding: 6px ${({ theme }) => theme.spacing(2)};
            border-radius: 4px;
            border: 1px solid ${({ theme }) => '#956AFB'};
            font-weight: 500;
            text-transform: capitalize;
            transition: 400ms;
            &:hover, &.active {
                transition: 400ms;
                background-color: ${({ theme }) => '#956AFB'};
                color: ${({ theme }) => '#39474F'};
            }
        }
    }
    > h6 {
        width: 100%;
        text-align: center;
        position: absolute;
        top: ${({ theme }) => theme.spacing(1)};
        color: ${({ theme }) => "rgba(0, 0, 0, 0.6)"};
        text-transform: uppercase;
    }
`;
