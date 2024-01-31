import styled from 'styled-components';

export const ContainerHTMLMap = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
    background-color: ${'#ffffff00'};
    flex: 1;
    border-radius: 8px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    height: fit-content;
    min-width: 1000px;
    max-width: 1000px;
    * {
        color: #39474F;
    }

    @media(max-width: 767px) {
        box-shadow: none;
        min-width: unset;
    }
`;
