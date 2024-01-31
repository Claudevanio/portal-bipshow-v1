import { IAlert } from '@/types';
import styled from 'styled-components';

export const ContainerAlert = styled.div<{
    variant: IAlert
}>`
    width: 100%;
    padding: ${({ theme }) => theme.spacing(2)};
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    div.header-alert {
        width: fit-content;
        display: flex;
        gap: ${({ theme }) => theme.spacing(2)}
    }
    div.text-alert {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(1)};
        h6 {
            color: ${({ variant, theme }) => {
    switch (variant) {
      case IAlert.WARNING:
        return '#FFAD0D';
        break;
      case IAlert.ERROR:
        return "#F65252";
      default:
        return '#FFAD0D';
    }
  }}
        }
        p {
            color: ${({ variant, theme }) => {
    switch (variant) {
      case IAlert.WARNING:
        return `${"#00000099"} !important`;
        break;
      case IAlert.ERROR:
        return `${"#00000099"} !important`;
      default:
        return '#00000099';
    }
  }}
        }
    }
    background-color: ${({ variant, theme }) => {
    switch (variant) {
      case IAlert.WARNING:
        return 'rgba(255, 173, 13, 0.11)';
        break;
      case IAlert.ERROR:
        return "#F65252";
      default:
        return 'rgba(255, 173, 13, 0.11)';
    }
  }};
  border-radius: 16px;
`;
