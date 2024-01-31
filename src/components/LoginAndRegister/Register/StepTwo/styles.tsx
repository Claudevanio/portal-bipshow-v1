import styled from "styled-components";

export const ContainerStepTwo = styled.div`
    width: 100%;
    div.phone {
        display: flex;
        gap: ${({ theme }) => theme.spacing(2)};
        div:first-child {
            width: 45%;
            border-radius: 0px 0px 0px 0px;
            input {
                color: ${({ theme }) => "#39474F"};
                &:disabled {
                    color: ${({ theme }) => "#39474F"};
                }
            }
        }
        div:last-child {
            border-radius: 0px 8px 0px 0px;
        }
    }
    div.address {
        display: flex;
        flex-direction: column;
    }
    div.email-body {
        font-size: 15px;
        display: inline-block;
        p.text {
            display: inline;
            font-weight: 600;
        }
    }

    div.email-input-body {
        display: flex;
        align-items: center;
        a.letter {
            font-size: 11px;
            margin-left: 10px;
            white-space: nowrap;
        }
    }
`;
