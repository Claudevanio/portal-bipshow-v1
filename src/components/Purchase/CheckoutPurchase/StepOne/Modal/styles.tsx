import styled from 'styled-components';
import { Modal as MuiModal } from '@mui/material';

export const ContainerModal = styled(MuiModal)`
    div.header {
        padding: ${({ theme }) => theme.spacing(2)};
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid ${({ theme }) => "#f6f6f6"};

        div.on-close {
            position: absolute;
            right: ${({ theme }) => theme.spacing(2)};
            top: ${({ theme }) => theme.spacing(1)};
            /* @media(max-width: 767px) {
                display: none;
            } */
        }
    }
    div.content-modal {
        padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(6)};
        margin-top: ${({ theme }) => theme.spacing(1)};

        @media(max-width: 767px) {
            height: calc(100vh - 57px - 10px);
            min-height: 400px;
            display: flex;
            flex-direction: column;
            padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(2)};
        }

        form {
            width: 100%;
            margin-top: ${({ theme }) => theme.spacing(3)};
            div.forms-inputs {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: .5rem;
                @media(max-width: 767px) {
                display: flex;
                flex-direction: column;
                gap: 0;
                }
                div.is-name {
                    width: 100%;
                }
                div.is-cpf {
                    display: flex;
                    gap: ${({ theme }) => theme.spacing(2)};
                    align-items: center;
                    div.check-responsibled {
                        display: flex;
                        align-items: center;
                        gap: ${({ theme }) => theme.spacing(2)};
                        .form-check {
                            margin-bottom: 0;
                        }
                        @media(max-width: 767px) {
                            gap: ${({ theme }) => theme.spacing(1)};
                        }
                    }
                    div:first-child {
                        margin-bottom: 8px;
                        flex: 1;
                    }
                    @media(max-width: 767px) {
                        gap: ${({ theme }) => theme.spacing(1)};
                    }
                }
                div.is-phone {
                    display: flex;
                    gap: ${({ theme }) => theme.spacing(2)};
                    > div:nth-child(1) {
                        width: 20%;
                    }
                }
            }
            div.form-check {
                width: fit-content;
                display: flex;
                align-items: center;
                label {
                    font-size: ${({ theme }) => ".875rem"};
                    font-weight: 600;
                    color: ${({ theme }) => "#E3E3E3"};
                    
                    padding-top: ${({ theme }) => theme.spacing(1)};
                    margin-left: ${({ theme }) => theme.spacing(1)};
                    @media(max-width: 767px) {
                        font-size: ${({ theme }) => ".75rem"};
                    }
                }
                input {
                    width: ${({ theme }) => theme.spacing(2)};
                    height: ${({ theme }) => theme.spacing(2)};
                    border-radius: 4px;
                    &:focus {
                        box-shadow: none;
                        outline: none;
                        border-color: ${({ theme }) => '#8779F8'};
                    }
                }
                .form-check-input:checked {
                    background-color: ${({ theme }) => '#8779F8'};
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
                    border-color: ${({ theme }) => '#8779F8'};
                }
            }
            div.buttons {
                margin-top: ${({ theme }) => theme.spacing(4)};
                display: flex;
                gap: ${({ theme }) => theme.spacing(3)};
                justify-content: flex-end;
                @media(max-width: 767px) {
                    flex-direction: column;
                    gap: ${({ theme }) => theme.spacing(2)};
                    margin-top: auto;
                }
                button {
                    max-width: 100%;
                    min-width: 100%;
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
            @media(max-width: 767px) {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
        }
    }
`;
