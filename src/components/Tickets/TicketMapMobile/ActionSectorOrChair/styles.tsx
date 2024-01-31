import styled from 'styled-components';

export const ContainerActionSectorOrChair = styled.div`
    max-width: 375px;
    width: 100%;
    display: flex;
    padding: ${({ theme }) => theme.spacing(2)} 0;
    background-color: ${({ theme }) => '#39474F'};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    height: fit-content;

    @media(max-width: 1440px) {
        max-width: 100%;
    }
    @media(max-width: 767px) {
        box-shadow: none;
        order: 1;
    }
`;
