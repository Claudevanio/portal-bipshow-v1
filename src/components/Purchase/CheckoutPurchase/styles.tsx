import styled from 'styled-components';

export const ContainerCheckoutPurchase = styled.div`
    margin-top: 30px;
    margin-bottom: ${({ theme }) => theme.spacing(6)};
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: auto;
    div.time {
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(1)};
        margin-bottom: ${({ theme }) => theme.spacing(3)};
    }
    div.header {
        max-width: 34rem;
        width: 90%;
        div.header-checkout-purchase {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: ${({ theme }) => theme.spacing(2)};
        }
    }
    div.content-steps {
        margin-top: ${({ theme }) => theme.spacing(3)};
        width: 100%;
        display: flex;
        justify-content: center;
        @media(max-width: 767px) {
            margin-top: ${({ theme }) => theme.spacing(5)};
        }
    }
`;
