
'use client'
import { Dialog } from '@/components/Dialog/Dialog';
import React, { createContext, useState, useContext, useEffect } from 'react';

type ErrorContextType = {
    errorMessage: string;
    showErrorDialog: (message: string, type: string) => void;
    isErrorDialogVisible: boolean,
    setIsErrorDialogVisible: any
};

const ErrorContext = createContext<ErrorContextType>({
    errorMessage: '',
    showErrorDialog: () => { },
    isErrorDialogVisible: false,
    setIsErrorDialogVisible: ''
});

export const TypeEnum = {
    INFO: 'INFO',
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',
}

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }: any) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorDialogVisible, setIsErrorDialogVisible] = useState(false);
    const [type, setType] = useState(TypeEnum.INFO)


    const showErrorDialog = (message: string, type?: string) => {
        setErrorMessage(message);
        setType(type ?? TypeEnum.INFO)
        setIsErrorDialogVisible(true);
    };

    const contextValue: ErrorContextType = {
        errorMessage,
        isErrorDialogVisible,
        showErrorDialog,
        setIsErrorDialogVisible
    };

    useEffect(() => {

    }, [isErrorDialogVisible]);

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
            {isErrorDialogVisible && (
                <Dialog
                    message={errorMessage}
                    type={type}
                    handleClose={() => setIsErrorDialogVisible(false)}
                />
            )}
        </ErrorContext.Provider>
    );
};