import styled from 'styled-components';

export const ContainerSelectModal = styled.div`
    .select {
        pointer-events: none;
        touch-action: none;
    }
    position: relative;
    button.btn-open-modal {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: 1000;
    }
`;

export const ContainerInputModalSelect = styled.div`
    position: relative;
    padding: ${({ theme }) => theme.spacing(1.25)} ${({ theme }) => theme.spacing(2)};
    padding-bottom: 4px;
    padding-left: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => "#f6f6f6"};
    border-radius: 8px 8px 0px 0px;
    border-bottom: 2px solid ${({ theme }) => "#E3E3E3"};
    display: flex;
    flex-direction: column;
    height: 56px;
    transition: 400ms;
    width: 100%;
    margin: ${({ theme }) => theme.spacing(1.5)} 0;
    label {
        z-index: 2;
        font-size: ${({ theme }) => ".75rem"};
        font-weight: 400;
        color: ${({ theme }) => '#C1C9D2'};
        margin-top: -2px;
        left: ${({ theme }) => theme.spacing(2)};
        transition: 400ms;
        &.active {
            color: ${({ theme }) => '#8779F8'};
        }
    }
    cursor: pointer;
    .select {
        z-index: 2;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none; 
        text-transform: uppercase;
        select::-ms-expand { display: none; }/* Remove seta padrão do IE*/;
        background: transparent;
        border: none;
        &:focus {
            border: none;
            outline: none;
            box-shadow: none;
        }
        font-size: ${({ theme }) => ".875rem"};
        font-weight: 400;
        color: ${({ theme }) => "#39474F"};
        padding: 0;
        position: absolute;
        display: inline;
        width: 100%;
        height: 100%;
        margin-top: 5px;
        min-height: 54px;
        cursor: pointer;
        top: -4px;
        left: 0;
        padding-left: ${({ theme }) => theme.spacing(2)};
        padding-top: ${({ theme }) => theme.spacing(2.75)};
        &:disabled {
            background: transparent;
        }
    }
    svg {
        position: absolute;
        right: ${({ theme }) => theme.spacing(2.75)};
        top: ${({ theme }) => theme.spacing(2)}
    }
    &.disabled {
        background-color: ${({ theme }) => "#E3E3E3"};
        border: none;
        p.text-dark {
            color: ${({ theme }) => "#E3E3E3"} !important;
        }
        label {
            color: ${({ theme }) => '#C1C9D2'};
        }
    }
    &.active {
        border-color: ${({ theme }) => '#8779F8'};
    }
    div.spinner-border {
        position: absolute;
        width: 20px !important;
        height: 20px !important;
        right: ${({ theme }) => theme.spacing(2.75)};
        top: ${({ theme }) => theme.spacing(2)};
        border-width: 3px;
        border-color: ${({ theme }) => '#C1C9D2'};
        border-right-color: transparent;
    }
`;
