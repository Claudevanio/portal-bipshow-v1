'use client'
import React, { createContext, useContext } from 'react';
import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IToastProps {
    message: string;
    type: TypeOptions;
    timeout?: number;
}

interface IToast {
    toast: ({ message, type }: IToastProps) => void;
}

export const ToastContext = createContext({} as IToast);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastActive = ({ message, type }: IToastProps) => toast(message, {
    type,
  });

  return (
    <ToastContext.Provider value={{ toast: toastActive }}>
      <ToastContainer
        autoClose={3000}
        position="bottom-center"
        style={{
          fontSize: 16,
          fontWeight: 600,
        }}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): IToast => {
  const context = useContext(ToastContext);
  return context;
};
