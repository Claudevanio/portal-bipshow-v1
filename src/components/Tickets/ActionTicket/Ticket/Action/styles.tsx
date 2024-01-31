import styled from 'styled-components';

export const ContainerAction = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1.5)};
    padding-bottom: ${({ theme }) => theme.spacing(2)};
    border-bottom: 1px solid ${({ theme }) => "#E8E8E8"};
    margin-bottom: ${({ theme }) => theme.spacing(1.5)};
    padding-left: 4px;
    div.sold-off {
        width: 100%;
        text-align: center;
        padding: ${({ theme }) => theme.spacing(2)} 0px;
        h4 {
            font-size: ${({ theme }) => "1rem"};
            font-weight: 800;
            font-family: ${({ theme }) => "inhrerit"};
            color: ${({ theme }) => "rgba(0, 0, 0, 0.25)"};
            text-transform: uppercase;
        }
    }
    div.taxes {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(0.5)};
    }
    div.action-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        div.info-price {
            display: flex;
            flex-direction: column;
            p.text-dark {
                font-size: ${({ theme }) => "1rem"};
                font-weight: 400;
                margin-bottom: 4px;
            }
            p.text-light {
                font-size: ${({ theme }) => ".75rem"};
                color: ${({ theme }) => "rgba(0, 0, 0, 0.6)"}
            }
        }
    }
    div.action-map-table {
        min-width: 120px;
        position: relative;
        button {
            font-size: ${({ theme }) => ".875rem"};
            padding: ${({ theme }) => theme.spacing(1)};
            min-height: fit-content !important;
        }
        div.alert-table {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            font-size: ${({ theme }) => ".75rem"};
            font-family: ${({ theme }) => "inhrerit"};
            font-weight: bold;
            background-color: ${({ theme }) => "#F2F2F2"};
            color: ${({ theme }) => '#956AFB'};
            display: flex;
            align-items: center;
            justify-content: center;
            top: -10px;
            right: 8px;
            z-index: 2;
        }
    }
`;
