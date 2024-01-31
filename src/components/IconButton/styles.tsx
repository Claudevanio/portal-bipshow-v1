import styled from 'styled-components';

export const ContainerIconButton = styled.button`
    transition: 400ms;
    height: fit-content;
    padding: 6px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    &:hover {
        transition: 400ms;
        background-color: ${({ theme }) => '#F5F5F5'};
    }
`;
