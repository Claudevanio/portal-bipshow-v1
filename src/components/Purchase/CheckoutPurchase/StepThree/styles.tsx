import styled from 'styled-components';

export const ContainerStepThree = styled.div`
    width: 90%;
    max-width: 375px;
    margin-bottom: ${({ theme }) => theme.spacing(6)};
    padding: ${({ theme }) => theme.spacing(3)};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    div.header {
        display: flex;
        flex-direction: column;
        align-items: center;
        h5 {
            margin-top: ${({ theme }) => theme.spacing(2)};
            margin-bottom: ${({ theme }) => theme.spacing(2)};
        }
    }
    div.text {
        margin-top: ${({ theme }) => theme.spacing(5)};
        width: 100%;
        text-align: center;
        p {
            font-size: ${({ theme }) => "1rem"};
            
            font-weight: 400;
            padding-bottom: .5rem;
            color: rgba(0, 0, 0, 0.60);
            /* color: ${({ theme }) => "#E3E3E3"} */
        }
        &.pix {
            margin-top: ${({ theme }) => theme.spacing(3)};
        }
    }
    div.btn {
        width: 100%;
        margin-top: ${({ theme }) => theme.spacing(6)};
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(2)};
        a {
            max-width: 100%;
            font-size: ${({ theme }) => "1rem"} !important;
        }
    }
    div.pix-copy {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: ${({ theme }) => theme.spacing(5)};
        p {
            font-size: ${({ theme }) => "1rem"};
            
            /* color: ${({ theme }) => "#E3E3E3"}; */
            &.amount {
                font-weight: 500;
                font-size: ${({ theme }) => '1.5rem'};
            }
        }
        div.qrcode {
            margin-top: ${({ theme }) => theme.spacing(2)};
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                margin-top: ${({ theme }) => theme.spacing(2)};
                max-width: 80%;
                object-fit: cover;
            }
        }
        div.copy-paste {
            margin-top: ${({ theme }) => theme.spacing(2)};
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
                text-align: center;
            }
            button {
                margin-top: ${({ theme }) => theme.spacing(2)};
            }
        }
        div.copy {
            margin-top: ${({ theme }) => theme.spacing(2)};
            width: 100%;
            overflow: hidden;
            textarea {
                font-size: ${({ theme }) => ".875rem"};
                
                font-weight: 400;
                color: ${({ theme }) => "#E3E3E3"};
                text-align: left;
                border: none;
                width: 100%;
                padding: ${({ theme }) => theme.spacing(1)};
                resize: none;
                border: 1px solid ${({ theme }) => "#E3E3E3"};
                border-radius: 4px;
                border: none;
                &:focus {
                    outline: none;
                    box-shadow: none;
                };
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
            }
            position: relative;
            svg {
                position: absolute;
                right: 0px;
                top: 9px;
            }
        }
    }
`;
