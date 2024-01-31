import styled from 'styled-components';
import { Avatar } from './interface';

export const ContainerAvatar = styled.div<{
    variant: Avatar
}>`
  display: flex;
  align-items: center;
  
  > span {
    border-radius: 50%;
  }
  width: ${({ variant, theme }) => {
    switch (variant) {
      case 'small':
        return theme.spacing(4);
      case 'small-two':
        return theme.spacing(5.125);
      case 'medium':
        return theme.spacing(7);
      case 'large':
        return theme.spacing(17.5);
      default:
        return theme.spacing(4);
    }
  }};
    height: ${({ variant, theme }) => {
    switch (variant) {
      case 'small':
        return theme.spacing(4);
      case 'small-two':
        return theme.spacing(5.125);
      case 'medium':
        return theme.spacing(7);
      case 'large':
        return theme.spacing(17.5);
      default:
        return theme.spacing(4);
    }
  }};
    background-color: ${({ theme }) => 'rgba(193, 201, 210, 0.15)'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
        width: 60%;
        height: 60%;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;
