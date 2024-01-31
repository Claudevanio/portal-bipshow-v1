import { useEffect, useRef, useState } from "react";
import { InputCodeCointainer } from "./styles";
import { useAuth } from "@/shared/hooks/useAuth";
import React from "react";

interface InputCodeProps {
    setCodigoValido: (data: boolean) => any;
    dispositivo: string;
    getCode: (email: string) => any;
}



export const InputCode: React.FC<InputCodeProps> = ({
    setCodigoValido,
    dispositivo,
    getCode,
}) => {
    const [digits, setDigits] = useState<any[]>(["", "", "", ""]);
    const [codigo, setCodigo] = useState<string>();
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [showTimeLeft, setShowTimeLeft] = useState<boolean>(true);

    const refs = [
        useRef<HTMLInputElement>(null) as any,
        useRef<HTMLInputElement>(null) as any,
        useRef<HTMLInputElement>(null) as any,
        useRef<HTMLInputElement>(null) as any,
    ];
    const timeoutRef = useRef() as any;

    const fetchData = React.useCallback(async () => {
        try {
            const codigo = await getCode(dispositivo);
            setCodigo(codigo);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {

        const intervalId = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000);

        if(timeLeft <= 0) {
            setShowTimeLeft(false);
        }
    
        return () => {
          clearInterval(intervalId);
        };
      }, [timeLeft]);


    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            fetchData();
        }, 500);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [fetchData]);

    useEffect(() => {
        const newDigits = [...digits];
        const combinedDigits = parseInt(newDigits.join(""));

        if (combinedDigits.toString() == codigo) {
            setCodigoValido(true);
            setShowWrongCode(false);
        } else {
            if(combinedDigits.toString().length == 4)
                setShowWrongCode(true);
            else
                setShowWrongCode(false);
            setCodigoValido(false);
        }
    }, [digits]);

    const setNewDigits = (index: number, digits: any, value: number) => {
        if (index < 4) {
            if (digits[index].length == 0) {
                digits[index] = value;
                setDigits(digits);
            }
        }
    };

    const handleSendNewCode = React.useCallback(() => {
        fetchData();
        setTimeLeft(60);
        setShowTimeLeft(true);
    }, [fetchData,setTimeLeft, setShowTimeLeft]);

    const handleInputChange = (index: number, event: any) => {
        const { value } = event.target;
        let newDigits = [...digits];

        if (value?.length >= 2 && !newDigits[index + 1]) {
            switch (value.length) {
                case 2:
                    setNewDigits(index, newDigits, value[0]);
                    setNewDigits(index + 1, newDigits, value[1]);

                    if (index < 2) {
                        refs[index + 2].current?.focus();
                    } else if(index < 3) {
                        refs[index + 1].current?.focus();
                    }
                    break;
                case 3:
                    setNewDigits(index, newDigits, value[0]);
                    setNewDigits(index + 1, newDigits, value[1]);
                    setNewDigits(index + 2, newDigits, value[2]);

                    if (index < 1) {
                        refs[index + 3].current?.focus();
                    } else if (index >= 1 && index < 2) {
                        refs[index + 2].current?.focus();
                    } else if (index >= 2 && index < 3) {
                        refs[index + 1].current?.focus();
                    }
                    break;
                default:
                    setNewDigits(index, newDigits, value[0]);
                    setNewDigits(index + 1, newDigits, value[1]);
                    setNewDigits(index + 2, newDigits, value[2]);
                    setNewDigits(index + 3, newDigits, value[3]);
                    if (index < 1) {
                        refs[index + 3].current?.focus();
                    } else if (index >= 1 && index < 2) {
                        refs[index + 2].current?.focus();
                    } else if (index >= 2 && index < 3) {
                        refs[index + 2].current?.focus();
                    }
                    break;
            }

            return;
        }
        if (value) {
            if (digits[index]) {
                newDigits[index] = value[1];
            } else {
                newDigits[index] = value;
            }
            setDigits(newDigits);

            if (value && refs[index + 1] && index < 3) {
                refs[index + 1].current?.focus();
            } else if (index > 0 && !value && refs[index - 1]) {
                refs[index - 1].current?.focus();
            }
        }
    };

    const handleInputKeyDown = (index: number, event: any) => {
        if (event.key === "Backspace") {
            const newDigits = [...digits];
            newDigits[index] = "";
            setDigits(newDigits);

            if (refs[index] && index > 0) {
                refs[index - 1].current.focus();
            }
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            if (refs[index] && index > 0) {
                refs[index - 1].current.focus();
            }
        }

        if (event.key === "ArrowRight") {
            if (refs[index] && index < 3) {
                refs[index + 1].current.focus();
            }
        }
    };

    const [showWrongCode, setShowWrongCode] = useState(false);

    return (
        <InputCodeCointainer>
        <div className="body">
            <div className="body-digits">
                {digits?.map((digit: string, index: any) => (
                    <input
                        key={index}
                        type="text"
                        className="input-code"
                        maxLength={4}
                        ref={refs[index]}
                        value={digit}
                        onInput={(event: any) => handleInputChange(index, event)}
                        onKeyDown={(event: any) => handleInputKeyDown(index, event)}
                        style={{
                            width: "50px",
                            height: "50px",
                            margin: "0 4px",
                            border: "none",
                            borderBottom: `2px solid ${
                                digit ? "#8779F8" : "rgba(0, 0, 0, 0.38)"
                            }`,
                            background: "rgba(0, 0, 0, 0.04)",
                            textAlign: "center",
                        }}
                    />
                ))}
            </div>
            <div className="body-countdown">
                {showTimeLeft && (
                <p className="countdown-disabled">
                 Enviar um novo código   
                </p>
                )}
                {!showTimeLeft &&(
                    <p onClick={handleSendNewCode}>
                    Enviar um novo código   
                    </p>
                )}
             
                {showTimeLeft && (<p className="countdown"> | {timeLeft}</p> )}
            </div>
            <div
                className='relative h-4'
            >
                    {
                        showWrongCode &&(
                            <div className="text-xs mt-4 text-danger">
                                <p>
                                    Código inválido, por favor, tente novamente
                                </p>
                            </div>
                        )
                    }
            </div>

        </div>
        </InputCodeCointainer>
    );
};
