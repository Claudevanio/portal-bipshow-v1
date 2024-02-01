import styled from 'styled-components';

export const ContainerCardBanner = styled.button`
    max-height: 420px;
    /* height: 100%; */
    height: fit-content;
    /* border: 1px solid; */
    /* border-radius: 16px; */
    /* @media(max-width: 1440px) {
        height: calc(380px);
    }
    @media(max-width: 1024px) {
        height: calc(320px);
    } */
    h2 {
        text-align: left;
    }
    p {
        text-align: left;
    };
`;

export const Image = styled.img`
    width: 100%;
    /* height: 300px; */
    /* border-radius: 16px; */
    /* object-fit: contain; */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* border-radius: 16px; */
`;

export const ImageContainer = styled.div<{
    image: string
}>`
    width: 100%;
    height: 100%;
    /* border-radius:16px; */
    display: flex;
    overflow: hidden;
`;

export const ImageCarroselBackground = styled.div<{
    image: string
}>`
    background: ${({ image }) => `url(${image})`} no-repeat center;
    background-size: contain;
    display: none;
    width: 100%;
    height: 100%;
    /* border-radius:16px; */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;