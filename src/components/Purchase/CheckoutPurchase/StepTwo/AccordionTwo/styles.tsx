import styled from 'styled-components';

export const ContainerAccordionTwo = styled.div`
    div.header-accordion-two {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${({ theme }) => theme.spacing(1)} 0px;
        gap: ${({ theme }) => theme.spacing(1)};
        border: 1px solid ${({ theme }) => "#C1C9D2"};
        border-radius: 8px;
        flex-wrap: wrap;

        h6.title {
            
            font-weight: 400;
            color: ${({ theme }) => '#8779F8'}
        }
    }
    div.content-info {
        width: 100%;
        margin-top: ${({ theme }) => theme.spacing(3)};
        h6.title {
            font-size: ${({ theme }) => ".875rem"};
            
            font-weight: 700;
        }
        ul {
            margin-top: ${({ theme }) => theme.spacing(2)};
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: ${({ theme }) => theme.spacing(2)};
            li {
                display: flex;
                gap: ${({ theme }) => theme.spacing(1)};
                p {
                    font-size: ${({ theme }) => ".75rem"};
                    font-weight: 400;
                    display: flex;
                    color: ${({ theme }) => "#39474F"}
                }
                p.text-dark {
                    font-size: ${({ theme }) => ".875rem"};
                }
            }
        }
    }
`;
