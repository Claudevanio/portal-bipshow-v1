import styled from 'styled-components';

export const ContainerStepFive = styled.div<{
  variant: any;
}>`
    p.title {
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.87);
    }

    p.body {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: rgba(0, 0, 0, 0.6);
    }
    div.texts {
        width: 100%;
    }
    div.help {
        width: 100%;
        h6.title {
            /* max-width: 248px; */
            text-align: center;
            font-size: 1rem;
        }
        ul {
            width: 100%;
            display: flex;
            flex-direction: column;
            font-size: 0.875rem;
            gap: ${({ theme }) => theme.spacing(3)};
            li {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-size: ${({ theme }) => '.875rem'};
                    font-style: normal;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
    width: 100%;
    div.photo-avatar-confirm {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(3)};
        min-height: 220px;
        button {
            max-width: 200px;
        }

        div.avatar {
            padding: 2px;
            border-radius: 50%;
            border: 2px solid
          
  }};
            img {
                width: ${({ theme }) => theme.spacing(12)};
                height: ${({ theme }) => theme.spacing(12)};
                border-radius: 50%;
                object-fit: cover;
            }
            position: relative;
            div.check {
                position: absolute;
                padding: 4px;
                border-radius: 50%;
                display: flex;
                background-color: ${({ theme, variant }) => {
                  switch (variant) {
                    case 400:
                      return '#970D0D';
                    case 200:
                      return '#8779F8';
                    case 0:
                      return '#DDA410';
                    default:
                      return '#8779F8';
                  }
                }};
                bottom: -2px;
                right: 8px;
            }
        }
`;
