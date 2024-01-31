import styled from 'styled-components';

export const ContainerChairs = styled.div`
    display: flex;
    min-width: 100%;
    justify-content: center;

    > h6.title {
        display: flex;
        align-items: center;
        padding: 0px ${({ theme }) => theme.spacing(1)};
    }

    ul {
        display: flex;
        gap: 4px;
        padding: 4px 8px;
    }
`;

export const Circle = styled.li<{
    hover: number;
    quantity: number;
    wheelChair: boolean;
    excluded: boolean;
}>`
    width: ${({ theme }) => theme.spacing(3)};
    height: ${({ theme }) => theme.spacing(3)};
    
    &.wheelChair {
        background-color: #CB97FE;
    }
    /* background-color: ${({ theme }) => "#19D26E"}; */
    background-color: ${({ excluded }) => (excluded ? '#BDBFC2' : '#19D26E')};
    border-radius: 50%;
    cursor: ${({ excluded }) => (excluded ? 'not-allowed' : 'pointer')};

    @media(max-width: 1440px) {
        width: ${({ theme }) => theme.spacing(2.25)};
        height: ${({ theme }) => theme.spacing(2.25)};
    }
    @media(max-width: 1024px) {
        width: ${({ theme }) => theme.spacing(2)};
        height: ${({ theme }) => theme.spacing(2)};
    }

    /* &.excluded {
        background-color: ${({ theme }) => "#C61010"};
        cursor: not-allowed;
    } */
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
            left: 0;
            top: 0;
            display: ${({ wheelChair }) => (wheelChair ? 'none' : 'flex')};
            align-items: center;
            justify-content: center;
            text-align: center;
            color: ${({ theme }) => '#39474F'};
            @media(max-width: 1024px) {
                font-size: 10px;
            }
        }
    }

    &.seleted {
        background-color: ${({ theme }) => "#53AFED"}
    }
    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center
    }
`;
