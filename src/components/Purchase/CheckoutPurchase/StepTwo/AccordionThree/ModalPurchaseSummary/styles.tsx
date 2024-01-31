import styled from 'styled-components';

export const ContainerModalPurchaseSummary = styled.div`
    padding: ${({ theme }) => theme.spacing(3)};
    padding-top: ${({ theme }) => theme.spacing(3.5)};
    border-top: 6px solid ${({ theme }) => '#8779F8'};
    border-radius: 8px;
    width: fit-content;
    background-color: white;
    @media(max-width: 767px) {
        border-radius: 0px;
    }
    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: ${({ theme }) => theme.spacing(3)};
        border-bottom: 1px solid ${({ theme }) => "#f6f6f6"};
    }
    div.content-modal {
        display: flex;
        flex-direction: column;
        div.tickets {
            padding: ${({ theme }) => theme.spacing(3)} 0px;
            border-bottom: 1px solid ${({ theme }) => "#f6f6f6"};
            width: 100%;
            ul {
                margin-top: ${({ theme }) => theme.spacing(1.75)};
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: ${({ theme }) => theme.spacing(2)};
                li {
                    width: 100%;
                    display: flex;
                    gap: ${({ theme }) => theme.spacing(2)};
                    h6 {
                        font-size: ${({ theme }) => ".875rem"} !important;
                        line-height: 130%;
                    }
                    p.text-light {
                        color: #BFBFBF !important;
                        font-weight: 500 !important;
                    }
                    div.info-one {
                        display: flex;
                        flex-direction: column;
                        gap: 4px
                    }
                    div.info-two {
                        margin-left: auto;
                        display: flex;
                        flex-direction: column;
                        gap: 4px
                    }
                }
            }
        }
        div.payment {
            padding: ${({ theme }) => theme.spacing(3)} 0px;
            border-bottom: 1px solid ${({ theme }) => "#f6f6f6"};
            width: 100%;
            div.infos {
                margin-top: ${({ theme }) => theme.spacing(1.75)};
                width: 100%;
                display: flex;
                justify-content: space-between;
                p.text-light {
                    color: #BFBFBF !important;
                    font-weight: 500 !important;
                }
                h6 {
                    font-size: ${({ theme }) => ".875rem"} !important;
                }
                div.boleto {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
            }
        }
        div.subtotal {
            padding: ${({ theme }) => theme.spacing(3)} 0px;
            border-bottom: 1px solid ${({ theme }) => "#f6f6f6"};
            width: 100%;
            display: flex;
            justify-content: space-between;
            p.text-dark {
                color: ${({ theme }) => "#39474F"} !important;
                font-weight: 500;
                font-size: ${({ theme }) => "1rem"} !important;
            }
        }
        div.total {
            padding: ${({ theme }) => theme.spacing(3)} 0px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            h6 {
                color: ${({ theme }) => '#8779F8'};
            }
            p.text-dark {
                color: ${({ theme }) => '#8779F8'} !important;
                font-weight: 500;
                font-size: ${({ theme }) => "1rem"} !important;
            }
        }
        div.butttons {
            width: 100%;
            margin-top: ${({ theme }) => theme.spacing(6)};
            display: flex;
            justify-content: flex-end;
            gap: ${({ theme }) => theme.spacing(2)};
            button.cancel {
                max-width: 160px;
            }
            button.confirm {
                max-width: 250px;
            }
            @media(max-width: 767px) {
                flex-direction: column;
                button {
                    max-width: 100% !important;
                    width: 100%;
                }
                button.cancel {
                    order: 1
                }
            }
        }
    }
    div.pix {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div.header {
            display: flex;
            align-items: center;
            gap: ${({ theme }) => theme.spacing(1)};
        }
        p.badges {
            padding: 2px 12px;
            height: fit-content;
            border-radius: 8px;
            font-size: ${({ theme }) => ".875rem"};
            
            font-weight: 500;
            background-color: ${({ theme }) => '#8779F8'};
            color: ${({ theme }) => "#FFFFFF"}
        }
    }
`;
