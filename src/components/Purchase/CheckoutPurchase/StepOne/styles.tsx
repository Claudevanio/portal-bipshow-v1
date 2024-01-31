import styled from 'styled-components';

export const ContainerStepOne = styled.div`
    width: 90%;
    max-width: 575px;
    background-color: ${({ theme }) => "#FFFFFF"};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: ${({ theme }) => theme.spacing(4)};
    display: flex;
    flex-direction: column;
    div.loading-order {
        margin-top: ${({ theme }) => theme.spacing(5)};
    }

    @media(max-width: 767px) {
        box-shadow: none;
        background-color: transparent;
        padding: 0;
    }

    ul {
        margin-top: ${({ theme }) => theme.spacing(3)};
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(2)};
    }
    div.btn-next {
        margin-top: ${({ theme }) => theme.spacing(6)};
        width: 50%;
        align-self: flex-end;
        @media(max-width: 1440px) {
            width: 100%;
        }
    }
`;
