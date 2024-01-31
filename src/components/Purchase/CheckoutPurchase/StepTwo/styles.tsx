import styled from 'styled-components';

export const ContainerStepTwp = styled.div`
      width: 90%;
      max-width: 575px;
      margin-bottom: ${({ theme }) => theme.spacing(6)};

      display: flex;
      flex-direction: column;
      gap: .5rem;

      div.accordion {
        div.accordion-item {
            margin-top: ${({ theme }) => theme.spacing(2)};
            border: none;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            h2.accordion-header {
                button {
                    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
                    box-shadow: none;
                    /* padding: 0; */
                    background-color: transparent !important;
                    font-size: ${({ theme }) => "1rem"};
                    
                    color: #000;
                    font-weight: 700;
                    @media(max-width: 767px)  {
                        padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(3)};
                    }
                    &::after {
                        background-image: url('/assets/Arrow.svg');
                    }
                }
            }
            &.disabled {
                background-color: ${({ theme }) => "#f6f6f6"};
                h2.accordion-header {
                button {
                        &::after {
                            background-image: url('/assets/ArrowDisabled.svg');
                        }
                    }
                }
            }
            div.accordion-collapse {
                div.accordion-body.key-0 {
                    padding: ${({ theme }) => theme.spacing(0)} ${({ theme }) => theme.spacing(4)};
                    padding-bottom: ${({ theme }) => theme.spacing(3)};
                    @media(max-width: 767px) {
                        padding: ${({ theme }) => theme.spacing(0)} ${({ theme }) => theme.spacing(3)};
                        padding-bottom: ${({ theme }) => theme.spacing(3)};
                    }
                    p.text-dark.title {
                        font-weight: 700;
                        margin-bottom: ${({ theme }) => theme.spacing(2)};
                    }
                    p.text-light {
                        margin-top: ${({ theme }) => theme.spacing(2)};
                        font-size: ${({ theme }) => ".75rem"} !important;
                    }
                    button.button-accept {
                        margin-top: ${({ theme }) => theme.spacing(3)};
                    }
                }
            }
        }
      }
`;
