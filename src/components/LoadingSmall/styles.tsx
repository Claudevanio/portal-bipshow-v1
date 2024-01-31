import styled from 'styled-components';

export const ContainerLoadingSmall = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    div.content-loading {
        position: relative;

        img {
            position: absolute;
            max-width: 32px;
            top: 16px;
            left: 17px;
        }
    }
    .loader {
        width: ${({ theme }) => theme.spacing(8)};        /* the size */
        padding: 6px;       /* the border thickness */
        background: #6846bf; /* the color */
        
        aspect-ratio: 1;
        border-radius: 50%;
        --_m: 
            conic-gradient(#0000,#000),
            linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
                mask: var(--_m);
        -webkit-mask-composite: source-out;
                mask-composite: subtract;
        box-sizing: border-box;
        animation: load 1s linear infinite;
    }

    @keyframes load {
        to{transform: rotate(1turn)}
    }
`;
