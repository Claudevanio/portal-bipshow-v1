import styled from 'styled-components';

export const ContainerOptionsPayment = styled.div`
     h6.title {
        font-size: ${({ theme }) => ".875rem"};
        font-weight: 700;
        
    }
`;

export const ContainerOptionsPaymentList = styled.div`
    display: flex;
    margin-top: ${({ theme }) => theme.spacing(1.5)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    gap: ${({ theme }) => theme.spacing(2)};
    flex-wrap: wrap;
    @media(max-width: 767px) {
        gap: ${({ theme }) => theme.spacing(1)};
    }
`;
