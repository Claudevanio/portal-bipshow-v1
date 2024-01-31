import styled from 'styled-components';

export const ContainerRadio = styled.div`
    height: fit-content;
    display: flex;
    align-items: center;
    margin: ${({ theme }) => theme.spacing(1)} 0;
    
    input {
        position: relative;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        appearance: none;
        -webkit-appearance: none;
        border: 2px solid ${({ theme }) => "#E3E3E3"};
        margin-right: 5px; /* Adjust as needed */
        cursor: pointer;

        &:focus {
            box-shadow: none !important;
            outline: none !important;
            border-color: ${({ theme }) => "#E3E3E3"};
        }

        &:checked + label::before {
            background-color: ${({ theme }) => '#8779F8'};
        }
    }

    label {
        position: relative;
        max-width: calc(100% - 22px);
        padding-top: 6px;
        padding-left: ${({ theme }) => theme.spacing(1)};
        font-size: ${({ theme }) => "1rem"};
        font-weight: 400;
        color: ${({ theme }) => "#39474F"};
        cursor: pointer;
    }

    label::before {
        content: '';
        position: absolute;
        top: 6px;
        left: -22px;
        width: 12px; /* Adjust as needed */
        height: 12px; /* Adjust as needed */
        border-radius: 50%;
        background-color: #fff; /* Set the color of the circle */
    }

    .form-check-input:checked + label::before {
        background-color: ${({ theme }) => '#8779F8'};
        border-color: ${({ theme }) => '#8779F8'};
        /* color:  #8779F8; */
    }
    .form-check-input:checked + label:not(.remain-color) {
        color:  #8779F8;
    }
    .form-check-input:checked{
        border-color: ${({ theme }) => '#8779F8'};
    }

`;
