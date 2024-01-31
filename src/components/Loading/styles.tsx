import styled from 'styled-components';

export const ContainerLoading = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    z-index: ${({ theme }) => theme.zIndex.OVERLAY};

    &.disable {
        transition: 400ms;
        opacity: 0;
        z-index: -1;
    }
`;
