import styled from 'styled-components';

export const ContainerForgotPasswordSuccess = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    h6 {
        margin-top: ${({ theme }) => theme.spacing(2)};
        margin-bottom: 0 !important;
        font-size: ${({ theme }) => "1rem"} !important;
        font-weight: 500;

        strong {
            font-weight: 700;
        }
    }
    p {
        margin-top: ${({ theme }) => theme.spacing(2)};
        margin-bottom: ${({ theme }) => theme.spacing(2)};
    }
`;
