import { Modal } from '@mui/material';
import styled from 'styled-components';
export const ContainerModalCancel = styled.div`
  p {
    text-align: center;
    text-indent: 2em;
    margin-bottom: 5%;
    color: #39474f;
  }

  .full-width {
    width: 100%;
  }

  .title2 {
    margin-top: ${({ theme }) => theme.spacing(3)};
    text-align: center;
  }

  div.text {
    margin-top: ${({ theme }) => theme.spacing(1)};
    * {
      font-size: ${({ theme }) => '14px'};
      font-weight: 400;
      text-align: center;
    }
  }

  div.modal-content {
    div.header {
      padding: ${({ theme }) => theme.spacing(3)};
      display: flex;
      justify-content: center;
      position: relative;
      border-bottom: 1px solid ${({ theme }) => '#8779F8'};
      button.close {
        position: absolute;
        top: ${({ theme }) => theme.spacing(2)};
        right: ${({ theme }) => theme.spacing(3)};
      }
    }
    div.body {
      padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(3)};
      text-align: center;
      div.btns {
        width: 100%;
        display: flex;
        margin-top: ${({ theme }) => theme.spacing(3)};
        gap: ${({ theme }) => theme.spacing(3)};
        margin-bottom: ${({ theme }) => theme.spacing(1)};
      }
    }
  }
`;
