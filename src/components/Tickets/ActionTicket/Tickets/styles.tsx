import styled from 'styled-components';

export const ContainerTickets = styled.ul`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};
    li:last-child {
        border-bottom: none;
    }   
`;
