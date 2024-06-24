import styled from 'styled-components';

export const ContainerCardQRCODE = styled.li`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.spacing(2)};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }

  div.qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    svg.qrcode {
      width: 100px;
      height: 100px;
    }
    p {
      font-size: ${({ theme }) => '12px'} !important;
      color: #000000 !important;
    }
    @media (max-width: 767px) {
      align-self: center;
    }
  }
  div.infos {
    flex: 1;
    display: flex;
    gap: ${({ theme }) => theme.spacing(2.5)};
    p {
      font-size: ${({ theme }) => '14px'} !important;
      color: #000000 !important;
      &.text-dark {
        font-weight: 700;
      }
    }
    div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing(2)};
    }
    div:last-child {
      flex: 1;
    }
  }
  *.btn-canceled-payment {
    border-color: ${({ theme }) => '#F65252'};
    color: ${({ theme }) => '#F65252'};
  }
`;
