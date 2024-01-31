import styled from 'styled-components';

export const ContainerButtonBack = styled.button`
    padding: ${({ theme }) => theme.spacing(1.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: fit-content;
    border: 1px solid ${({ theme }) => "#E3E3E3"};
    transition: 400ms;
    &:hover {
        transition: 400ms;
        background-color: ${({ theme }) => "#f6f6f6"};
    }
`;
