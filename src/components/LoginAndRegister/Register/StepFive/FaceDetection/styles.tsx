import styled from 'styled-components';

export const ContainerFaceDetection = styled.div`
    /* position: fixed; */
    /* width: 100vw; */
    /* height: 100vh; */
    position: relative;
    width: 100%;
    min-width: 300px;
    height: 330px;
    div.cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: ${({ theme }) => "#E3E3E3"};
    }
    div.face-detection {
        border: 4px solid ${({ theme }) => '#8779F8'};
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 300px;
        margin-top: -225px;
        margin-left: -100px;
        z-index: 3;
        border-radius: 50%;
    }
    .webcam, img.image {
        object-fit: cover;
        height: 200px;
        width: 100%;
    }
    div.filter  {
        top: 40%;
        left: 50%;
        width: 200px;
        height: 200px;
        margin-top: -100px;
        margin-left: -100px;
        position: absolute;
        border-radius: 50%;
        background-color: transparent;
        box-sizing: border-box;
        border: 4px solid #8779F8;
        z-index: 2;
        overflow: hidden;
    }

    div.wrapper {
        top: 0;
        left: 0;
        width: 100%;
        height: 90%;
        z-index: 1;
    }
    p.help {
        width: 270px;
        position: absolute;
        font-size: ${({ theme }) => "1rem"};
        
        font-weight: 500;
        color: rgba(255, 255, 255, 0.85);
        bottom: 120px;
        left: 50%;
        margin-left: calc(-263px / 2);
        text-align: center;
    }
    div.actions {
        height: 100px;
        &.margin {
            margin-top: -10px;
        }
        display: flex;
        justify-content: center;
        gap: ${({ theme }) => theme.spacing(3)};
        align-items: center;
        position: relative;
        z-index: 1;
        p {
            font-size: ${({ theme }) => "1rem"};
            
            font-weight: 600;
            font-style: normal;
            position: relative;
            z-index: 4;
            color: rgba(255, 255, 255, 0.85);
        }
        button.to-photo {
            width: ${({ theme }) => theme.spacing(7.5)};
            height: ${({ theme }) => theme.spacing(7.5)};
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            > div {
                transition: 400ms;
                width: ${({ theme }) => theme.spacing(6)};
                height: ${({ theme }) => theme.spacing(6)};
                border-radius: 50%;
                background-color: ${({ theme }) => "#FFFFFF"};
            }
            &:hover {
                > div {
                    transition: 400ms;
                    transform: scale(0.9);
                }
            }
            &:hover:disabled {
                > div {
                    transform: scale(1);
                }
            }
        }
        button.not-photo, button.success-photo {
            width: ${({ theme }) => theme.spacing(5)};
            height: ${({ theme }) => theme.spacing(5)};
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transition: 400ms;
            &:hover {
                transition: 400ms;
                filter: brightness(0.8);
            }
        }
        div.action-to-photo {
            display: flex;
            align-items: center;
            gap: ${({ theme }) => theme.spacing(3)};
            padding-right: calc(${({ theme }) => theme.spacing(3)} + 40px);
        }
    }
`;
