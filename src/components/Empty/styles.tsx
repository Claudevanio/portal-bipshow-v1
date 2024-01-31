import styled from 'styled-components';

export const ContainerEmpty = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    h5 {
        text-transform: uppercase !important;
        font-weight: 800 !important;
        color: ${({ theme }) => "#E3E3E3"} !important;
        text-align: center;
    }
`;
