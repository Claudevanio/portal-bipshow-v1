import styled from 'styled-components';
import { Status } from './interface';

export const ContainerStauts = styled.div<{
    type: Status
}>`
    width: 100%;
    max-width: 180px;
    text-align: center;
    padding: 2px 10px;
    border: 1px solid;
    border-radius: 4px;

    border-color: ${({ type, theme }) => {
    switch (type) {
      case 'warning':
        return 'rgba(255, 173, 13, 0.30)';
      default:
        return 'rgba(255, 173, 13, 0.30)';
    }
  }};
  p {
    color: ${({ type, theme }) => {
    switch (type) {
      case 'warning':
        return 'rgba(255, 173, 13, 1)';
      default:
        return 'rgba(255, 173, 13, 1)';
    }
  }} !important;
  };
  background-color: ${({ theme, type }) => {
    switch (type) {
      case 'warning':
        return 'rgba(255, 173, 13, 0.05)';
      default:
        return 'rgba(255, 173, 13, 0.05)';
    }
  }};
`;
