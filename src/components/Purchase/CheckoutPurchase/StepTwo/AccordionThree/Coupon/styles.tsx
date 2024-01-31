import styled from 'styled-components';

export const ContainerCoupon = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    h6.title {
        font-size: ${({ theme }) => ".875rem"};
        font-weight: 700;
        
    }
    p.information {
        margin-top: ${({ theme }) => theme.spacing(1)};
        font-size: ${({ theme }) => "1rem"} !important;
        
        font-weight: 400 !important;
        color: ${({ theme }) => "#39474F"} !important 
    }
    div.discount {
        margin-top: ${({ theme }) => theme.spacing(3)};
    }
    div.coupon-applied {
        display: flex;
        align-items: center;
        width: 70%;
        justify-content: space-between;
        margin-top: -6px;
        @media(max-width: 767px) {
            width: 90%;
        }
        button {
            width: fit-content;
        }
        p.information {
            padding-bottom: 12px
        }
    }
    form {
        display: flex;
        flex-direction: row;
        align-items: center;
        button {
            width: fit-content;
        }
        div.input-coupon {
            width: 53%;
            @media(max-width: 767px) {
                width: 100%;
            }
            input {
                width: 100%;
            }
        }
    }
    div.btn {
        display: flex;
        justify-content: center;
        min-width: 75px;
        padding-top: 0px;
        @media(max-width: 767px) {
            padding-right: 0;
        }
    }
    div.spinner-border {
        height: ${({ theme }) => theme.spacing(2)};
        width: ${({ theme }) => theme.spacing(2)};
        border-width: 2px;
        border-color: ${({ theme }) => '#8779F8'};
        border-right-color: transparent;
        @media(max-width: 1024px) {
            height: ${({ theme }) => theme.spacing(2)};
            width: ${({ theme }) => theme.spacing(2)};
        }
    }
`;
