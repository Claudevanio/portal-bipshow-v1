import styled from 'styled-components';

export const ContainerOption = styled.button`
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
    border: 2px solid ${({ theme }) => '#C1C9D2'};
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
    height: fit-content;
    transition: 400ms;
    @media(max-width: 767px) {
        padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
        gap: ${({ theme }) => theme.spacing(0.75)};
        h6.title {
            font-size: ${({ theme }) => ".875rem"};
        }
    }
    &.active, &:hover {
        border-color: ${({ theme }) => '#8779F8'};
        h6.title {
            color: ${({ theme }) => '#8779F8'} !important
        }
    }

    &:hover {
        div.radio {
            transition: 400ms;
            border-width: 6px;
            border-color: ${({ theme }) => '#8779F8'};
        }
        h6.title {
            color: ${({ theme }) => '#8779F8'} !important;
        }
    }
`;

export const ContainerOptionInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ContainerOptionRadio = styled.div`
    width: ${({ theme }) => theme.spacing(2.5)};
    height: ${({ theme }) => theme.spacing(2.5)};
    border-radius: 50%;
    border: 2px solid ${({ theme }) => '#C1C9D2'};
    transition: 400ms;
    @media(max-width: 767px) {
        width: ${({ theme }) => theme.spacing(1.75)};
        height: ${({ theme }) => theme.spacing(1.75)};
    }
    &.active {
        transition: 400ms;
        border-width: 6px;
        border-color: ${({ theme }) => '#8779F8'};
        @media(max-width: 767px) {
            border-width: 4px;
        }
    }
`;
