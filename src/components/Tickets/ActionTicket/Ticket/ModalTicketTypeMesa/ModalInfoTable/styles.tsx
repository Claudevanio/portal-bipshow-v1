import styled from 'styled-components';

export const ContainerModalInfoTable = styled.div`
    header {
        padding: ${({ theme }) => theme.spacing(1.75)} 0px;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid ${({ theme }) => "#F2F2F2"};
    }
    div.content-chair {
        > button {
            display: flex;
            cursor: pointer;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(2.25)};
            border-bottom: 1px solid ${({ theme }) => "#F2F2F2"};
            > div {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                span {
                    color: ${({ theme }) => "rgba(0, 0, 0, 0.87)"} !important
                }
            }
            svg {
                path {
                    transition: 400ms;
                }
            }
            &:hover {
                svg {
                    path {
                        transition: 400ms;
                        fill: ${({ theme }) => '#956AFB'};
                    }
                }
            }
        }
    }
    div.btn {
        width: 100%;
        margin-top: ${({ theme }) => theme.spacing(2)};
        margin-bottom: ${({ theme }) => theme.spacing(2)};
        button {
            width: 100%;
        }
    }
    div.alert-info {
        padding: ${({ theme }) => theme.spacing(2)};
        background-color: ${({ theme }) => "#F2F2F2"};
    }
`;
