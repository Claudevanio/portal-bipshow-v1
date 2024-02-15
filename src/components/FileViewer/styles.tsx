import styled from 'styled-components';

export const ContainerFilewView = styled.div`

    width: 100%;
    margin-top: calc(${({ theme }) => theme.spacing(2)} + ${({ theme }) => theme.spacing(4)});

    display: block;
    
    height: 100vh;

    .fab {
        position: 'fixed';
        margin-left: 2%;
    }

`;
