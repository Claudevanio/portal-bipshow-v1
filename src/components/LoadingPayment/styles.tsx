import styled from 'styled-components';

export const ContainerLoadingPayment = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    min-height: 600px;
    background-color: ${({ theme }) => "#00000059"};
    top: 0px;
    left: 0px;
    z-index: 10000000;
    display: flex;
    align-items: center;
    justify-content: center;
    .spinner {
        width: 56px;
        height: 56px;
        display: grid;
        border: 4.5px solid #0000;
        border-radius: 50%;
        border-color: ${({ theme }) =>  "#39474F"};
        animation: spinner-e04l1k 1s infinite linear;
    }

    .spinner::before,
    .spinner::after {
        content: "";
        grid-area: 1/1;
        margin: 2.2px;
        border: inherit;
        border-radius: 50%;
    }

    .spinner::before {
        border-color: ${({ theme }) => '#8779F8'} #0000;
        animation: inherit;
        animation-duration: 0.5s;
        animation-direction: reverse;
    }

    .spinner::after {
        margin: 8.9px;
    }

    @keyframes spinner-e04l1k {
        100% {
            transform: rotate(1turn);
        }
    }
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    p { 
        font-size: ${({ theme }) => "#1.25rem"};
        font-weight: 500;
        text-align: center;
        @media(max-width: ${({ theme }) => theme.breakpoints.mobile}) {
            font-size: ${({ theme }) => "1rem"};
        }
    }
    opacity: 1;
    &.disable {
        transition: 400ms;
        opacity: 0;
        z-index: -1;
    }
`;
