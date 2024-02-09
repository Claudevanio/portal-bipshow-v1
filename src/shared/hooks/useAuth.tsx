'use client'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IUser } from '@/types';
import axios, { AxiosError, HeadersDefaults } from 'axios';
import { Cache } from '@/adapters';
import {
  GENARATE_TOKEN,
  CREATE_USER,
  GET_CPF,
  GET_TOKEN_RESET_PASSWORD,
  SEND_EMAIL_RESET_PASSWORD,
  LIST_COUNTRIES,
  GET_TYPE_DOCUMENT,
  CHECK_COUNT_EXIST,
  UPDATED_USER,
  GET_CITY_CODE_IBGE,
  VALIDACAO_EMAIL,
  CREATE_DISPOSITIVO,
  DELETE_USER,
  UPDATE_EMAIL,
} from '@/services';
import { api, apiTokeUser } from '@/services';
import { useRouter } from 'next/navigation';
import { CountriesProps, ITypeDoc, CityCodeIBGEProps } from '@/types';
import { states } from '../config/states';
import { format, parseISO } from 'date-fns';
import { useRegister } from './useRegister';
import { TypeEnum, useError } from './useDialog';
import { baseUrl } from '@/constants';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}
export interface IAuth {
  isStepper: number;
  handleNextStep: (data: any, photoAvatar?: string, onClickPurchase?: () => void) => void;
  handleValidationEmail: (email: string) => any;
  handleValidationPhone: (email: string) => any;
  setIsStepper: (state: number) => void;
  isLoading: boolean;
  userNotExist: boolean;
  setUserNotExist: (state: boolean) => void;
  handleNextStepRegister: (
    data: IUser,
    onClickPurchase?: () => void,
    finish?: boolean
  ) => void;
  handleUpdateEmail: (data: string, uzerId: number) => void;
  handleCheckCPF: (cpf: string) => void;
  handleInfoCpf: (cpf: string) => any;
  handleForgotPassword: (cpf: string) => void;
  forgotPassword: boolean;
  photoInvalida: number | undefined;
  isInvalidPicture: boolean;
  createdUser: boolean;
  setCreatedUser: (data: boolean) => void;
  setIsInvalidPicture: (data: boolean) => void;
  handleDeleteUser: () => void;
  setPhotoInvalida: (data: number | undefined) => void;
  handleForgotPasswordBack: () => void;
  dataForgotPassword:
    | {
        telefone?: string;
        cpf?: string;
        email?: string;
        nome?: string;
        token?: string;
        uzerId?: number;
      }
    | undefined;
  handleSendEmailForgotPassword: (token: string, email: string) => void;
  handleDataForgotPasswordBack: () => void;
  successSendEmail: boolean;
  countries?: CountriesProps[];
  selectCountry: CountriesProps;
  onSelectCountry: (country: CountriesProps) => void;
  onLoadTypeDocument: (country: string) => Promise<void>;
  typesDoc: ITypeDoc[];
  loadingCountry: boolean;
  photoAvatar?: string;
  onAddPhoto: (photo?: string) => void;
  toPhoto: boolean;
  stepperEditUser: number;
  updatedUserModal: boolean;
  loadingSubmitUpdatedUser: boolean;
  validateEmail: boolean;
  emailValidado: boolean;
  setEmailValidado: (data: boolean) => void;
  setValidateEmail: (data: boolean) => void;
  onToPhoto: (toPhot: boolean) => void;
  onLoadCountries: () => Promise<void>;
  onSelectStepper: (stepper: number) => void;
  onSubmitUpdatedUser: (user: IUser) => Promise<void>;
  onOpenModalEditUser: () => void;
  setIsForgotPassword: (data: boolean) => void;
  onClsoeModalEditUser: () => void;
  notUserPhoto?: IUser;
  photo: string;
  setPhoto: (data: string) => void;
  checkEmailExistente: (email: string) => any;
  setIsNotUserPhoto: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  onUpdatedUser: (data: IUser) => Promise<void>;
  forgotPasswordDefaultValues: any;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext({} as IAuth);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isStepper, setIsStepper] = useState<number>(0);
  const {
    isInfosAuthorization,
    handleLoadUser,
    handleGetUser,
    authentication,
    user,
    setIsUser,
    onFindUser,
    setIsUserNotExistsCPF,
    setUserEmail,
    setDefaultValues,
  } = useRegister();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userNotExist, setUserNotExist] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [isDataForgotPassword, setIsDataForgotPassword] = useState<{
    telefone?: string;
    cpf?: string;
    email?: string;
    nome?: string;
    token?: string;
  }>();
  const [isSuccessSendEmail, setIsSuccessSendEmail] = useState<boolean>(false);

  const [photoInvalida, setPhotoInvalida] = useState<number | undefined>();

  const [createdUser, setCreatedUser] = useState<boolean>(false);
  const [isInvalidPicture, setIsInvalidPicture] = useState<boolean>(false);

  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [emailValidado, setEmailValidado] = useState<boolean>(false);
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const { push } = useRouter();
  const [isCountries, setIsCountries] = useState<CountriesProps[]>([
    {
      id: 76,
      nomePais: 'Brasil',
      imagem: undefined,
      codigoIso: 'BR',
      codigoArea: 55,
    },
  ]);
  const [isSelectCountry, setIsSelectCountry] = useState<CountriesProps>({
    id: 76,
    nomePais: 'Brasil',
    imagem: undefined,
    codigoIso: 'BR',
    codigoArea: 55,
  });
  const [isTypesDoc, setIsTypesDoc] = useState<ITypeDoc[]>([
    {
      id: 4,
      nomeTipoDocumento: 'CPF',
    },
  ]);
  const [isLoadingCountry, setIsLoadingCountry] = useState<boolean>(false);
  const [isPhotoAvatar, setIsPhotoAvatar] = useState<string>();
  const [photo, setPhoto] = useState<string>('');
  const [isToPhoto, setIsToPhoto] = useState<boolean>(false);
  const [isStepperEditUser, setIsStepperEditUser] = useState<number>(0);
  const [isUpdatedUserModal, setIsUpdatedUserModal] = useState<boolean>(false);
  const [isLoadingSubmitUpdatedUser, setIsLoadingSubmitUpdatedUser] = useState<boolean>(false);
  const [isNotUserPhoto, setIsNotUserPhoto] = useState<IUser>();
  const [isToken, setIsToken] = useState<any>();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [forgotPasswordDefaultValues, setForgotPasswordDefaultValues] = useState<any>();

  const handleToPhoto = (toPhoto: boolean) => setIsToPhoto(toPhoto);

  const handleOpenModalEditUser = () => setIsUpdatedUserModal(true);
  const handleCloseModalEditUser = () => setIsUpdatedUserModal(false);

  const handleCheckEMAIL = useCallback(async (email: string) => {
    const { data } = (await api.get(`${CHECK_COUNT_EXIST}?email=${email}`)) as {
      data: { existente: boolean };
    };

    return data.existente;
  }, []);

  const checkEmailExistente = useCallback(async (email: string) => {
    if (email != '') {
      const existe = await handleCheckEMAIL(email);

      if (existe) {
        callErrorDialogComponent('Email ja cadastrado no sistema.', TypeEnum.ERROR);
      }
      return existe;
    }
    return false;
  }, [callErrorDialogComponent, handleCheckEMAIL]);

  const handleForgotPassword = useCallback(
    async (cpf: string) => {
      let data = null;
      if (cpf != '') {
        data = await handleCheckCountExistV2(cpf);

        setIsDataForgotPassword(data.usuario);
      }
      setIsForgotPassword(true);
      return data;
    },

    [setIsDataForgotPassword, setIsForgotPassword, isDataForgotPassword],
  );

  const handleForgotPasswordBack = useCallback(() => {
    setIsForgotPassword(false);
  }, []);

  const handleDataForgotPasswordBack = useCallback(() => {
    setIsDataForgotPassword(undefined);
  }, []);

  const handleCheckCPF = useCallback(async (cpf: string) => {
    const { data } = (await api.post(GET_CPF, {
      cpf: Number(cpf),
    })) as { data: { existe: boolean } };

    return data.existe;
  }, []);

  const handleInfoCpf = useCallback(async (cpf: string) => {
    return await handleCheckCountExistV2(cpf.replace(/[^\d]/g, ''));
  }, []);


  const handleUpdateEmail = async (email: string, uzerId: number) => {
    const emailChange = {
      uzerId,
      email,
    };

    await api.put(`${UPDATE_EMAIL}`, emailChange);
  };

  const handleCheckCountExist = useCallback(
    async (
      documento: string,
      email?: string,
      idPais?: number,
      idTipo?: number,
    ) => {
      let path = `${CHECK_COUNT_EXIST}`;

      if (!email) {
        path += `?documento=${documento}`;
      } else {
        path += `?email=${email}`;
      }

      if (idPais) {
        path += `&idPais=${idPais}`;
      }
      if (idTipo) {
        path += `&idTipoDocumento=${idTipo}`;
      }
      const { data } = (await api.get(path)) as {
        data: { existente: boolean };
      };

      return data.existente;
    },
    [],
  );

  const handleDeleteUser = useCallback(async () => {
    // const { data }: any = await handleCheckCountExistV3("114.238.639-25");

    const { data } = await axios(
      `${baseUrl}${GENARATE_TOKEN}`,
      {
        method: 'POST',
        data: {
          grant_type: 'password',
          username: '11423863925',
          password: '123456',
        },
        headers: {
          Authorization: `Basic ${isInfosAuthorization.base64}`,
          Accept: '*/*',
        },
      },
    );

    const api2 = axios.create({
      baseURL: process.env.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    const dados = (await api2.get(`${CREATE_USER}`)) as any;

    (await api2.delete(`${DELETE_USER}/${dados.data.id}`)) as {};
  }, []);

  const handleValidationPhone = useCallback(async (phone: string) => {
    const api2 = axios.create({
      baseURL: 'https://notificacoes-api.uzerpass.com.br',
      headers: {
        'Content-Type': 'application/json',
        apiKey: '59d7547b-cc92-48b9-98a1-fdad9603ef2a',
      },
    });

    const dispositivo = {
      id: null,
      token: 'string',
      idPessoa: null,
      idPessoaLegada: 0,
      idPais: 71,
    };

    const { data } = (await api2.post(
      `${CREATE_DISPOSITIVO}`,
      dispositivo,
    )) as any;

    const { id } = data;

    const sendSms = {
      idDispositivo: id,
      agenteNotificador: 2,
      destinatario: phone,
    };

    const dados = (await api2.post(`${VALIDACAO_EMAIL}`, sendSms)) as any;

    return dados.data.codigo;
  }, []);

  const handleValidationEmail = useCallback(async (email: string) => {
    const api2 = axios.create({
      baseURL: 'https://notificacoes-api.uzerpass.com.br',
      headers: {
        'Content-Type': 'application/json',
        apiKey: '59d7547b-cc92-48b9-98a1-fdad9603ef2a',
      },
    });

    const dispositivo = {
      id: null,
      token: 'string',
      idPessoa: null,
      idPessoaLegada: 0,
      idPais: 71,
    };

    const { data } = (await api2.post(
      `${CREATE_DISPOSITIVO}`,
      dispositivo,
    )) as any;

    const { id } = data;

    const sendEmail = {
      idDispositivo: id,
      agenteNotificador: 1,
      destinatario: email,
    };

    const dados = (await api2.post(`${VALIDACAO_EMAIL}`, sendEmail)) as any;

    return dados.data.codigo;
  }, []);

  const handleCheckCountExistV2 = useCallback(
    async (
      documento: string,
      email?: string,
      idPais?: number,
      idTipo?: number,
    ) => {
      let path = `${CHECK_COUNT_EXIST}`;

      if (!email) {
        path += `?documento=${documento}`;
      } else {
        path += `?email=${email}`;
      }

      if (idPais) {
        path += `&idPais=${idPais}`;
      }
      if (idTipo) {
        path += `&idTipoDocumento=${idTipo}`;
      }
      const { data } = (await api.get(path)) as {
        data: any;
      };

      return data;
    },
    [],
  );

  const handleSubmit = useCallback(
    async (
      user: IUser,
      register?: boolean,
      type = 'cpf',
      onClickPurchase?: () => void,
    ) => {
      try {
        debugger;
        setIsLoading(true);
        let isFormattedCPFOrEmail = '';
        if (type === 'cpf' && user.cpf) { isFormattedCPFOrEmail = user.cpf.replace(/[^\d]/g, ''); }
        if (type === 'email' && user.cpf) isFormattedCPFOrEmail = user.cpf;
        const { data } = await api(
          `${GENARATE_TOKEN}`,
          {
            method: 'POST',
            data: {
              grant_type: 'password',
              username: isFormattedCPFOrEmail,
              password: user.senha,
            },
            headers: {
              Authorization: `Basic ${isInfosAuthorization.base64}`,
              Accept: '*/*',
            },
          },
        );

        if (data.access_token) {
          (
              apiTokeUser.defaults.headers 
          ).Authorization = `Bearer ${data.access_token}`;
          const isUser = await handleGetUser(data.access_token);
          setIsUser(isUser);
          if (!isUser.imagem) {
            setIsToken(data.access_token);
            Cache.set({
              key: '@tokenUser',
              value: data.access_token,
            });
            // cookies().set('@tokenUser', data.access_token);
          } else {
            Cache.set({
              key: '@tokenUser',
              value: data.access_token,
            });
            // cookies().set('@tokenUser', data.access_token);
            (
              apiTokeUser.defaults.headers
            ).Authorization = `Bearer ${data.access_token}`;
          }

          if(onClickPurchase)
            onClickPurchase();

          if (register || isStepper == 0) {
            if (onClickPurchase) {
              onClickPurchase();
            } else {
              push('/');
            }
          }
        }


        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        callErrorDialogComponent('Senha inválida. Verifique', TypeEnum.ERROR);
      }
    },
    [isInfosAuthorization, handleLoadUser, showErrorDialog, push, handleGetUser],
  );

  const handleSendEmailForgotPassword = useCallback(
    async (token: string, email: string) => {
      try {
        let tokenCerto = token;
        if (!token) {
          const { data } = (await api.get(
            `${GET_TOKEN_RESET_PASSWORD}${email}`,
          )) as {
            data: {
              usuarios: {
                cpf: string;
                nome: string;
                email: string;
                token: string;
              }[];
            };
          };

          tokenCerto = data.usuarios[0].token;
        }

        setIsLoading(true);
        const { data } = (await api.post(SEND_EMAIL_RESET_PASSWORD, {
          token: tokenCerto,
        })) as { data: { sucesso: boolean; mensagem?: string } };

        if (data) {
          if (data.sucesso) {
            setIsSuccessSendEmail(data.sucesso);
          } else {
            callErrorDialogComponent(
              data.mensagem ?? 'Ocorreu um erro de comunicação.',
            );
          }
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        callErrorDialogComponent(
          'Ocorreu um erro de comunicação.',
          TypeEnum.ERROR,
        );
      }
    },
    [showErrorDialog],
  );

  const handleDataForgotPassword = useCallback(
    async (email: string) => {
      try {
        setIsLoading(true);
        const { data } = (await api.get(
          `${GET_TOKEN_RESET_PASSWORD}${email}`,
        )) as {
          data: {
            usuarios: {
              cpf: string;
              nome: string;
              email: string;
              token: string;
            }[];
          };
        };

        if (data && data.usuarios && data.usuarios.length > 0) {
          setIsLoading(false);
          setIsDataForgotPassword({
            cpf: data?.usuarios[0]?.cpf,
            email: data.usuarios[0].email,
            nome: data.usuarios[0].nome,
            token: data.usuarios[0].token,
          });
        } else {
          setIsLoading(false);
          callErrorDialogComponent(
            'Usunário não existe. Verifique.',
            TypeEnum.ERROR,
          );
        }
      } catch (err) {
        setIsLoading(false);
        callErrorDialogComponent(
          'Ocorreu um erro de comunicação.',
          TypeEnum.ERROR,
        );
      }
    },
    [showErrorDialog],
  );

  const handleCheckCountExistV3 = useCallback(async (token: string) => {
    const api2 = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = (await api2.get(`${CREATE_USER}`)) as any;

    return data;
  }, []);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSubmitRegister = useCallback(
    async (data: IUser, onClickPurchase?: () => void, finish?: boolean) => {
      try {
        if (onClickPurchase && finish) {
          handleSubmit(
            {
              cpf: data.email,
              senha: data.senha || '',
            },
            false,
            'email',
            onClickPurchase,
          );
          return;
        } if (!onClickPurchase && finish) {
          handleSubmit(
            {
              cpf: data.email,
              senha: data.senha || '',
            },
            true,
            'email',
          );
          return;
        }
        const { data: resultCodeIbge } = (await api.get(
          `${GET_CITY_CODE_IBGE}/${data?.endereco?.codigoIbge}`,
        )) as { data: CityCodeIBGEProps[] };

        setIsLoading(true);
        const isFormattedUser: IUser = {
          nome: data.nome,
          telefone:
            data.telefone
            && data.telefone
              .replace('(', '')
              .replace(')', '')
              .replace(' ', '')
              .replace('-', ''),
          email: data.email,
          senha: data.senha,
          dataNascimento:
            data.dataNascimento
            && data.dataNascimento.split('/').reverse().join('-'),
          telefoneDDI: data.DD,
          endereco: {
            cep: data.endereco?.cep?.replace('-', ''),
            logradouro: data.endereco?.logradouro,
            complemento: data.endereco?.complemento,
            bairro: data.endereco?.bairro,
            numero: data.endereco?.numero ?? 'S/N',
            cidade:
              resultCodeIbge && resultCodeIbge.length > 0
                ? {
                  id: resultCodeIbge[0].id,
                  nome: resultCodeIbge[0].nome,
                }
                : undefined,
          },
          imagem: data.imagem,
        };

        if (isSelectCountry.nomePais === 'Brasil') {
          isFormattedUser.cpf = data.CPF;
        } else {
          isFormattedUser.documentoEstrangeiro = data.numeroDoc;
          isFormattedUser.idPais = data.idPais;
          isFormattedUser.idTipoDocumento = data.idTipoDocumento;
          delete isFormattedUser.endereco
        }

        let result = null;
        if (!isInvalidPicture) {
          result = (await api.post(CREATE_USER, isFormattedUser)) as {
            data: { mensagem: string; sucesso: boolean };
          };

          if (!result?.data?.sucesso) {
            setIsStepper(4);
            setIsLoading(false);
            callErrorDialogComponent(result?.data?.mensagem as string);
            return;
          }

          setCreatedUser(true);
          await sleep(6000);
        }
        
        debugger;
        // const url = `${baseUrl}${GENARATE_TOKEN}`;

        const token = await api(
          `${GENARATE_TOKEN}`,
          {
            method: 'POST',
            data: {
              grant_type: 'password',
              username: data?.CPF ? data?.CPF?.replace(/[^\d]/g, '') : data?.email,
              password: data.senha,
            },
            headers: {
              Authorization: `Basic ${isInfosAuthorization.base64}`,
              Accept: '*/*',
            },
          },
        );

        const dados: any = await handleCheckCountExistV3(
          token.data.access_token,
        );
        setIsLoading(false);

        setPhotoInvalida(dados?.data.statusSincronia);
        if (!isInvalidPicture) {
          if (
            dados?.data.statusSincronia !== 200
            && dados?.data.statusSincronia !== 0
          ) {
            setIsInvalidPicture(true);
            callErrorDialogComponent(
              'Algo deu errado com sua foto, por favor, tente novamente seguindo as instruções.',
              TypeEnum.ERROR,
            );
            return;
          }
        }

        if (isInvalidPicture) {
          let dados: any = await handleCheckCountExistV3(
            token.data.access_token,
          );

          isFormattedUser.id = dados.data.id;

          result = await axios.put(
            `${baseUrl}${UPDATED_USER}/${dados.data.id}`,
            isFormattedUser,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.data.access_token}`,
              },
            },
          );

          await sleep(6000);

          dados = await handleCheckCountExistV3(token.data.access_token);

          setPhotoInvalida(dados?.data.statusSincronia);

          if (
            dados?.data.statusSincronia !== 200
            && dados?.data.statusSincronia !== 0
          ) {
            setIsInvalidPicture(true);
            callErrorDialogComponent(
              'Algo deu errado com sua foto, por favor, tente novamente seguindo as instruções.',
              TypeEnum.ERROR,
            );
            return;
          }
          result = (await api.post(CREATE_USER, isFormattedUser)) as {
              data: { mensagem: string; sucesso: boolean };
            };
          setIsInvalidPicture(false);
        }

        setIsLoading(false);

        if (result?.data?.sucesso) {
          callErrorDialogComponent(
            'Parabéns. Seu usuário foi criado com sucesso!',
            TypeEnum.SUCCESS,
          );
          setCreatedUser(true);
        }
        if (!result?.data?.sucesso) {
          setIsStepper(4);
          callErrorDialogComponent(result?.data?.mensagem as string);
        }
      } catch (err: AxiosError | any) {
        setIsLoading(false);

        if (err instanceof AxiosError) {
          callErrorDialogComponent(
            `Ocorreu um erro de comunicação. (${err?.response?.status})`,
            TypeEnum.ERROR,
          );
        } else {
          callErrorDialogComponent(
            'Ocorreu um erro de comunicação.',
            TypeEnum.ERROR,
          );
        }
      }
    },
    [isPhotoAvatar, callErrorDialogComponent, handleCheckCountExistV3, handleSubmit, isInfosAuthorization, isInvalidPicture, isSelectCountry],
  );

  const handleSelectStepper = useCallback(
    (stepper: number) => setIsStepperEditUser(stepper),
    [],
  );

  const handleNextStepRegister = useCallback(
    async (data: IUser, onClickPurchase?: () => void, finish?: boolean) => {
      try {
        debugger;
        setIsLoadingCountry(true);
        const isVerifyForNextStep = isSelectCountry.nomePais === 'Brasil' ? data.CPF : data.numeroDoc;
        if (data.nome && isVerifyForNextStep && isStepper === 0) {
          setIsLoading(true);
          let exists = false;
          const existEmail = false;
          if (data.CPF) {
            exists = await handleCheckCountExist(
              data.CPF.replace(/[^\d]/g, ''),
              undefined,
              data.idPais,
              data.idTipoDocumento,
            );
          } else {
            exists = await handleCheckCountExist(
              data.numeroDoc ?? '',
              undefined,
              data.idPais,
              data.idTipoDocumento,
            );
          }

          setIsLoading(false);
          if (exists || existEmail) {
            callErrorDialogComponent(
              `Já existe um usuário utilizando esse ${
                exists ? 'CPF' : 'E-mail'
              }.`,
              TypeEnum.ERROR,
            );
          } else {
            setIsStepper(1);
          }
        }
        if (data.telefone && isStepper === 1) {
          setIsLoading(false);
          setIsStepper(2);
        }
        if(data.idTipoDocumento && isTypesDoc.length > 0 && isStepper === 0){
          setIsStepper(2);
          return
        }
        if (data.endereco && isStepper === 2) {
          setIsStepper(3);
        }
        if(isStepper === 2 && data.idTipoDocumento && isTypesDoc.length > 0){
          setIsStepper(3);
        }
        if (isStepper === 3) {
          setIsStepper(4);
        }

        if (isStepper === 4 && isPhotoAvatar) {
          data.imagem = isPhotoAvatar;
          await handleSubmitRegister(data, onClickPurchase, finish);
        }
      } catch (err: any) {
        setIsLoading(false);
        callErrorDialogComponent(
          err?.response?.data?.erro ?? 'Já existe esse documento cadastrado.',
          TypeEnum.ERROR,
        );
      }
    },
    [
      setIsStepper,
      isStepper,
      handleSubmitRegister,
      isSelectCountry.nomePais,
      handleCheckCountExist,
      showErrorDialog,
      handleCheckEMAIL,
      isPhotoAvatar,
    ],
  );

  const handleUpdatedUserPhoto = useCallback(
    async (userEdit: IUser) => {
      try {
        debugger;
        const isUserFormatted = {
          nome: userEdit.nome,
          email: userEdit.email,
          telefone: userEdit.telefone,
          telefoneDDI: userEdit.telefoneDDI,
          endereco: {
            cep: userEdit.endereco?.cep,
            logradouro: userEdit.endereco?.logradouro,
            complemento: userEdit.endereco?.complemento,
            bairro: userEdit.endereco?.bairro,
            numero: userEdit.endereco?.numero,
            cidade: userEdit.endereco?.nomeCidade,
            estado:
              userEdit.endereco?.estado
              ?? (userEdit?.endereco?.localidade
                ? userEdit?.endereco?.localidade.split('/')[1]
                : undefined),
          },
          id: userEdit?.id,
          imagem: isPhotoAvatar,
          idPais: userEdit.idPais,
          idTipoDocumento: userEdit.idTipoDocumento,
          dataNascimento: userEdit.dataNascimento
            ? userEdit.dataNascimento.split(' ')[0]
            : userEdit.dataNascimento,
        } as IUser;

        if (userEdit.cpf) {
          isUserFormatted.cpf = userEdit.cpf;
        }
        if (userEdit.documentoEstrangeiro) {
          isUserFormatted.documentoEstrangeiro = userEdit.documentoEstrangeiro;
        }

        const { data: resultData } = (await axios.put(
          `${baseUrl}${UPDATED_USER}/${userEdit.id}`,
          isUserFormatted,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${isToken}`,
              'X-Requested-With': 'XMLHttpRequest',
            },
          },
        )) as { data: { sucesso: boolean; mensagem?: string } };

        if (resultData.sucesso) {
          setIsNotUserPhoto(undefined);
          // cookies().set('@tokenUser', isToken);
          Cache.set({
            key: '@tokenUser',
            value: isToken,
          });
          showErrorDialog('Foto adicionada com sucesso.', TypeEnum.SUCCESS);
          setIsUser((current) => ({
            ...current,
            userEdit,
          }));
          await handleLoadUser();
        } else {
          callErrorDialogComponent(
            resultData.mensagem ?? 'Ocorreu um erro de comunicação.',
            TypeEnum.ERROR,
          );
        }
      } catch (err: any) {
        setIsLoadingSubmitUpdatedUser(false);
        callErrorDialogComponent(
          'Ocorreu um erro na listagem dos países.',
          TypeEnum.ERROR,
        );
      }
    },
    [showErrorDialog, isToken, handleLoadUser, isPhotoAvatar, setIsUser],
  );

  const handleUpdatedUser = useCallback(
    async (userEdit: IUser) => {
      debugger;
      try {
        setIsLoadingSubmitUpdatedUser(true);
        if (user) {
          const isUserFormatted = {
            ...userEdit,
            endereco: {
              cep: userEdit.endereco?.cep,
              logradouro: userEdit.endereco?.logradouro,
              complemento: userEdit.endereco?.complemento,
              bairro: userEdit.endereco?.bairro,
              numero: userEdit.endereco?.numero
                ? userEdit.endereco?.numero
                : 'S/N',
              localidade: `${userEdit.endereco?.nomeCidade}/${
                userEdit.endereco?.estado
                  ? states.find(
                    (state) => state.estado === userEdit.endereco?.estado,
                  )?.uf ?? userEdit.endereco.estado
                  : userEdit.endereco?.estado
              }`,
              nomeCidade: userEdit.endereco?.nomeCidade,
              uf: userEdit.endereco?.estado
                ? states.find(
                  (state) => state.estado === userEdit.endereco?.estado,
                )?.uf ?? userEdit.endereco.estado
                : userEdit.endereco?.estado,
              codigoIbge: userEdit.endereco?.codigoIbge
                ? Number(userEdit.endereco?.codigoIbge)
                : userEdit.endereco?.codigoIbge,
              uzerId: user.endereco?.uzerId,
            },
            id: user?.id,
            idPais: user.idPais,
            idTipoDocumento: user.idTipoDocumento,
            dataNascimento: userEdit.dataNascimento
              ? userEdit.dataNascimento.split('/').reverse().join('-')
              : user.dataNascimento,
          } as IUser;

          if (user.cpf) {
            isUserFormatted.cpf = user.cpf;
          }
          if (user.documentoEstrangeiro) {
            isUserFormatted.documentoEstrangeiro = user.documentoEstrangeiro;
          }

          const { data: resultData } = (await apiTokeUser.put(
            `${UPDATED_USER}/${isUserFormatted.id}`,
            isUserFormatted,
          )) as { data: { sucesso: boolean; mensagem?: string } };

          if (resultData.sucesso) {
            const isNewUser = await onFindUser();

            if (isNewUser) {
              setIsUser(isNewUser);
            } else {
              setIsUser((current) => ({
                ...current,
                ...isUserFormatted,
              }));
            }
            callErrorDialogComponent(
              'Dados atualizados com sucesso.',
              TypeEnum.SUCCESS,
            );
            handleCloseModalEditUser();
            handleSelectStepper(0);
          } else {
            callErrorDialogComponent(
              resultData.mensagem ?? 'Ocorreu um erro na listagem dos países.',
              TypeEnum.ERROR,
            );
          }
        }
        setIsLoadingSubmitUpdatedUser(false);
      } catch (err: any) {
        setIsLoadingSubmitUpdatedUser(false);
        callErrorDialogComponent(
          'Ocorreu um erro na listagem dos países.',
          TypeEnum.ERROR,
        );
      }
    },
    [showErrorDialog, user, setIsUser, handleSelectStepper, onFindUser],
  );

  const handleNextStep = useCallback(
    async (data: IUser, toImageAvatar?: string, onClickPurchase?: () => void) => {
      let defaultValues = {};

      try {
        if (data.cpf && data.type === 'cpf' && !toImageAvatar) {
          setIsLoading(true);
          const exists = await handleCheckCountExist(
            data.cpf.replace(/[^\d]/g, ''),
          );

          const { usuario } = await handleCheckCountExistV2(
            data.cpf.replace(/[^\d]/g, ''),
          );

          defaultValues = {
            nome: usuario?.nome,
            dataNascimentoCpf: format(
              parseISO(usuario?.dataNascimento),
              'dd/MM/yyyy',
            ),
            email: usuario?.email,
            CPF: data.cpf,
            idPais: usuario?.idPais,
          };

          
          if(!exists)
            setDefaultValues(defaultValues);
          else
            setForgotPasswordDefaultValues(defaultValues);
          
            setIsLoading(false);
          if (exists) {
            setIsStepper(1);
          } else {
            setUserNotExist(true);
          }
        }
        if (data.email && data.type === 'email' && !toImageAvatar) {
          defaultValues = {
            ...defaultValues,
            email: data.email,
          };

          setIsLoading(true);
          const exists = await handleCheckEMAIL(data.email);
          setDefaultValues(defaultValues);
          setIsLoading(false);
          if (exists) {
            setIsStepper(1);
          } else {
            setUserNotExist(true);
          }
        }

        if (
          (data.senha || data.email)
          && isStepper > 0
          && !isForgotPassword
          && !toImageAvatar
        ) {
          await handleSubmit(
            {
              senha: data.senha,
              cpf: data.type === 'email' && data.email ? data.email : data.cpf,
            },
            false,
            data.type,
            onClickPurchase,
          );
        }
        if (isForgotPassword && !toImageAvatar) {
          if (data.email && data.type === 'email') { handleDataForgotPassword(data.email); }
          if (data.cpf && data.type === 'cpf') { handleDataForgotPassword(data.cpf.replace(/[^\d]/g, '')); }
        }
        if (toImageAvatar) {
          setIsLoading(true);
          await handleUpdatedUserPhoto(data);
        }
        setIsLoading(false);
        if (!data.cpf && !data.senha && !toImageAvatar) {
          return null;
        }
      } catch (err: any) {
        setIsLoading(false);
        showErrorDialog(
          err?.response?.data?.erro ?? 'Já existe esse documento cadastrado.',
          TypeEnum.ERROR,
        );
      }
    },
    [
      isStepper,
      handleSubmit,
      isForgotPassword,
      handleDataForgotPassword,
      handleCheckEMAIL,
      handleCheckCountExist,
      showErrorDialog,
      handleUpdatedUserPhoto,
      setIsUserNotExistsCPF,
      setDefaultValues,
    ],
  );

  const handleSelectCountry = useCallback((country: CountriesProps) => {
    setIsSelectCountry(country);
  }, []);

  const handleLoadCountries = useCallback(async () => {
    try {
      if (!(isCountries.length > 2)) {
        setIsLoadingCountry(true);
        const { data } = (await api.get(LIST_COUNTRIES)) as {
          data: CountriesProps[];
        };
        setIsCountries(data);
        setIsLoadingCountry(false);
      }
    } catch (err: any) {
      setIsLoadingCountry(false);
      showErrorDialog(
        'Ocorreu um erro na listagem dos países.',
        TypeEnum.ERROR,
      );
    }
  }, [showErrorDialog, authentication, isCountries]);

  const handleLoadTypeDocument = useCallback(
    async (country: string) => {
      try {
          setIsLoadingCountry(true);
          const { data } = (await api.get(
            `${GET_TYPE_DOCUMENT}/${country}`,
          )) as {
            data: ITypeDoc[];
          };

          setIsTypesDoc(data);
        setIsLoadingCountry(false);
      } catch (err: any) {
        setIsLoadingCountry(false);
        showErrorDialog(
          err.message ?? 'Ocorreu um erro de comunicação.',
          TypeEnum.ERROR,
        );
      }
    },
    [showErrorDialog, authentication],
  );

  const handleAddPhoto = useCallback((photo?: string) => {
    setIsPhotoAvatar(photo);
    setPhoto(photo as any);
  }, [isPhotoAvatar]);

  const handleSubmitUpdatedUser = useCallback(
    async (userEdit: IUser) => {
      if (
        userEdit.nome
        && userEdit.email
        && userEdit.telefoneDDI
        && userEdit.telefone
        && userEdit.dataNascimento
        && isStepperEditUser === 0
      ) {
        handleSelectStepper(1);
      }
      if (
        userEdit.endereco
        && userEdit.endereco.cep
        && userEdit.endereco.logradouro
        && userEdit.endereco.bairro
        && userEdit.endereco.nomeCidade
        && isStepperEditUser === 1
      ) {
        await handleUpdatedUser(userEdit);
      }
    },
    [handleSelectStepper, isStepperEditUser, handleUpdatedUser],
  );

  useEffect(() => {
    handleLoadCountries();
  }, [handleLoadCountries, authentication, isPhotoAvatar]);

  return (
    <AuthContext.Provider
      value={{
        handleNextStep,
        handleInfoCpf,
        handleValidationEmail,
        handleValidationPhone,
        isStepper,
        setIsStepper,
        isLoading,
        userNotExist,
        emailValidado,
        setEmailValidado,
        setUserNotExist,
        handleNextStepRegister,
        handleCheckCPF,
        photoInvalida,
        setPhotoInvalida,
        setPhoto,
        photo,
        forgotPassword: isForgotPassword,
        handleForgotPassword,
        handleForgotPasswordBack,
        setIsForgotPassword,
        dataForgotPassword: isDataForgotPassword,
        handleSendEmailForgotPassword,
        handleDeleteUser,
        handleDataForgotPasswordBack,
        successSendEmail: isSuccessSendEmail,
        countries: isCountries,
        selectCountry: isSelectCountry,
        onSelectCountry: handleSelectCountry,
        onLoadTypeDocument: handleLoadTypeDocument,
        typesDoc: isTypesDoc,
        loadingCountry: isLoadingCountry,
        onAddPhoto: handleAddPhoto,
        photoAvatar: isPhotoAvatar,
        onToPhoto: handleToPhoto,
        toPhoto: isToPhoto,
        onLoadCountries: handleLoadCountries,
        onSelectStepper: handleSelectStepper,
        stepperEditUser: isStepperEditUser,
        checkEmailExistente,
        onSubmitUpdatedUser: handleSubmitUpdatedUser,
        setValidateEmail,
        validateEmail,
        onClsoeModalEditUser: handleCloseModalEditUser,
        onOpenModalEditUser: handleOpenModalEditUser,
        updatedUserModal: isUpdatedUserModal,
        loadingSubmitUpdatedUser: isLoadingSubmitUpdatedUser,
        notUserPhoto: isNotUserPhoto,
        setIsNotUserPhoto,
        setIsInvalidPicture,
        isInvalidPicture,
        setCreatedUser,
        createdUser,
        onUpdatedUser: handleUpdatedUser,
        handleUpdateEmail,
        forgotPasswordDefaultValues,
        isAuthModalOpen,
        setIsAuthModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuth => {
  const context = useContext(AuthContext);
  return context;
};
