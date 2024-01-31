import styled from "styled-components";

export const ContainerLogin = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  div.body-login-full {
    margin-top: calc(
      ${({ theme }) => theme.spacing(4)} + ${({ theme }) => theme.spacing(8)}
    );
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      height: 100vh;
      background: white;
      position: absolute;
      top: 0;
      border-radius: .5rem;
      z-index: 5;
      padding: 20px;
      background: white;
      height: 80vh;
    }

    display: flex;
    justify-content: center;
    border-radius: 40px 40px 40px 40px;
    z-index: 5;
    padding: 20px;
    width: 100%;
    background: white;
    @media (max-width: 768px) {
      background-color: transparent !important;
    }
    height: 100%;
    min-height: 620px;
  }

  div.body-before-login {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
    }

    div.text-password {
      font-size: 12px;
      color: #ababab;
      margin: 10px 0px 10px 0px;
    }

    .buttons {
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 0;
      width: 100%;
      .submit {
        width: 70%;
      }
    }
  }

  button.cadastro {
    width: 100%;
  }

  .text-pre-login {
    text-align: center;
    font-size: 15px;
    color: #324761;
    font-weight: 600;
    .prosseguir {
      font-weight: 400;
      font-size: 12px;
      white-space: nowrap;
      margin-top: 50px;
    }
  }

  .body-login form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 18rem;
    max-width: 18rem;
    margin: 0;
  }

  div.card2 {
    margin-top: 4%;
    margin-bottom: 8%;
    position: relative;
    padding: 0px !important;
    border-radius: .5rem !important;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
    background: white;
    overflow-y: auto;
    max-height: 87vh;

    @media (max-width: 768px) {
      background-color: transparent !important;
      box-shadow: none;
      max-height: 100vh;
    }

    .logo-pre-login {
      max-width: 50% !important;
    }

    p.title-login {
      font-size: 16px;
      text-align: center;
    }
    div.body-login {
      border-radius: .5rem;
      z-index: 5;
      padding: 20px;
      display: flex;
      flex-direction: column;
      background: white;
    @media (max-width: 768px) {
      background-color: transparent !important;
    }
    }
  }

  div.card {
    position: relative;
    padding: 0px !important;
    border-radius: .5rem !important;
    overflow-y: auto;
    max-height: 87vh;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 100vh;
    }

    div.pai {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .robo-login {
        position: absolute;
      }

      .logo-login {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        z-index: 4;
        max-width: 70%;
      }
    }

    p.title-login {
      font-size: 16px;
      text-align: center;
    }
  
    div.body-login {
      border-radius: .5rem;
      z-index: 5;
      padding: 20px;
      display: flex;
      flex-direction: column;
      background: white;
    @media (max-width: 768px) {
      background-color: transparent !important;
    }
    }
  }

  .error {
    color: ${({ theme }) => "#F65252"} !important;
  }

  p.text {
    width: 100%;
    font-size: ${({ theme }) => ".875rem"};
    
    font-style: normal;
    font-weight: 500;
    color: ${({ theme }) => "#E3E3E3"};
    padding: 3%;
  }

  label.text {
    font-size: ${({ theme }) => ".875rem"};
    
    font-style: normal;
    font-weight: 500;
    color: ${({ theme }) => "#E3E3E3"};
  }

  p.bold {
    font-weight: 800;
    color: #000 !important;
  }

  input.checkbox {
    transform: scale(2);
    margin-right: 5%;
    margin-left: 5%;
    padding: 3%;
  }

  display: flex;
  justify-content: center;
  div.stepper-one-btn {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
  }
  div.form-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    div.user-not-exists {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing(4)};
      div.avatar {
        display: flex;
        position: relative;
        width: fit-content;
        div.icon {
          position: absolute;
          right: -8px;
          bottom: 12px;
        }
      }
      div.infos {
        span.dark {
          color: ${({ theme }) => '#8779F8'};
        }
        h5.title {
          margin-bottom: ${({ theme }) => theme.spacing(4)};
        }
        margin-bottom: ${({ theme }) => theme.spacing(2)};
      }
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      div.avatar {
        margin-bottom: ${({ theme }) => theme.spacing(6)};
        &.disabled {
          margin-bottom: ${({ theme }) => theme.spacing(1)};
        }
      }
      div.photo-avatar-confirm {
        div.avatar {
          margin-bottom: ${({ theme }) => theme.spacing(0)};
        }
      }
      div.forgot-password {
        margin-top: ${({ theme }) => theme.spacing(1.75)};
      }
      div.info-user {
        margin-top: ${({ theme }) => theme.spacing(2)};
        margin-bottom: ${({ theme }) => theme.spacing(6)};
        text-align: center;
        p.text-dark {
          font-size: ${({ theme }) => "1rem"};
          font-weight: 700;
        }
        span.dark {
          font-weight: 400;
        }
      }
    }
  }
  a.home-back {
    position: absolute;
    z-index: 10;
    padding: ${({ theme }) => theme.spacing(1.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => "#FFFFFF"};
    border-radius: 50%;
    top: ${({ theme }) => theme.spacing(2)};
    left: ${({ theme }) => theme.spacing(2)};
    transition: 400ms;
    &:hover {
      transition: 400ms;
      filter: brightness(0.9);
    }
    @media (max-width: 767px) {
      top: ${({ theme }) => theme.spacing(3)};
    }
  }
  a {
    min-height: 50px !important;
  }
`;

export const ContainerButton = styled.div<{
  isStepper: number;
  userNotExist: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-direction: ${({ isStepper, userNotExist }) => {
    switch (isStepper) {
      case 0:
        return "row";
      case 1:
        return "row";
      case 2:
        return userNotExist ? "row" : "column";
      default:
        return "row";
    }
  }};
  gap: ${({ theme, isStepper }) => {
    switch (isStepper) {
      case 0:
        return theme.spacing(1);
      case 1:
        return theme.spacing(1);
      case 2:
        return theme.spacing(2);
      default:
        return theme.spacing(1);
    }
  }};
  height: 100%;
  button.back {
    background-color: ${({ theme }) => "#f6f6f6"};
    padding: ${({ theme }) => theme.spacing(1.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: fit-content;
    border: 1px solid ${({ theme }) => "#E3E3E3"};
    transition: 400ms;
    &:hover {
      transition: 400ms;
      background-color: ${({ theme }) => "#E3E3E3"};
    }
  }
  a {
    width: 100%;
    max-width: 100%;
    font-size: ${({ theme }) => "1rem"};
    padding-top: ${({ theme }) => theme.spacing(1.5)};
    padding-bottom: ${({ theme }) => theme.spacing(1.5)};
  }
`;




export const ContainerLoginV2 = styled.div`
`;
