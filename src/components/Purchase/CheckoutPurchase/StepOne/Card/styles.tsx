import styled from 'styled-components';

export const ContainerCard = styled.li`
    width: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => "#FFFFFF"};
    padding: ${({ theme }) => theme.spacing(2)};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

    p.text-dark {
        font-weight: 700;
    }
    div.action-button {
        margin-top: ${({ theme }) => theme.spacing(2)};
        display: flex;
        gap: ${({ theme }) => theme.spacing(1)};
        button {
            min-height: fit-content;
            min-width: 134px;
            max-height: 42px;
            @media(max-width: ${({ theme }) => theme.breakpoints.mobile}) {
                font-size: ${({ theme }) => ".875rem"};
            }
        }
    }
    div.info-user {
        margin-top: ${({ theme }) => theme.spacing(2)};
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(2)};
        div.infos {
            width: 50%;
            display: flex;
            flex-direction: column;
            gap: 1px;
            flex: 1;
            p.text-dark {
                font-weight: 400;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            p.text-light {
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        button {
            margin-left: auto;
            border: none;
            text-decoration: underline;
            padding-right: 0;
            @media(max-width: 1024px) {
                font-size: ${({ theme }) => ".875rem"};
            }
        }
    }
`;
