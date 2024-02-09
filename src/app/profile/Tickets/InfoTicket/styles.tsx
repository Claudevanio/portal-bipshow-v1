import styled from 'styled-components';

export const ContainerInfoTicket = styled.div`
    button.back {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(1)};
    }
    div.header {
        margin-top: ${({ theme }) => theme.spacing(2.5)};
        width: 100%;
        div.date {
            svg {
                margin-right: 4px;
            }
            margin-top: ${({ theme }) => theme.spacing(2)};
            display: flex;
            gap: 4px;
            align-items: center;
            p.text-dark {
                font-weight: 700;
                font-size: ${({ theme }) => '16px'} !important;
            }
            p.text-light {
                font-weight: 500;
                font-size: ${({ theme }) => '16px'} !important;
                color: ${({ theme }) => '#39474F'} !important
            }
        }
        div.address {
            margin-top: ${({ theme }) => theme.spacing(1)};
            display: flex;
            align-items: center;
            gap: 8px;
            p.text-light { 
                padding-top: 4px;
                font-size: ${({ theme }) => '16px'} !important;
                font-weight: 400 !important;
            }
        }
    }
`;

export const Image = styled.div<{
    image: string;
}>`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 7.92%, rgba(0, 0, 0, 0) 38.61%), url(${({ image }) => image}) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 140px;
    border-radius: ${({ theme }) => theme.spacing(2)};
    margin-top: ${({ theme }) => theme.spacing(2)};
`;
