import styled from "styled-components";

export const ContainerForgotPassword = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;

  .text {
    font-weight: 600;
  }

  .text-input {
    font-size: 14px;
    font-weight: 500;
  }

  .email {
    label {
      width: 0px;
    }
  }

  .input-cpf {
    margin: 20px 0;
    label {
      width: 0px;
    }
  }


  .icon {
    color: #8779F8;
  }

  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    padding-left: 4px;
    padding-right: 4px;
    height: 50px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    .box-text {
      display: flex;
      flex-direction: column;

      .telefone-title {
        font-size: 12px;
        font-weight: 700;
      }

      .telefone {
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  .redefinicao-body {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .body-box {
    margin-top: 30px;
  }

  .body-button {
    width: 100%;
    display: flex;
    margin-top: 24px;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    /* .submit {
      width: 90%;
      margin-left: 20px;
    } */
  }
  h6 {
    font-size: ${({ theme }) => "1rem"} !important;
    font-weight: 500;
    margin-bottom: 50px;
    width: 70%;
    strong {
      font-weight: 700;
    }
  }
  p {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;
