import styled from 'styled-components';

export const ContainerTickets = styled.div`
    width: 70%;
    padding-left: 2rem;
    @media (max-width: 768px) {
        width: 100%;
        padding: 0 1rem ;
    }
    div.active ul, div.disabled ul {
        margin-top: ${({ theme }) => theme.spacing(2)};
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(1)};
        width: 100%;
    }
    div.empty {
        height: 300px;
    }
    div.title {
        &.mobile {
            display: none;
        }
        @media(max-width: 1024px) {
            &.mobile {
                display: flex;
                align-items: center;
                gap: ${({ theme }) => theme.spacing(2)};
                margin-bottom: ${({ theme }) => theme.spacing(4)};
                h6 {
                    font-size: ${({ theme }) => '20px'};
                    font-weight: 500; 
                }
            }
        }
    }
    div.disabled {
        margin-top: ${({ theme }) => theme.spacing(4)};
    }
    div.active {
        margin-top: ${({ theme }) => theme.spacing(4)};
    }
    ul.list-tickets {
        margin-top: ${({ theme }) => theme.spacing(3)};
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(1)};
    }
    @media (max-width: 1400px) {
        width: 90%;
    }
    @media (max-width: 1024px) {
        width: 100%;
    }
`;
