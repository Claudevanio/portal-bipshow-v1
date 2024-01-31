import styled from 'styled-components';

export const ContainerRanks = styled.div`
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
    justify-content: space-between;
    padding: 0px ${({ theme }) => theme.spacing(2)};
    padding-top: ${({ theme }) => theme.spacing(5)};
    padding-bottom: ${({ theme }) => theme.spacing(3)};
    .react-transform-wrapper {
        width: 100% !important;
        margin-top: ${({ theme }) => theme.spacing(2)};
        .react-transform-component {
            width: 100% !important;
        }
    }
    @media(max-width: 520px) {
        padding-left: ${({ theme }) => theme.spacing(1)};
        padding-right: ${({ theme }) => theme.spacing(1)};
    }
    div.ranks {
        overflow-x: auto;
        flex: 1;
        min-width: 100%;
        width: fit-content;
        display: flex;
        align-items: center;
        @media(max-width: 1024px) {
            padding-bottom: ${({ theme }) => theme.spacing(3)};
        }
        > div {
            width: 100%;

            &.decreaseWidth {
                width: fit-content;
                ul {
                    li {
                        /* width: ${({ theme }) => theme.spacing(2.5)} !important;
                        height: ${({ theme }) => theme.spacing(2.5)} !important;
                        @media(max-width: 1440px) {
                            width: ${({ theme }) => theme.spacing(2)} !important;
                            height: ${({ theme }) => theme.spacing(2)} !important;
                        }
                        @media(max-width: 1024px) {
                            width: ${({ theme }) => theme.spacing(1.7)} !important;
                            height: ${({ theme }) => theme.spacing(1.7)} !important;
                        }
                        @media(max-width: 400px) {
                            width: ${({ theme }) => theme.spacing(1.25)} !important;
                            height: ${({ theme }) => theme.spacing(1.25)} !important;
                        } */
                    }
                }
            }
        }
    }
`;
