import styled from 'styled-components';

export const ContainerStepFour = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 18rem;
    max-width: 18rem;
    div.help {
        width: fit-content;
        width: 100%;
        margin-bottom: ${({ theme }) => theme.spacing(1.5)};
        ul {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: ${({ theme }) => theme.spacing(0.5)};
            li {
                p {
                    display: flex;
                    align-items: center;
                    display: flex;
                    font-size: ${({ theme }) => ".75rem"};
                    gap: 4px;
                }
            }
        }
    }
`;
