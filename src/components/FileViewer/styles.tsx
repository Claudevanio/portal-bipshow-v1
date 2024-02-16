import styled from 'styled-components';

export const ContainerFilewView = styled.div`

    width: 100%;
    margin-top: calc(${({ theme }) => theme.spacing(2)} + ${({ theme }) => theme.spacing(4)});

    display: block;
    
    max-height: 100%;
    overflow: hidden;

    .fab {
        position: 'fixed';
        margin-left: 2%;
    }

`;
