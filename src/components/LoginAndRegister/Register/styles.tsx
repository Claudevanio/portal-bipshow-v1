import styled from 'styled-components';

export const ContainerRegister = styled.div`
    div.card {
        background-color: white;
        border-radius: .5rem;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
        max-width: 25rem;
        margin-bottom: 2rem;
        overflow-y: auto;
        max-height: 87vh;

        @media (max-width: 768px) {
        background-color: transparent !important;
        box-shadow: none;
        max-height: unset;
        }

        @media (max-width: 768px){
            background-color: transparent;
            width: 100%;
        }
        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            div.buttons {
                width: 100%;
                margin-top: ${({ theme }) => theme.spacing(6)};
                display: flex;
                gap: ${({ theme }) => theme.spacing(1)};
                &.cancel-photo {
                    button {
                        border-color: ${({ theme }) => "#F65252"};
                        color: ${({ theme }) => "#F65252"};
                    }
                }
            }
        }
    }
    div.is-stepper-one-btn-custom {
        margin-top: ${({ theme }) => theme.spacing(6)};
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(2)};
    }
    a.home-back {
        position: absolute;
        padding: ${({ theme }) => theme.spacing(1.5)};
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }) => "#FFFFFF"};
        border-radius: 50%;
        top: ${({ theme }) => theme.spacing(2)};
        left: ${({ theme }) => theme.spacing(2)};
        transition: 400ms;
        &:hover {
            transition: 400ms;
            filter: brightness(0.9)
        }
        @media(max-width: 767px) {
            top: ${({ theme }) => theme.spacing(3)};
        }
    }
`;
