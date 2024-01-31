import styled from 'styled-components';

export const ContainerRanksOffcanvas = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: ${({ theme }) => theme.spacing(3)}; 
    position: relative;
    header {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: ${({ theme }) => theme.spacing(2.25)} ${({ theme }) => theme.spacing(2)};
        border-bottom: 1px solid ${({ theme }) => "#F2F2F2"};
        position: relative;
        button {
            position: absolute;
            left: ${({ theme }) => theme.spacing(2)};
            bottom: ${({ theme }) => theme.spacing(1.25)};
        }
    }
    div.footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(1)};
        div.actions {
            padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(2)};
            width: fit-content;
            div.legend {
                display: flex;
                align-items: center;
                gap: ${({ theme }) => theme.spacing(2)};
                > div {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    div {
                        width: ${({ theme }) => theme.spacing(3)};
                        height: ${({ theme }) => theme.spacing(3)};
                        border-radius: 50%;
                    }
                }
                div:nth-child(1) {
                    div {
                        background-color: ${({ theme }) => "#19D26E"};
                    }
                }
                div:nth-child(2) {
                    div {
                        background-color: ${({ theme }) => "#53AFED"};
                    }
                }
                div:nth-child(3) {
                    div {
                        background-color: ${({ theme }) => "#E8E8E8"};
                    }
                }
                span {
                    font-size: ${({ theme }) => "1rem"};
                    font-family: ${({ theme }) => "inherit"};
                    font-weight: 500;
                    color: ${({ theme }) => "rgba(0, 0, 0, 0.6)"}
                }
            }
        }
        div.info-purchase {
            bottom: 0;
            padding: ${({ theme }) => theme.spacing(2)};
            width: 100%;
            display: flex;
            justify-content: space-between;
            background-color: ${({ theme }) => '#39474F'};
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
            > div {
                display: flex;
                flex-direction: column;
                span {
                    color: ${({ theme }) => "rgba(0, 0, 0, 0.87)"} !important
                }
            }
            button {
                max-width: 40%;
                min-width: 158px;
            }
        }
    }
`;
