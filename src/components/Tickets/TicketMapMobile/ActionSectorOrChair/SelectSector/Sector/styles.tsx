import styled from 'styled-components';

export const ContainerSector = styled.button`
    padding: ${({ theme }) => theme.spacing(2)} 0px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => "rgba(0, 0, 0, 0.87)"};
    div.info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        p.text-dark {
            color: #000000 !important;
            font-weight: 700;

            &.text-light {
                color: #000000 !important;
                font-weight: 400;
                font-size: ${({ theme }) => ".75rem"};
            }
        }
        p.text-light {
            font-size: ${({ theme }) => ".75rem"} !important;
        }
    }
    div.circle {
        transition: 400ms;
        width: ${({ theme }) => theme.spacing(3)};
        height: ${({ theme }) => theme.spacing(3)};
        border: 2px solid ${({ theme }) => "rgba(0, 0, 0, 0.6)"};
        border-radius: 50%;
    }
    &:hover, &.active {
        div.circle {
            box-sizing: border-box;
            border: 10px solid ${({ theme }) => '#956AFB'};
            transition: 400ms;
        }
    }
`;
