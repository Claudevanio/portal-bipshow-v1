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
    color: ${({ theme }) => '#39474F'} !important;
    text-align: center;
  }
`;
