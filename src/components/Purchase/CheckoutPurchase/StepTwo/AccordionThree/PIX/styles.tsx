import styled from 'styled-components';

export const ContainerPIX = styled.div`
    margin-top: ${({ theme }) => theme.spacing(4)};
    div.title {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: ${({ theme }) => theme.spacing(1)};
        p {
            font-size: ${({ theme }) => "1rem"};
            
            font-weight: 500;
            color: ${({ theme }) => "#39474F"};
        }
        p.badges {
            padding: 2px 12px;
            border-radius: 8px;
            font-size: ${({ theme }) => ".875rem"};
            background-color: ${({ theme }) => '#8779F8'};
            color: ${({ theme }) => "#FFFFFF"}
        }
    }
    p.total {
        margin-top: ${({ theme }) => theme.spacing(3)};
        font-size: ${({ theme }) => "#1.25rem"};
        
        font-weight: 600;
        color: ${({ theme }) => "#39474F"};
    }
    div.btn-submit {
        margin-top: ${({ theme }) => theme.spacing(3)};
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            max-width: 40%;
            @media(max-width: 767px) {
                max-width: 50%;
            }
        }
    }
`;
