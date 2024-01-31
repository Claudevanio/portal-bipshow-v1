import styled from 'styled-components';
import { Button } from './interface';

export const ContainerButton = styled.button<{
    variant: Button
}>`
    width: ${({ variant }) => {
    switch (variant) {
      case 'medium':
        return '100%';
      case 'outline':
        return '100%';
      case 'small':
        return '100%';
      case 'outline-medium':
        return 'fit-content';
      default:
        return '100%';
    }
  }};
    text-align: center;
    padding: ${({ theme, variant }) => {
    switch (variant) {
      case 'medium':
        return `${theme.spacing(1.5)} 0px`;
      case 'outline':
        return `${theme.spacing(1.5)} 0px`;
      case 'small':
        return `${theme.spacing(1.5)} 0px`;
      case 'outline-medium':
        return `${theme.spacing(1)} ${theme.spacing(3)}`;
      case 'outline-text':
        return '0px';
      default:
        return theme.spacing(1.5);
    }
  }};
    background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'medium':
        return '#8779F8';
      case 'small':
        return '#8779F8';
      case 'outline':
        return 'transparent';
      case 'outline-medium':
        return 'transparent';
      case 'outline-text':
        return 'transparent';
      default:
        return '#8779F8';
    }
  }};
    border-radius: 32px;
    font-size: ${({ theme, variant }) => {
    switch (variant) {
      case 'medium':
        return "1rem";
      case 'outline':
        return "1rem";
      case 'small':
        return "1rem";
      case 'outline-medium':
        return "1rem";
      default:
        return "1rem";
    }
  }};
    font-weight: 400;
    color: ${({ theme, variant }) => {
    switch (variant) {
      case 'medium':
        return "#FFFFFF";
      case 'small':
        return "#FFFFFF";
      case 'outline':
        return '#8779F8';
      case 'outline-text':
        return '#8779F8';
      default:
        return '#8779F8';
    }
  }};
  gap: ${({ theme }) => theme.spacing(1)};
  border: ${({ theme, variant }) => {
    switch (variant) {
      case 'medium':
        return 'none';
      case 'small':
        return 'none';
      case 'outline':
        return `1px solid #bcbcbc`;
      case 'outline-medium':
        return `1px solid #bcbcbc`;
      case 'outline-text':
        return 'none';
      default:
        return 'none';
    }
  }};
    transition: 400ms;
    &:hover {
        transition: 400ms;
        filter: brightness(0.9);
        border: ${({ theme, variant }) => {
    switch (variant) {
      case 'medium':
        return 'none';
      case 'small':
        return 'none';
      case 'outline':
        return `1px solid ${'#8779F8'}`;
      case 'outline-medium':
        return `1px solid ${'#8779F8'}`;
      default:
        return 'none';
    }
  }};
    }
    &:disabled {
        background-color: ${({ theme }) => '#C1C9D2'};
    }
    max-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* div.spinner-border {
        height: ${({ theme }) => theme.spacing(3.5)};
        width: ${({ theme }) => theme.spacing(3.5)};
        @media(max-width: 1024px) {
            height: ${({ theme }) => theme.spacing(2.3)};
            width: ${({ theme }) => theme.spacing(2.3)};
        }
    } */
    @media(max-width: 1024px) {
        font-size: ${({ theme }) => "1rem"};
    }
    text-decoration: ${({ variant }) => variant === 'outline-text' && 'underline'};
    min-height: 50px;
`;
