import styled from 'styled-components';

export const ContainerHTMLMap = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${'#ffffff00'};
  flex: 1;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  height: fit-content;
  /* max-width: 900px;  */
  * {
    color: #39474f;
  }
  min-width: 1100px;
  max-width: 1100px;
  @media (max-width: 767px) {
    box-shadow: none;
    min-width: 0;
    max-width: 600px;
  }

  @media (max-width: 600px) {
    max-width: 500px;
  }

  @media (max-width: 500px) {
    max-width: 400px;
  }

  @media (max-width: 400px) {
    max-width: 300px;
  }
  /* @media (min-width: 820px) and (max-width: 1024px) {
    min-width: 700px;
    max-width: 700px;
  }
  @media (min-width: 1025px) and (max-width: 1535px) {
    min-width: 800px;
    max-width: 800px;
  } */
  /* @media (min-width: 1535px) and (max-width: 1719px) {
    min-width: 700px;
    max-width: 700px;
  } */
`;
