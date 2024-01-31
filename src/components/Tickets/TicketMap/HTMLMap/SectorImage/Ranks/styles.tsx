import styled from 'styled-components';

export const ContainerRanks = styled.div`
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing(1)};
    justify-content: space-between;
    padding: 0px ${({ theme }) => theme.spacing(5)};
    padding-top: ${({ theme }) => theme.spacing(5)};
    padding-bottom: ${({ theme }) => theme.spacing(2)};
    @media(max-width: 1024px) {
        padding-left: ${({ theme }) => theme.spacing(3)};
        padding-right: ${({ theme }) => theme.spacing(3)};
    }
    @media(max-width: 768px) {
        flex-direction: column;
        padding: 0px;
        padding-top: ${({ theme }) => theme.spacing(2)};
    }
    .react-transform-wrapper {
        width: 100% !important;
        margin-top: ${({ theme }) => theme.spacing(2)};
        .react-transform-component {
            width: 100% !important;
        }
    }
    div.tools {
        position: absolute;
        bottom: 6px !important;
        right: 45% !important;
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(1)};
        button {
            display: flex;
            align-items: center;

            &.active {
                svg {
                    path {
                        fill: ${({ theme }) => '#956AFB'};
                        fill-opacity: 1;
                    }
                }
            }
            &.disabled {
                svg {
                    path {
                        fill: ${({ theme }) => "rgba(0, 0, 0, 0.87)"};
                        fill-opacity: .25;
                    }
                }
            }
        }
        
        @media (max-width: 768px) {
            position: relative;
            width: 100%;
            justify-content: end;
            margin-left: 20%;
        }        
    }
    div.ranks {
        overflow-x: auto;
        flex: 1;
        min-width: 100%;
        width: fit-content;
        display: flex;
        align-items: center;
        @media(max-width: 768px) {
            flex-direction: column;
        }
        div.content-ranks {
            display: flex;
            justify-content: space-between;
            min-width: 100%;
            gap: ${({ theme }) => theme.spacing(1)};
            overflow-x: scroll;
            ::-webkit-scrollbar {
                height: 12px !important;
            }
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
                background: #888;
            }
            div.letters {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-top: 4px;
                padding-bottom: 4px;
                h6 {
                    width: ${({ theme }) => theme.spacing(3)};
                    height: ${({ theme }) => theme.spacing(3)};
                    @media(max-width: 1024px) {
                        width: ${({ theme }) => theme.spacing(2)};
                        height: ${({ theme }) => theme.spacing(2)};
                    }
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        > div {
            width: 100%;

            &.decreaseWidth {
                ul {
                    li {
                        width: ${({ theme }) => theme.spacing(2.5)} !important;
                        height: ${({ theme }) => theme.spacing(2.5)} !important;
                        @media(max-width: 1440px) {
                            width: ${({ theme }) => theme.spacing(2)} !important;
                            height: ${({ theme }) => theme.spacing(2)} !important;
                        }
                        @media(max-width: 1024px) {
                            width: ${({ theme }) => theme.spacing(1.7)} !important;
                            height: ${({ theme }) => theme.spacing(1.7)} !important;
                        }
                    }
                }
            }
        }
    }
    div.actions {
        width: 10%;
        div.legend {
            margin-top: 5px;
            display: flex;
            flex-direction: column; 
            align-items: start;
            gap: .5rem;
            
            @media(max-width: 768px) {
                flex-direction: row;
                align-items: center;
                border-bottom: 2px solid #F6F6F6;
                padding-bottom: 8px;

            }
            > div {
                display: flex;
                align-items: center;
                gap: 6px;
                div {
                    width: 1rem;
                    height: 1rem;
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
                    background-color: ${({ theme }) => "#BDBFC2"};
                }
            }
            div:nth-child(4) {
                div {
                    background-color: ${({ theme }) => "#CB97FE"};
                }
            }
            span {
                font-weight: 400;
                font-size: .8rem;

            }
        }
    }
`;
