import styled from 'styled-components';

export const ContainerSectorImage = styled.div`
    width: 100%;
    text-align: center;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    &#container-map-html {
        min-height: 300px;
        max-width: 100%;
        overflow: scroll;
    }
    img.img-mapper-img {
        position: relative !important;
        /* max-width: 800px; */
    } 
    #img-mapper {
        margin: 0 auto;
        width: fit-content !important;
    }
    div.container-html-map {
        padding-bottom: ${({ theme }) => theme.spacing(8)};
        margin-top: ${({ theme }) => theme.spacing(4)};
        overflow: scroll;
        img.img-locale {
            max-width: 800px;
        }
        div.mobile {
            display: none;
        }
        @media(max-width: 1024px) {
            div.desktop {
                display: none;
            }
            div.mobile {
                display: block;
            }
        }
        @media(max-width: 767px) {
            margin-top: 0px;
            padding-bottom: 0px;
        }
        img.image-mapa {
            border-radius: 50%;
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
            display: flex;
            align-items: center;
            gap: ${({ theme }) => theme.spacing(1)};
            bottom: 6px !important;
            right: 40% !important;
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
    div.carousel.slide {
        width: 100%;

        a.carousel-control-next {
            position: absolute;
            width: ${({ theme }) => theme.spacing(5)};
            height: ${({ theme }) => theme.spacing(5)};
            top: 0px;
            right: ${({ theme }) => theme.spacing(4)};
            opacity: 1;
            border-radius: 50%;
            transition: 400ms;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                transition: 400ms;
                background-color: ${({ theme }) => "#DFE1E2"} !important;
            }
            span {
                background: url('/assets/Arrow.svg');
                transform: rotate(90deg);
            }
            @media(max-width: 1024px) {
                right: ${({ theme }) => theme.spacing(2)};
            }
        }
        a.carousel-control-prev {
            position: absolute;
            width: ${({ theme }) => theme.spacing(5)};
            height: ${({ theme }) => theme.spacing(5)};
            top: 0px;
            left: ${({ theme }) => theme.spacing(4)};;
            opacity: 1;
            border-radius: 50%;
            transition: 400ms;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                transition: 400ms;
                background-color: ${({ theme }) => "#DFE1E2"} !important;
            }
            span {
                background: url('/assets/Arrow.svg');
                transform: rotate(-90deg);
            }
            @media(max-width: 1024px) {
                left: ${({ theme }) => theme.spacing(2)};
            }
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
