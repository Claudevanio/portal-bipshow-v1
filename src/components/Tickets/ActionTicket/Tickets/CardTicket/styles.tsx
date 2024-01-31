import styled from 'styled-components';

export const ContainerCardTicket = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: ${({ theme }) => theme.spacing(1)};
    border-bottom: 1px solid ${({ theme }) => "rgba(0, 0, 0, 0.87)"};
    cursor: pointer;

    div.date {
        max-width: 150px;
        min-width: 150px;
        min-height: 84px;
        max-height: 84px;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: ${({ theme }) => theme.spacing(2)};
        border: 2px solid ${({ theme }) => "#F2F2F2"};
        border-radius: 8px;
        h6 {
            font-size: ${({ theme }) => "1.75rem"};
            font-family: ${({ theme }) => "inherit"};
            font-weight: 700;
            color ${({ theme }) => "#049985"};
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

            &.two {
                white-space: normal;
                font-size: ${({ theme }) => "1.25rem"};
            }
        }
        div.month {
            display: flex;
            flex-direction: column;
            span {
                font-size: ${({ theme }) => ".75rem"};
                font-family: ${({ theme }) => "inherit"};
                font-weight: 400;
                line-height: 100%;
                text-transform: capitalize;
                color: ${({ theme }) => "rgba(0, 0, 0, 0.87)"}
            }
            span.month {
                font-weight: 700;
                color: ${({ theme }) => "#049985"};
            }
        }
    }
    div.price {
        margin-left: ${({ theme }) => theme.spacing(2.125)};
    }

    div.icon {
        display: flex;
        justify-content: flex-end;
        margin-left: auto;
        position: relative;

        svg {
            transition: 400ms;
            right: 32px;
        }
    }

    &:hover {
        div.icon {
            svg {
                transition: 400ms;
                transform: scale(1.5);
                path {
                    fill:  ${({ theme }) => '#956AFB'};
                    fill-opacity: 1;
                }
            }
    }
    }
`;
