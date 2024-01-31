import styled from 'styled-components';

export const ContainerHeader = styled.div`
    width: 100vw;
    height: 146px;
    padding-top: 1rem;
    div.content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media(max-width: 767px) {
            a.logo-image {
                display: none;
            }
        }
        button {
            color: ${({ theme }) => "#F65252"};
            min-height: fit-content;

            &:hover {
                border-color: ${({ theme }) => "#F65252"};
            }
            &.mobile {
                display: none;
            }
            @media(max-width: 767px) {
                &.mobile {
                    display: block;
                    min-height: fit-content;
                }
                padding: 0;
                width: ${({ theme }) => theme.spacing(4)};
                height: ${({ theme }) => theme.spacing(4)};
                &.desktop {
                    display: none;
                }
            }
        }
    }
    &.webview {
        div.content {
            justify-content: center;
        }
    }
`;

export const Image = styled.div<{
    image: string
}>`
    background: url(${({ image }) => image}) no-repeat center;
    background-size: cover;
    border-radius: 8px;
`;
