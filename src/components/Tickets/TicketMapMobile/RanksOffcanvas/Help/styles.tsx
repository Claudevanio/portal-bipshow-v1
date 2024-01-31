import styled from 'styled-components';

export const ContainerHelp = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: ${({ theme }) => theme.zIndex.OVERLAY};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    top: 0;

    p {
        font-size: ${({ theme }) => "1rem"};
        font-family: ${({ theme }) => "inherit"};
        font-weight: 700;
        color: ${({ theme }) => '#39474F'};
        max-width: 293px;
        text-align: center;
    }
    button {
        max-width: 182px;
    }
`;
