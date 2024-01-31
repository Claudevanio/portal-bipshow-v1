import styled from "styled-components";

export const InputCodeCointainer = styled.div`
    .body {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .countdown-disabled {
        font-weight: 200;
    }

    .body-countdown {
        cursor: pointer;
        font-size: 14px;
        display: flex;
        font-weight: 200;
        .countdown {
            display: flex;
            margin-left: 10px;
        }
        .count2 {
            margin-left: 10px;
        }
    }

    .body-digits {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    
        input.input-code {
            width: 30px;
            height: 30px;
            margin: 0 5px;
            text-align: center;
            font-size: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            outline: none;
        }
    
        .input-code:focus {
            border-color: #8779F8;
        }
    }

`;
