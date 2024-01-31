import styled from "styled-components";

export const ContainerInput = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing(1.25)}
    ${({ theme }) => theme.spacing(2)};
  padding-bottom: 2px;
  background-color: ${({ theme }) => "#f6f6f6"};
  border-radius: 8px 8px 0px 0px;
  border-bottom: 2px solid ${({ theme }) => "#E3E3E3"};
  display: flex;
  height: 56px;
  transition: 400ms;
  margin: ${({ theme }) => theme.spacing(1.5)} 0;
  width: 100%;
  &.active {
    transition: 400ms;
    border-color: ${({ theme }) => '#8779F8'};
  }
  label {
    width: 110px;
    white-space: nowrap;
    position: absolute;
    font-size: ${({ theme }) => ".75rem"};
    font-weight: 400;
    top: ${({ theme }) => theme.spacing(0.75)};
    left: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => '#C1C9D2'};
    transition: 400ms;
    &.active {
      color: ${({ theme }) => '#C1C9D2'};
      transition: 400ms;
      transform: scale(1.25);
      top: ${({ theme }) => theme.spacing(2.5)};
      left: ${({ theme }) => theme.spacing(3.5)};
    }
    &.activeLabel {
      color: ${({ theme }) => '#8779F8'};
    }
  }
  input {
    position: relative;
    z-index: 3;
    background: transparent;
    width: 100%;
    border: none;
    font-size: ${({ theme }) => "1rem"};
    font-weight: 400;
    color: ${({ theme }) => "#39474F"};
    margin-bottom: -2px;
    &:focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  }
  button.clean {
    margin-top: -8px;
  }
  &.disabled {
    background-color: ${({ theme }) => "#E3E3E3"};
  }
  &.error {
    border-color: ${({ theme }) => "#F65252"};
    label {
      color: ${({ theme }) => "#F65252"};
    }
    p.text-dark {
      position: absolute;
      bottom: -20px;
      color: ${({ theme }) => "#F65252"} !important;
    }
  }
  p.text-dark {
    font-size: ${({ theme }) => ".75rem"};
  }
`;
