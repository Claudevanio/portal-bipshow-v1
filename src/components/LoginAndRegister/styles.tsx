import styled from "styled-components";

export const ContainerLoginAndRegister = styled.div`
  height: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 100vh;
    min-height: auto;
    height: fit-content;
  }

  div.container-form {
    height: 100%;
    width: 100%;
    /* overflow: hidden; */
    padding-top: 2rem;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding-top: calc(
        ${({ theme }) => theme.spacing(7)} + ${({ theme }) => theme.spacing(6)}
      );
      height: fit-content;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      padding-top: calc(
        ${({ theme }) => theme.spacing(7)} + ${({ theme }) => theme.spacing(6)}
      );
      height: fit-content;
    }
  }

  div.container {
    width: 90%;
    max-width: 375px;
    background-color: white;
    padding: 0;
    
    @media (max-width: 768px) {
      background-color: transparent !important;
    }

    h4.title {
      font-size: ${({ theme }) => "#1.25rem"};
      margin-bottom: ${({ theme }) => theme.spacing(2)};
    }
    div.card {
      width: 100%;
      padding: ${({ theme }) => theme.spacing(4)};
      border-radius: 8px;
      border: none;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
      margin-top: ${({ theme }) => theme.spacing(3)};
      form {
        h6.title {
          font-size: ${({ theme }) => "#1.25rem"};
          font-weight: 500;
          margin-bottom: ${({ theme }) => theme.spacing(4)};
        }
      }
    }
  }
`;
