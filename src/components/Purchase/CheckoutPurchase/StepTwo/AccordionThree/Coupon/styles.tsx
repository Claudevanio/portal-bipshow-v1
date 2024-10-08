import styled from 'styled-components';

export const ContainerCoupon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h6.title {
    font-size: ${({ theme }) => '.875rem'};
    font-weight: 700;
  }
  p.information {
    margin-top: ${({ theme }) => theme.spacing(1)};
    font-size: ${({ theme }) => '1rem'} !important;

    font-weight: 400 !important;
    color: ${({ theme }) => '#39474F'} !important;
  }
  div.discount {
    margin-top: ${({ theme }) => theme.spacing(3)};
  }
  div.coupon-applied {
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: space-between;
    @media (max-width: 767px) {
      width: 90%;
    }
    button {
      width: fit-content;
    }
    p.information {
      padding-bottom: 12px;
    }
  }
  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    button {
      width: fit-content;
    }
    div.input-coupon {
      width: 53%;
      @media (max-width: 767px) {
        width: 100%;
      }
      input {
        width: 100%;
      }
    }
  }
  div.btn {
    display: flex;
    justify-content: center;
    min-width: 75px;
    padding-top: 0px;
    @media (max-width: 767px) {
      padding-right: 0;
    }
  }
  div.spinner-border {
    height: ${({ theme }) => theme.spacing(2)};
    width: ${({ theme }) => theme.spacing(2)};
    border-width: 2px;
    border-color: ${({ theme }) => '#8779F8'};
    border-right-color: transparent;
    @media (max-width: 1024px) {
      height: ${({ theme }) => theme.spacing(2)};
      width: ${({ theme }) => theme.spacing(2)};
    }
  }
  div.tickets {
    padding: ${({ theme }) => theme.spacing(3)} 0px;
    border-bottom: 1px solid ${({ theme }) => '#f6f6f6'};
    width: 100%;
    ul {
      margin-top: ${({ theme }) => theme.spacing(1.75)};
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing(2)};
      li {
        width: 100%;
        display: flex;
        gap: ${({ theme }) => theme.spacing(2)};
        h6 {
          font-size: ${({ theme }) => '.875rem'} !important;
          line-height: 130%;
        }
        p.text-light {
          color: #bfbfbf !important;
          font-weight: 500 !important;
        }
        div.info-one {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        div.info-two {
          margin-left: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
      }
    }
  }
`;
