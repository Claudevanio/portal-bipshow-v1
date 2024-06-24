import styled from 'styled-components';

export const ContainerSearchEvents = styled.div`
  div.content {
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme }) => theme.spacing(8.625)};
    margin-bottom: ${({ theme }) => theme.spacing(7)};
    div.header {
      padding: ${({ theme }) => theme.spacing(7)} 0;
      display: flex;
      align-items: center;
      width: 100%;
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(2)};
      }
      button {
        margin-left: auto;
        p.text-light {
          font-size: ${({ theme }) => '1rem'} !important;
          color: ${({ theme }) => '#39474F'} !important;
        }
        @media (max-width: 767px) {
          min-width: 100px;
          text-align: right;
        }
      }
    }
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: ${({ theme }) => theme.spacing(3)};
      @media (max-width: 767px) {
        justify-content: center;
      }
      li {
        width: calc(100% / 4 - ${({ theme }) => theme.spacing(3)});
        @media (max-width: 1440px) {
          width: calc(100% / 3 - ${({ theme }) => theme.spacing(3)});
        }
        @media (max-width: 1024px) {
          width: calc(100% / 2 - ${({ theme }) => theme.spacing(3)});
        }
        @media (max-width: 767px) {
          width: 100%;
        }
      }
    }
    div.empty {
      min-height: 259px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
