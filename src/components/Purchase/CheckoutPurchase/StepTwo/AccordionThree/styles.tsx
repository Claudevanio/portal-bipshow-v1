import styled from 'styled-components';

export const ContainerAccordionThree = styled.div`
    div.alert-container {
        margin-top: ${({ theme }) => theme.spacing(3)};
        p.text-light {
            margin-top: 0px !important;
        }
    }
    div.loading-installment {
        width: fit-content;
        margin-top: ${({ theme }) => theme.spacing(2)};
        margin-bottom: ${({ theme }) => theme.spacing(2)};
    }
    div.installment{
        margin: 0 1rem;
    }
    div.logo-pagseguro {
        img {
            width: 150px;
            @media(max-width: 767px) {
                width: 120px;
            }
        }
    }
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(3)};
        h6.title {
            font-size: ${({ theme }) => ".875rem"};
            font-weight: 700;
            
        }
        div.input-card {
            div.form-data-card {
                display: flex;
                gap: ${({ theme }) => theme.spacing(2)};
                width: 100%;
                flex-wrap: wrap;
                div.card-number {
                    width: calc(60% - ${({ theme }) => theme.spacing(2)});
                    @media(max-width: 767px) {
                        width: 100%;
                    }
                }
                div.validation, div.cvv {
                    width: calc(20% - ${({ theme }) => theme.spacing(2)});
                }
                @media(max-width: 767px) {
                    div.validation {
                        width: calc(50% - ${({ theme }) => theme.spacing(1)});
                    }
                    div.cvv {
                        width: calc(50% - ${({ theme }) => theme.spacing(1)});
                    }
                }
            }
        }
        div.name-holder {
            display: flex;
            flex-direction: column;
            div.name-holder-input {
                display: flex;
                flex-direction: column;
                width: 70%;
                @media(max-width: 767px) {
                    width: 100%;
                }
            }
            div.address-holder {
                margin-top: ${({ theme }) => theme.spacing(3)};
                width: 100%;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                > div {
                    width: 100% !important;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    > div {
                        width: 100%;
                    }
                }
                button {
                    width: fit-content;
                }
            }
        }
        div.btn-submit {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            button {
                max-width: 40%;
                @media(max-width: 767px) {
                    max-width: 50%;
                }
            }
        }
    }
    div.boleto {
        margin-top: ${({ theme }) => theme.spacing(3)};
        h6.title {
            font-size: ${({ theme }) => ".875rem"};
            font-weight: 700;
            
        }
        div.total {
            p {
                margin-top: ${({ theme }) => theme.spacing(1.5)};            
                font-size: ${({ theme }) => "1rem"};
                
                font-weight: 400;
                color: ${({ theme }) => "#39474F"}
            }
        }
    }
    .name-holder-input {
                display: flex;
                flex-direction: column;
    }
`;
