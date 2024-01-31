import styled from 'styled-components';

export const ContainerModalEditAddress = styled.div`
     div.header {
        padding: ${({ theme }) => theme.spacing(2)};
        position: relative;
        width: fit-content;
        background-color: white;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid ${({ theme }) => "#f6f6f6"};

        div.on-close {
            position: absolute;
            right: ${({ theme }) => theme.spacing(2)};
            top: ${({ theme }) => theme.spacing(1)};
            @media(max-width: 767px) {
                display: none;
            }
        }
    }
    div.content-modal {
        padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(6)};
        margin-top: ${({ theme }) => theme.spacing(1)};

        @media(max-width: 767px) {
            padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(2)};
        }

        form {
            width: 100%;
            margin-top: ${({ theme }) => theme.spacing(1.5)};
            div.forms-inputs {
                width: 100%;
                display: flex;
                gap: ${({ theme }) => theme.spacing(2)};
                @media(max-width: 767px) {
                    flex-direction: column;
                    gap: 0;
                }
            }
            div.forms-inputs-two {
                width: 100%;
                display: flex;
                gap: ${({ theme }) => theme.spacing(2)};
                div:last-child {
                    width: 25%;
                    @media(max-width: 767px) {
                        width: 100%;
                    }
                }
                @media(max-width: 767px) {
                    flex-direction: column;
                    gap: 0;
                }
            }
            div.buttons {
                margin-top: ${({ theme }) => theme.spacing(6)};
                display: flex;
                gap: ${({ theme }) => theme.spacing(3)};
                justify-content: flex-end;
                @media(max-width: 767px) {
                    flex-direction: column;
                    gap: ${({ theme }) => theme.spacing(2)};
                    margin-top: ${({ theme }) => theme.spacing(2)};
                }
                button {
                    max-width: 248px;
                    min-width: 160px;
                    @media(max-width: 767px) {
                        max-width: 100%;
                    }
                }
                button:first-child {
                    max-width: 160px;
                    @media(max-width: 767px) {
                        max-width: 100%;
                        order: 1;
                    }
                }
            }
        }
    }
`;
