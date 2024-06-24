import styled from 'styled-components';

export const ContainerPaymentPIX = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 40%;
  @media (max-width: 767px) {
    width: 100%;
    height: 100%;
  }
  overflow: auto;
  div.close {
    position: absolute;
    top: ${({ theme }) => theme.spacing(2)};
    right: ${({ theme }) => theme.spacing(2)};
  }
  position: relative;
  div.header {
    padding: ${({ theme }) => theme.spacing(3)};
    display: flex;
    justify-content: center;
    border-bottom: 2px solid ${({ theme }) => '#8779F8'};
  }
  div.body {
    padding: ${({ theme }) => theme.spacing(3)};
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: ${({ theme }) => '14px'};

      font-weight: 500;
      text-align: center;
      color: ${({ theme }) => '#bcbcbc'};
      &.info {
        max-width: 400px;
      }
    }
    h6 {
      margin-top: ${({ theme }) => theme.spacing(3)};
    }
    div.qrcode {
      margin-top: ${({ theme }) => theme.spacing(2)};
      img {
        max-width: 300px;
        object-fit: cover;
        margin-top: ${({ theme }) => theme.spacing(2)};
      }
    }
    div.copy-paste {
      margin-top: ${({ theme }) => theme.spacing(2)};
      width: 100%;
      div.copy {
        margin-top: ${({ theme }) => theme.spacing(2)};
        width: 100%;
        padding: 0px;
        textarea {
          width: 100%;
          padding: ${({ theme }) => theme.spacing(1)};
          font-size: ${({ theme }) => '14px'};
          color: ${({ theme }) => '#bcbcbc'};
          border: none;
          height: fit-content;
          resize: none;
          &:focus {
            outline: none;
            box-shadow: none;
          }
        }
      }
    }
  }
  div.copy {
    margin-top: auto;
    padding: ${({ theme }) => theme.spacing(3)};
    padding-top: 0px;
  }
`;
