import styled from 'styled-components';

export const ContainerActionTicket = styled.div`
    width: 35%;
    padding: ${({ theme }) => theme.spacing(3.125)};
    border-radius: 16px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(3)};
    &.chairs {
        width: 100%;
        padding: 0px ${({ theme }) => theme.spacing(2)};
        box-shadow: none;
    }

    @media(max-width: 767px) {
        box-shadow: none;
    }

    @media(max-width: 1440px) {
        width: 40%;
    }
    @media(max-width: 1024px) {
        width: 45%;
    }
    @media(max-width: 767px) {
        width: 100%;
    }
    div.title-tickets {
        display: flex;
        gap: ${({ theme }) => theme.spacing(1)};
        @media(max-width: 767px) {
            display: none;
        }
    }
    div.btn-submit-mobile {
        display: none;
    }
    div.btn-submit {
        padding-top: ${({ theme }) => theme.spacing(3)};
        border-top: 1px solid ${({ theme }) => "rgba(0, 0, 0, 0.87)"};

        &.active {
            border-top: none;
        }
        div.info-purchase {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: ${({ theme }) => theme.spacing(2.5)};
            p.dark {
                font-weight: 700;
            }
        }
        @media(max-width: 767px) {
            border-top: none;
            display: none;
        }
    }
    @media(max-width: 767px) {
        div.btn-submit-mobile {
            position: fixed;
            bottom: 0;
            left: 0px;
            width: 100%;
            background-color: ${({ theme }) => '#39474F'};
            padding-left: ${({ theme }) => theme.spacing(2)};
            padding-right: ${({ theme }) => theme.spacing(2)};
            padding-bottom: ${({ theme }) => theme.spacing(3)};
            display: flex;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
            z-index: 1009;
            div.info-purchase {
                display: flex;
                flex-direction: column;
                gap: 6px;
                margin-bottom: 0px;
            }
        }
    }
    div.empty {
        margin-bottom: ${({ theme }) => theme.spacing(3)};
    }
`;
