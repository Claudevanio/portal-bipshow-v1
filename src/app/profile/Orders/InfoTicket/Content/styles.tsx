import styled from 'styled-components';

export const ContainerContent = styled.div`
    margin-top: ${({ theme }) => theme.spacing(5.125)};
    div.btn-pix {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(2)};
        button.payment-pix-cancel {
            background-color: transparent;
            border: 1px solid ${({ theme }) => '#F65252'};
            color: ${({ theme }) => '#F65252'};
        }
    }
    div.buttons {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(4)};
        button {
            font-size: ${({ theme }) => '16px'};
            font-weight: 400;
            
            color: ${({ theme }) => '#bcbcbc'};
            padding-bottom: ${({ theme }) => theme.spacing(1.125)};

            &.active {
                font-weight: 700;
                color: ${({ theme }) => '#8779F8'};
                border-bottom: 2px solid ${({ theme }) => '#8779F8'};
            }
            &:hover {
                font-weight: 400;
                color: ${({ theme }) => '#8779F8'};
            }
        }
    }
    button.payment-pix {
        margin-top: ${({ theme }) => theme.spacing(3)};
    }
    div.content-block {
        div.info-text {
            margin-top: ${({ theme }) => theme.spacing(3)};
            div.text {
                margin-top: ${({ theme }) => theme.spacing(3)};
                * {
                    font-size: ${({ theme }) => '14px'} !important;
                    font-weight: 400 !important; 
                    color: ${({ theme }) => '#bcbcbc'} !important;
                }
            }
        }
        div.info-rules {
            padding: ${({ theme }) => theme.spacing(2)};
            margin-top: ${({ theme }) => theme.spacing(3)};
            background-color: ${({ theme }) => '#f2f2f2'};
            border-radius: 8px;
            h6.title { 
                font-weight: 700;
                margin-bottom: ${({ theme }) => theme.spacing(3)};
            }
        }
        div.tickets {
            margin-top: ${({ theme }) => theme.spacing(3)};
            div.list-purchase {
                div.header-list-purchase {
                    margin-bottom: ${({ theme }) => theme.spacing(4)};
                    display: flex;
                    align-items: center;
                    gap: ${({ theme }) => theme.spacing(3)};

                    button {
                        min-height: fit-content !important;
                        min-width: 163px;
                        max-height: 42px;
                    }
                }
                div.mode-desktop {
                    width: 100%;
                }
                div.mode-mobile {
                    display: none;
                }
                @media(max-width: 767px) {
                    div.mode-desktop {
                        display: none;
                    }
                    div.mode-mobile {
                        display: block;
                        div.content {
                            padding: 0;
                        }
                        div.carousel-tickets {
                            div.item {
                                min-height: 350px !important;
                                padding-right: ${({ theme }) => theme.spacing(2)};
                            }
                            ul.react-multi-carousel-dot-list {
                                top: 318px; 
                                button {
                                    width: 8px;
                                    height: 8px;
                                    border-radius: 50%;
                                    background-color: rgba(189, 189, 189, 0.75);
                                    opacity: 1;
                                    border: none;
                                    &.active {
                                        background-color: ${({ theme }) => '#8779F8'};
                                    }
                                }
                                li.react-multi-carousel-dot--active {
                                    button {
                                        width: 35px;
                                        border-radius: 50px;
                                        background-color: ${({ theme }) => '#8779F8'};
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    div.alert-canceled {
        margin-bottom: ${({ theme }) => theme.spacing(2.5)};
    }
    div.btn-actions {
        margin-top: ${({ theme }) => theme.spacing(3)};
        display: flex;
        gap: ${({ theme }) => theme.spacing(2)};
        a {
            min-height: 45px;
        }
        button.btn-canceled-payment {
            border-color: ${({ theme }) => '#F65252'};
            color: ${({ theme }) => '#F65252'};
        }
    }
`;

export const ContainerContentInfoPurchase = styled.div`
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
    div {
        width: 100%;
        gap: ${({ theme }) => theme.spacing(1)};
        display: flex;
        align-items: center;
    }
`;
