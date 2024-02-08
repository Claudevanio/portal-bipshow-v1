import styled from 'styled-components';

export const ContainerCard = styled.li<{
    active: boolean
}>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid ${({ theme }) => '#f2f2f2'};
    border-radius: 16px;
    gap: ${({ theme }) => theme.spacing(1)};
    box-shadow: ${({ active }) => {
    switch (active) {
      case true:
        return '0px 4px 16px rgba(0, 0, 0, 0.08)';
        break;
      case false:
        return 'none';
        break;
      default:
        return '0px 4px 16px rgba(0, 0, 0, 0.08)';
    }
  }};

    background-color: ${({ active, theme }) => {
    switch (active) {
      case true:
        return '#fff';
        break;
      case false:
        return '#f2f2f2';
        break;
      default:
        return '#fff';
    }
  }};
    div.infos {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(1)};
        p.text-light {
            font-size: ${({ theme }) => '12px'} !important;
            text-transform: capitalize;
        }
        p.name {
            font-size: ${({ theme }) => '16px'} !important;
            font-weight: 700;
        }
    }
    div.icon {
        margin-left: auto;
    };
    cursor: pointer;
    transition: 400ms;
    &:hover {
        div.icon {
            transition: 400ms;
            transform: scale(1.5);
            svg {
                path {
                    fill: ${({ theme }) => '#8779F8'}
                }
            }
        };
    }
`;

export const Image = styled.div<{
    image: string;
}>`
    background: url(${({ image }) => image}) no-repeat center;
    background-size: cover;
    width: 96px;
    height: 80px;
    border-radius: 16px;
`;
