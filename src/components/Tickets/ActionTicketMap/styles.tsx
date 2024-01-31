import styled from 'styled-components';

export const ContainerActionTicketMap = styled.div`
    width: 35%;
    padding: ${({ theme }) => theme.spacing(3.125)};
    border-radius: 16px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(3)};
    div.title-tickets {
        display: flex;
        gap: ${({ theme }) => theme.spacing(1)};
        @media(max-width: 767px) {
            display: none;
        }
    }
    img {
        width: 100%;
        max-width: 320px;
        align-self: center;
        margin: ${({ theme }) => theme.spacing(3)};

        &.mobile {
            display: none;
        } 
        @media(max-width: 767px) {
            &.mobile {
                display: block;
            } 
            &.desktop {
                display: none;
            }
        }
    }
    a {
        background-color: ${({ theme }) => '#956AFB'};
        border: none !important;
        max-width: 100%;
        color: ${({ theme }) => '#39474F'};

        &:hover {
            color: ${({ theme }) => '#39474F'};
            filter: brightness(0.9)
        }
    }
    @media(max-width: 1440px) {
        width: 40%;
    }
    @media(max-width: 1024px) {
        width: 45%;
    }
    @media(max-width: 767px) {
        width: 100%;
        box-shadow: none;
    }
`;
