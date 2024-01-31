import styled from 'styled-components';

export const ContainerTicketMapMobile = styled.div`
    width: 100vw;
    padding-top: ${({ theme }) => theme.spacing(4)};
    padding-bottom: ${({ theme }) => theme.spacing(5)};
    background-color: ${({ theme }) => "#F2F2F2"};

    @media(max-width: 767px) {
        background-color: transparent;
        width: 100%;
        padding-top: 0px;
    }

    div.select-sector {
        width: 100%;
        display: flex;
        flex-direction: column;
        @media(max-width: 767px) {
            > h5.title {
                display: none;
            }
        }
        div.actions {
            margin-top: ${({ theme }) => theme.spacing(3)};
            display: flex;
            gap: ${({ theme }) => theme.spacing(3)};
            @media(max-width: 1440px) {
                flex-direction: column;
            }
            @media(max-width: 767px) {
                margin-top: 0px;
            }
        }
    }
    @media(max-width: 767px) {
        > div.content {
            margin-top: 0px;
            margin-bottom: 0px;
        }
    }
`;
