import styled from 'styled-components';

export const ContainerChairs = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    > h6.title {
        display: flex;
        align-items: center;
        padding: 0px ${({ theme }) => theme.spacing(1)};
        @media(max-width: 767px) {
            font-size: ${({ theme }) => ".875rem"};
            padding: 0px ${({ theme }) => theme.spacing(0.5)};
        }
    }

    ul {
        display: flex;
        gap: 4px;
        padding: 4px 8px;
        height: fit-content;
        @media(max-width: 520px) {
            gap: 1px
        }
    }
`;

export const Circle = styled.li<{
    hover: number;
    quantity: number;
    wheelChair: boolean;
    isMaxChair: number;
}>`
    width: ${({ theme }) => theme.spacing(3)};
    height: ${({ theme }) => theme.spacing(3)};
    background-color: ${({ theme }) => "#19D26E"};
    border-radius: 4px;
    cursor: pointer;

    @media(max-width: 1440px) {
        width: ${({ theme }) => theme.spacing(2.25)};
        height: ${({ theme }) => theme.spacing(2.25)};
    }
    @media(max-width: 1024px) {
        width: ${({ theme }) => theme.spacing(1.25)};
        height: ${({ theme }) => theme.spacing(1.25)};
    }
    @media(max-width: 400px) {
        width: ${({ theme }) => theme.spacing(1.25)};
        height: ${({ theme }) => theme.spacing(1.25)};
    } 

    &.excluded {
        background-color: ${({ theme }) => "#C61010"};
    }
    position: relative;

    &:hover {
        &::before {
            content: ${({ hover }) => `"${hover}"`};
            font-weight: 600;
            font-family: ${({ theme }) => "inherit"};
            display: block;
            font-size: ${({ theme }) => ".75rem"};
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: ${({ theme }) => '#39474F'};
            @media(max-width: 1024px) {
                font-size: 8px;
                @media(max-width: 400px) {
                    font-size: 6px
                }
            }
        }
    }

    &.seleted {
        background-color: ${({ theme }) => "#53AFED"}
    }
    svg {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center
    }
`;
