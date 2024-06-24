import styled from "styled-components";

export const ContainerOrder = styled.div` 
    margin-bottom: ${({ theme }) => theme.spacing(6)};

    margin-top: ${({ theme }) => theme.spacing(2)};
    
    .copy {
                margin-top: ${({ theme }) => theme.spacing(1)};
                width: 100%;
                max-width: 500px;
                padding: 0px;
                textarea {
                    width: 100%;
                    padding: ${({ theme }) => theme.spacing(1)};
                    font-size: ${({ theme }) => 14}; 
                    border: none;
                    height: fit-content;
                    resize: none;
                    &:focus {
                        outline: none;
                        box-shadow: none;
                    }
                }
            }
        .payment {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: ${({ theme }) => theme.spacing(2)};
            strong {
                font-size: ${({ theme }) => 16};
                font-weight: 600;
            }
            img {
                max-width: 300px;
            }
        div.status {
            width: 100%;
            justify-content: center;
            display: flex;
            padding: 120px 0px;
            h4 {
                font-size: ${({ theme }) => 24} !important;
                strong {
                    font-weight: 600;
                }
            }
        }
    }
`