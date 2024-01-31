import styled from "styled-components";

export const ContainerTicket = styled.div`
    div.header-ticket {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: ${({ theme }) => theme.spacing(0.5)};
        padding: ${({ theme }) => theme.spacing(1)};
        background-color: ${({ theme }) => "#F2F2F2"};
        border-radius: 4px;
        margin-bottom: ${({ theme }) => theme.spacing(2)};
        button {
            width: 50%;
            max-width: 171px;
            min-width: 120px;
            padding-left: 0px;
            padding-right: 0px;
            min-height: fit-content !important;
            font-size: ${({ theme }) => ".875rem"};
            @media(max-width: 1024px) {
                font-size: ${({ theme }) => ".75rem"};
            }
        }
        div.date {
            width: fit-content;
            display: flex;
            align-items: center;
            gap: 4px;
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
                    font-size: ${({ theme }) => "1.25rem"};
                    @media(max-width: 1024px) {
                        font-size: ${({ theme }) =>
                          "1.125rem"
                    }
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
    }
    @media(max-width: 767px) {
        div.card-ticket:last-child {
            border-bottom: none;
        }
    }
`;
