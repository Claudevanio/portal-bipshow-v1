import styled from 'styled-components';
import { IStepper } from './interface';

export const ContainerStepper = styled.div<IStepper>`
    display: flex;
    gap: .5rem;
    div.container-stepper {
        display: flex;
        align-items: start;
        flex-direction: column;
        gap: .25rem;
        padding: 0;
        width: 100%;
        &.disabled {
        }
        div{
            display: flex;
            gap: .5rem;
            align-items: center;
        }
        div div.circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid ${({ theme }) => "#E3E3E3"};
            display: flex;
            align-items: center;
            justify-content: center;
            &.check {   
                border-color: ${({ theme }) => '#8779F8'};
                background-color: ${({ theme }) => '#8779F8'};
            }
        }
        &.active {
            div div.circle {
                > div {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: ${({ theme }) => '#8779F8'};
                } 
            }
        }

        div.line {
            width: 100%;
            height: 4px;
            border-radius: 6.25rem;
            background-color: ${({ theme }) => "#E3E3E3"};
            &.active {
                background-color: ${({ theme }) => '#8779F8'};
            }
        }

        &.actual{
            div div.circle {
                border-color: ${({ theme }) => '#3C4257'};
                background-color: ${({ theme }) => '#3C4257'};
                > div {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: ${({ theme }) => '#FDFDFD'};
                } 
            }
            div.line {
                background-color: ${({ theme }) => '#3C4257'};
            }
        }

    }
`;
