import styled from 'styled-components';

export const ContainerResetPassword = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  min-height: 1000px;
  padding-top: calc(${({ theme }) => theme.spacing(4)} + ${({ theme }) => theme.spacing(11)});
  a.back-home {
    position: absolute;
    top: ${({ theme }) => theme.spacing(2)};
    left: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(1.5)};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      transition: 400ms;
      filter: brightness(0.9);
    }
    @media (max-width: 767px) {
      top: ${({ theme }) => theme.spacing(3)};
    }
  }
  div.container {
    width: 90%;
    max-width: 375px;
    h4 {
      margin-bottom: ${({ theme }) => theme.spacing(2)};
    }
    div.card {
      width: 100%;
      padding: ${({ theme }) => theme.spacing(4)};
      border-radius: 8px;
      border: none;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
      margin-top: ${({ theme }) => theme.spacing(3)};

      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        background-color: transparent;
        box-shadow: none;
        padding: ${({ theme }) => theme.spacing(4)} 0;
      }
      div.success {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        h6 {
          margin-top: ${({ theme }) => theme.spacing(2)};
          margin-bottom: ${({ theme }) => theme.spacing(1)};
        }
        p {
          text-align: center;
        }
        a {
          max-width: 100%;
          margin-top: ${({ theme }) => theme.spacing(6)};
          padding: ${({ theme }) => theme.spacing(1.5)} 0 !important;
        }
      }
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        h6.title {
          font-weight: 500;
          margin-bottom: ${({ theme }) => theme.spacing(1)};
        }
        p.text-light {
          margin-bottom: ${({ theme }) => theme.spacing(4)};
        }
        div.submit {
          width: 100%;
          margin-top: ${({ theme }) => theme.spacing(6)};
        }
        div.help {
          width: 100%;
          margin-bottom: ${({ theme }) => theme.spacing(2)};
          ul {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: ${({ theme }) => theme.spacing(0.5)};
            li {
              p {
                display: flex;
                align-items: center;
                display: flex;
              }
            }
          }
        }
      }
    }
  }
`;
