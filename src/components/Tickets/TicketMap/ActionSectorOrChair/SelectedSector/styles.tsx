import styled from 'styled-components';

export const ContainerSelectedSector = styled.div`
    width: 100%;
    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px ${({ theme }) => theme.spacing(2)};
        border-bottom: 1px solid ${({ theme }) => "rgba(0, 0, 0, 0.87)"};
        padding-bottom: ${({ theme }) => theme.spacing(2)};
        button {
            width: fit-content;
            min-height: fit-content !important;
            min-width: 140px;
            padding: ${({ theme }) => theme.spacing(0.75)} 0px;
        }
    }
    div.sector-selected {
        min-height: 160px;
        div.empty {
            height: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
            p {
                max-width: 202px;
                line-height: ${({ theme }) => "20px"} !important;
                font-size: ${({ theme }) => "1rem"};
                text-align: center;
            }
        }
    }
    div.not-empty {
        padding: 0px ${({ theme }) => theme.spacing(2)};
        ul {
            margin-bottom: ${({ theme }) => theme.spacing(4)};
            width: 100%;
            display: flex;
            flex-direction: column;
            li {
                display: flex;
                width: 100%;
                justify-content: space-between;
                padding: ${({ theme }) => theme.spacing(2)} 0px;
                border-bottom: 1px solid ${({ theme }) => "rgba(0, 0, 0, 0.87)"};

                > div {
                    display: flex;
                    flex-direction: column;
                    h6 {
                        font-size: ${({ theme }) => ".875rem"};
                        color: #000000 !important;
                        font-weight: 700;
                    }
                    span {
                        font-size: ${({ theme }) => ".75rem"} !important;
                        font-weight: 400 !important;
                        color: #000000 !important
                    }
                }
            }
        }
    }
    div.infos-selected {
        margin-top: auto;
        padding: ${({ theme }) => theme.spacing(2)};
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(2)};
        > div {
            width: 100%;
            display: flex;
            justify-content: space-between;
            span {
                font-size: ${({ theme }) => ".875rem"};
            }
            span.light {
                color: ${({ theme }) => "rgba(0, 0, 0, 0.87)"}
            }
        }
    }
`;
