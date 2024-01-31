import styled from 'styled-components';

export const ContainerSectorImage = styled.div`
    width: 100%;
    text-align: center;
    position: relative;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    &#container-map-html {
        min-height: fit-content;

        img.img-mapper-img {
            position: relative !important;
            /* max-width: 800px; */
        }
    }

    #img-mapper {
        margin: 0 auto;
        width: 100% !important;
    }
    div.container-html-map {
        padding-bottom: ${({ theme }) => theme.spacing(8)};
        margin-top: ${({ theme }) => theme.spacing(4)};
        overflow: scroll;
        @media(max-width: 767px) {
            margin-top: 0px;
            padding-bottom: 0px;
        }
        img.image-mapa {
            border-radius: 8px;
            max-width: 100%;
            &.mobile {
                display: none;
            }
            @media(max-width: 767px) {
                &.mobile {
                    display: block;
                }
                &.desktop {
                    display: none;
                }
            }
        }
        div.tools {
            position: absolute;
            bottom: 6px !important;
            right: 40% !important;
            display: flex;
            align-items: center;
            gap: ${({ theme }) => theme.spacing(1)};
            @media(max-width: 767px) {
                display: none;
            }
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
        }
    }
    div.chairs {
        position: relative;
        width: 100%;
        > h6 {
            width: 100%;
            text-align: center;
            position: absolute;
            top: ${({ theme }) => theme.spacing(1)};
            color: ${({ theme }) => "rgba(0, 0, 0, 0.6)"};
            text-transform: uppercase;
        }
    }
    div.container-loading {
        display: flex;
        justify-content: center;
        align-items: center;
        div.spinner-border {
            width: ${({ theme }) => theme.spacing(6)};
            height: ${({ theme }) => theme.spacing(6)};
            border-left-color: ${({ theme }) => '#956AFB'};
            border-top-color: ${({ theme }) => '#956AFB'};
            border-bottom-color: ${({ theme }) => '#956AFB'};
        }
    }
`;
