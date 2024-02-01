'use client'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { GENARATE_TOKEN, GET_USER, UPDATED_USER, api, apiTokeUser } from '@/services';
import axios, { HeadersDefaults } from 'axios';
import { Loading } from '@/components/Loading/Loading';
import { TypeEnum, useError } from './useDialog';
import { IUser } from '@/types';
import { Cache } from '@/adapters';
import { states } from '../config/states';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { appToken, baseUrl } from '@/constants';

export interface IRegister {
    result: boolean;
    handleGenerateToken: () => Promise<void>;
    user: IUser | undefined;
    setIsUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
    isInfosAuthorization: {
        base64: string;
        deviceId: string;
    };
    handleLoadUser: () => Promise<void>;
    isLoading: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: (state: boolean) => void;
    handleLogoutUser: () => void;
    handleUpdateUser: (user: IUser) => Promise<void>;
    authentication: boolean;
    onFindUser: () => Promise<IUser | undefined>;
    authenticationUser: boolean;
    handleGetUser: (accessToken: string) => Promise<IUser>;
    setIsUserNotExistsCPF: (cpf: string) => void;
    setUserEmail: (email: string) => void;
    userEmail?: string;
    defaultValues?: any;
    clearDefaultValues: () => void;
    setDefaultValues: (data: any) => void;  
    isUserNotExistCPF?: string;
    isLoadingUpdatedAddress: boolean;
}

export interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}

const RegisterContext = createContext({} as IRegister);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const [isResult, setIsResult] = useState(true);
  const [isUser, setIsUser] = useState<IUser>();
  const [isInfosAuthorization] = useState<{
        base64: string;
        deviceId: string;
    }>({
      base64: 'OTg1OGI1NGQyMDA1N2NmMjNmOTNkNzk4OWE0MzljYWY6NGYwNTU4YTE0YTUxMDkwNjk5YjgxMjczMzE5MDYxMjg=',
      deviceId: '5149ae352035323b',
    });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();
  const query = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuthentication, setIsAuthentication] = useState<boolean>(false);
  const [isAuthenticationUser, setIsAuthenticationUser] = useState<boolean>(false);
  const [isUserNotExistCPF, setIsUserNotExistsCPF] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [defaultValues, setDefaultValues] = useState<any>();
  const [isLoadingUpdatedAddress, setIsLoadingUpdatedAddress] = useState<boolean>(false);

  const handleFindUser = useCallback(async () => {
    const tokenUser = Cache.get({key: '@tokenUser'}) as string;

    if (tokenUser) {
      const { data } = await apiTokeUser(`${GET_USER}`, {
        method: 'GET',
      });
      return data;
    }

    return undefined;
  }, []);

  const handleGetUser = useCallback(async (accessToken: string) => {
    const { data } = await apiTokeUser(`${GET_USER}`, {
      method: 'GET',
    });
    return data;
  }, []);

  const handleLoadUser = useCallback(async () => {
    try {
      if (!isUser) {
        // setIsLoading(true);
        const tokenUser = Cache.get({key: '@tokenUser'}) as string;
        const isTokenUrl = query.get('tokenUser');
        const isTokenUser = tokenUser || isTokenUrl;


        if (isTokenUser) {
          const { data } = await api(
            `${GET_USER}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${isTokenUser}`,
              },
            },
          );
          if (data) {
            setIsUser(data);
            (
              apiTokeUser.defaults
                .headers
            ).Authorization = `Bearer ${isTokenUser}`;
            setIsAuthenticationUser(true);
          }
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, [isUser, query]);

  const handleGenerateToken = useCallback(async () => {
    // try {
    //   const token = appToken

    //   if (!token && !query.get('tokenUser')) {
    //     setIsLoading(true);
    //     const base64 = 'OTg1OGI1NGQyMDA1N2NmMjNmOTNkNzk4OWE0MzljYWY6NGYwNTU4YTE0YTUxMDkwNjk5YjgxMjczMzE5MDYxMjg=';

    //     const { data } = await axios(
    //       `${process.env.NODE_ENV === 'development'
    //         ? ''
    //         : ''
    //       }${process.env.URL_API}${GENARATE_TOKEN}`,
    //       {
    //         method: 'POST',
    //         data: {
    //           grant_type: 'client_credentials',
    //         },
    //         headers: {
    //           Authorization: `Basic ${base64}`,
    //           Accept: '*/*',
    //         },
    //       },
    //     );

    //     Cache.set({key: '@Token', value: data.access_token});

    //     (
    //       api.defaults.headers
    //     ).Authorization = `Bearer ${data.access_token}`;
    //     setIsAuthentication(true);
    //     setIsResult(true);
    //     setIsLoading(false);
    //   } else {
    //     (
    //       api.defaults.headers
    //     ).Authorization = `Bearer ${token}`;
    //     setIsAuthentication(true);
    //     await handleLoadUser();
    //   }
    // } catch (err) {
    //   setIsResult(false);
    //   setIsLoading(false);
      // if (pathname === '/404') {
      //   return;
      // }
      // router.push('/404');
    // }
  }, [pathname, handleLoadUser]);

  useEffect(() => {
    if(!isUser){
      handleLoadUser();
    }
  }, [pathname, isUser, handleLoadUser]);

  const handleLogoutUser = useCallback(() => {
    localStorage.setItem('shouldChangeText', 'true');
    Cache.remove({key: '@tokenUser'})
    router.push('/');
    setTimeout(() => {
      setIsUser(undefined);
      apiTokeUser.defaults.headers.Authorization = '';
      // window.location.reload();
    }, 100);
  }, []);

  const handleUpdateUser = useCallback(
    async (user: IUser) => {
      try {
        debugger;
        setIsLoadingUpdatedAddress(true);
        if (isUser) {
          console.log('isUser', isUser)
          const isUpdatedUser = {
            ...isUser,
            imagem: undefined,
            endereco: {
              bairro: user.endereco?.bairro,
              cep: user.endereco?.cep,
              nomeCidade: user.endereco?.nomeCidade,
              logradouro: user.endereco?.logradouro,
              localidade: `${user.endereco?.nomeCidade}/${user.endereco?.estado
                ? states.find(
                  (state) => state.estado
                                        === user.endereco?.estado,
                )?.uf ?? user.endereco.estado
                : user.endereco?.estado
              }`,
              codigoIbge: user.endereco?.codigoIbge,
              complemento: user.endereco?.complemento,
              numero: user.endereco?.numero ?? 'S/N',
              uf: user.endereco?.estado
                ? states.find(
                  (state) => state.estado === user.endereco?.estado,
                )?.uf ?? user.endereco.estado
                : user.endereco?.estado,
              uzerId: isUser.endereco?.uzerId,
            },
          } as IUser;
          const { data: resultData } = (await apiTokeUser.put(
            `${UPDATED_USER}/${isUser.id}`,
            isUpdatedUser,
          )) as { data: { sucesso: boolean; mensagem?: string } };

          if (resultData.sucesso) {
            const formatedUser : IUser = {
              ...isUser,
              endereco: isUpdatedUser.endereco,
              telefone: isUpdatedUser.telefone,
            }
            setIsUser(formatedUser);
            callErrorDialogComponent('Dados atualizados com sucesso.', TypeEnum.SUCCESS);
          } else {
            callErrorDialogComponent(resultData.mensagem
                            ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
          }
        }
        setIsLoadingUpdatedAddress(false);
      } catch (err: any) {
        setIsLoadingUpdatedAddress(false);
        callErrorDialogComponent(err.message ?? 'Ocorreu um erro de couminicação.', TypeEnum.ERROR);
      }
    },
    [isUser, showErrorDialog],
  );

  useEffect(() => {
    handleGenerateToken();
  }, [handleGenerateToken]);

  useEffect(() => {
    // if (!isResult && window.document.location.pathname !== '/404') {
    //   window.document.location = '/404';
    // }
  }, [isResult]);

  const clearDefaultValues = () => {
    setDefaultValues({});
  };

  return (
    <RegisterContext.Provider
      value={{
        result: isResult,
        handleGenerateToken,
        setIsUser,
        user: isUser,
        isInfosAuthorization,
        handleLoadUser,
        isLoading,
        setIsMenuOpen,
        isMenuOpen,
        handleLogoutUser,
        handleUpdateUser,
        defaultValues,
        setDefaultValues,
        authentication: isAuthentication,
        onFindUser: handleFindUser,
        authenticationUser: isAuthenticationUser,
        handleGetUser,
        setIsUserNotExistsCPF,
        isUserNotExistCPF,
        userEmail,
        setUserEmail,
        isLoadingUpdatedAddress,
        clearDefaultValues,
      }}
    >
      {children}
      {/* <Loading open={isLoading} /> */}
    </RegisterContext.Provider>
  );
};

export const useRegister = (): IRegister => {
  const context = useContext(RegisterContext);
  return context;
};
