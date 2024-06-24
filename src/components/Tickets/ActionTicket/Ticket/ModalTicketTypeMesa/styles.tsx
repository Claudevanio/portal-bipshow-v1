import styled from 'styled-components';

export const ContainerModalTicketTypeMesa = styled.div`
  background-color: white;
  header {
    position: relative;
    width: 100%;
    padding: ${({ theme }) => theme.spacing(2)};
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${({ theme }) => '#F2F2F2'};
    button {
      position: absolute;
      right: ${({ theme }) => theme.spacing(2)};
      top: ${({ theme }) => theme.spacing(1)};
    }
  }
  #img-mapper {
    width: 90% !important;
    margin: 0 auto;
    height: 80% !important;
  }
  img.image-reservados {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing(3)};
    margin-top: ${({ theme }) => theme.spacing(4)};
    padding: ${({ theme }) => theme.spacing(2)};
    button {
      max-width: 248px;
      min-width: 160px;
    }
  }
  div.content-modal {
    height: calc(100vh - 57px - 80px - 32px - 28px - 28px);
    min-height: 500px;
    max-width: 100vw;
    overflow-y: auto;
    position: relative;
    scroll-behavior: smooth;
  }
  #padding-top {
    display: none;
  }
`;

export const AlertInfoTable = styled.div<{
  left: number;
  top: number;
}>`
  width: 160px;
  position: absolute;
  left: ${({ left }) => `${left - 70}px`};
  top: ${({ top }) => `${top - 75}px`};
  padding: 4px;
  padding: 0px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => 'rgba(0, 0, 0, 0.6)'};
  z-index: 10;
  h6 {
    padding: 6px 8px;
    background-color: ${({ theme }) => '#E8E8E8'};
    color: ${({ theme }) => 'rgba(0, 0, 0, 0.6)'} !important;
    border-bottom: 1px solid ${({ theme }) => 'rgba(0, 0, 0, 0.25)'};
    font-family: ${({ theme }) => 'inhrerit'};
    font-size: ${({ theme }) => '.875rem'};
  }
  p {
    width: 100%;
    text-align: left;
    padding: 8px;
    color: ${({ theme }) => '#C1C9D2'};
    font-family: ${({ theme }) => 'inhrerit'};
    font-weight: 500;
    strong {
      font-weight: 700;
      color: ${({ theme }) => 'rgba(0, 0, 0, 0.6)'} !important;
    }
  }
`;

export const ElementScroll = styled.div<{
  padding: number;
}>`
  position: absolute;
  top: ${({ padding }) => `${padding}px`};
  opacity: 0;
  left: calc(50% - 38px);
`;
