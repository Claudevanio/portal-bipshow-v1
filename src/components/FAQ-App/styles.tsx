 
import styled from 'styled-components';

export const ContainerFAQApp = styled.div` 

margin-top: calc(${({ theme }) => theme.spacing(4)} + ${({ theme }) => theme.spacing(11)});
height: 100%;
margin-bottom: 0px;
display: flex;
flex-direction: column;
.title-center {
    justify-content: center;
    text-align: center;
    margin-bottom: 4%;
}

.rectangle:hover {
    cursor: pointer;
    background-color: #f2f2f2;
}

.rectangle {
    border: 1px solid #8779F8 !important;
    border-radius: 30px;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5%;
    margin-top: 5%;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 90%
}

@media (max-width: 767px){
    .retangulos {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

@media (min-width: 768px) {
.rectangle {
    width: calc(33.33% - 10px);
    margin: 3%;
    float: left;
}

.rectangle:nth-child(3n) {
    margin-right: 10;
}

.retangulos {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
}
`;
