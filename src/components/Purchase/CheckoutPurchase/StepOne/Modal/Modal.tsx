import React, { useEffect, useMemo, useState } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Close } from '@/components/icons/Close';
import { IconButton } from '@/components/IconButton';
import { theme } from '@/shared';
import { Alert } from '@/components/Alert';
import { CountriesProps, IAlert, ITypeDoc } from '@/types';
import { Input } from '@/components/Form/Input';
import { useForm, FormProvider } from 'react-hook-form';
import { CPFMask, INTERNATIONALNUMBERMask, TELEFONEMask } from '@/shared/config/mask';
import { cpf, telefone } from '@/shared/config/regex';
import { Button } from '@/components/Form/Button';
import { IUser } from '@/types';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { useRegister } from '@/shared/hooks/useRegister';
import { TypeEnum, useError } from "@/shared/hooks/useDialog";
import { validateCPF } from '@/shared/config/validateCPF';
import { IconInfo } from '@/components/icons/IconInfo';
import { ContainerModal } from './styles';
import { IModal } from './interface';
import {Modal as MuiModal} from '@mui/material'
import { Select } from '@/components/Form/Select';
import { api, GET_TYPE_DOCUMENT, LIST_COUNTRIES } from '@/services';

export const Modal: React.FC<IModal> = ({ onClose, index, idTipo, open = true }) => {
  const methods = useForm<IUser & {internationalPhone?: string}>();
  const { selectedUser, loadingSelectUser, ticketSelectedUser } = useTicketPurchase();
  const { user } = useRegister();
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const isCpf = methods.watch('cpf')

  const [isForeign, setIsForeign] = useState<boolean>(false)

  const isError = useMemo((): boolean => {
    if(!isForeign)
      return Object.keys(methods.formState.errors).length > 0;
    return Object.keys(methods.formState.errors).length > 1;
  }, [methods.formState]);

  const onSubmit = async (data: IUser) => {

    if (user && user.cpf && data.cpf && (user.cpf === data.cpf.replace('.', '').replace('.', '').replace('-', '') || data.nome === user.nome)) {
      callErrorDialogComponent('Usuário inserido é igual ao seu. Verifique!', TypeEnum.ERROR);
      return;
    }
    if (user && data.nome === user.nome) {
      callErrorDialogComponent('Usuário inserido é igual ao seu. Verifique!', TypeEnum.ERROR);
      return;
    }
    if (user && data.email === user.email) {
      callErrorDialogComponent('E-mail é igual ao seu. Verifique!', TypeEnum.ERROR);
      return;
    }
    if (ticketSelectedUser && data.cpf && data.cpf.length > 4 && (ticketSelectedUser.find((item) => item.cpf === data.cpf) || ticketSelectedUser.find((item) => item.nome === data.nome))) {
      callErrorDialogComponent('Usuário já está sendo usado. Verifique!', TypeEnum.ERROR);
      return;
    }

    if (isForeign) {
      data.idPais = data.idPais;
      data.idTipoDocumento = data.idTipoDocumento;
      data.numeroDoc = data.numeroDoc;
      data.telefone = (data as any).internationalPhone;
    }

    await selectedUser('transfer', index, idTipo, data);
    onClose();

  };

  const isText = useMemo(() => {
    return (
        <p className='text-[#000]'>Os dados precisam ser reais para o acesso biométrico funcionar corretamente.
        </p>
    )
  }, [])

  useEffect(() => {
    if(isCpf && isCpf.length >= 14) {
        const formattedCpf = isCpf.replaceAll('.', '').replace('-', '')
        if(formattedCpf === user?.cpf) {
            callErrorDialogComponent('O CPF digitado já é o titular desse ingresso. Informe o CPF para quem deseja transferir o ingresso.', TypeEnum.INFO)
            methods.setValue('cpf', '')
        }
    }
  }, [isCpf])

  const [typesDoc, setIsTypesDoc] = useState<ITypeDoc[]>([]);

  const [countries, setCountries] = useState<CountriesProps[]>([]);

  const [selectCountry, setSelectCountry] = useState<CountriesProps | undefined>();

  const [isLoadingCountries, setIsLoadingCountries] = useState<boolean>(false);
  const [isLoadingTypesDoc, setIsLoadingTypesDoc] = useState<boolean>(false);

  const handleLoadTypeDocument = async (country: string | number) => {
      try { 
        setIsLoadingTypesDoc(true);
          const { data } = (await api.get(
            `${GET_TYPE_DOCUMENT}/${country}`,
          )) as {
            data: ITypeDoc[];
          };

          setIsTypesDoc(data); 
          if(data.length > 0)
            methods.setValue('idTipoDocumento', data[0]?.id);
      } catch (err: any) { 
        showErrorDialog(
          err.message ?? 'Ocorreu um erro de comunicação.',
          TypeEnum.ERROR,
        );
      } finally {
        setIsLoadingTypesDoc(false);
      }
    }

    const handleLoadCountries = async () => {
      try {
        setIsLoadingCountries(true);
        if (!(countries.length > 2)) { 
          const { data } = (await api.get(LIST_COUNTRIES)) as {
            data: CountriesProps[];
          };
          setCountries(data); 
        }
      } catch (err: any) { 
        showErrorDialog(
          'Ocorreu um erro na listagem dos países.',
          TypeEnum.ERROR,
        );
      }
      finally {
        setIsLoadingCountries(false);
      }
    }

    useEffect(() => {
      handleLoadCountries();
    }, []);

    const handleChangeCountry = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const country = countries.find((country) => country.id === Number(e.target.value));
      setSelectCountry(country);
      methods.setValue('idPais', country?.id);
      handleLoadTypeDocument(country?.id ?? '');
    };


  return (
    <ContainerModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div
        className='bg-white rounded-xl'
      >
      <div className="header">
        <h6 className="title">Dados do titular</h6>
        <div className="on-close">
          <IconButton onClick={onClose}>
            <Close color={'#8779F8'} width={24} height={24} />
          </IconButton>
        </div>
      </div>
      <div className="content-modal">
        <Alert html={isText} variant={IAlert.WARNING} />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <div className="forms-inputs">
              {
                !isForeign ? <>
                  <div className="is-name">
                    <Input
                      disabledClean
                      type="text"
                      name="nome"
                      id="nome"
                      label="Nome completo"
                      rules={{
                        required: {
                          value: true,
                          message: 'Nome inválido. Verifique',
                        },
                      }}
                      disabled={false}
                      errorText={methods.formState.errors.nome && methods.formState.errors.nome.message as string}
                    />
                  </div>
                  <div className="is-cpf">
                    <Input
                      type="tel"
                      name="cpf"
                      id="cpf"
                      label="CPF"
                      rules={{
                        required: {
                          value: true,
                          message: 'CPF inválido. Verifique',
                        },
                        minLength: {
                          value: 14,
                          message: 'CPF inválido. Verifique',
                        },
                        maxLength: {
                          value: 14,
                          message: 'CPF inválido. Verifique',
                        },
                        pattern: {
                          value: cpf,
                          message: 'CPF inválido. Verifique',
                        },
                        validate: (cpf: string) => {
                          return validateCPF(cpf) ? true : 'CPF inválido.Verifique';
                        },
                      }}
                      disabled={false}
                      mask={CPFMask}
                      errorText={methods.formState.errors.cpf && methods.formState.errors.cpf.message as string}
                      disabledClean
                    />
                  </div>
                  <div>
                    <Input
                      disabledClean
                        type="tel"
                        name="telefone"
                        id="telefone"
                        label="Telefone"
                        rules={
                          {
                            required: {
                            value: true,
                            message: 'Telefone inválido. Verifique',
                            },
                            minLength: {
                            value: 15,
                            message: 'Telefone inválido. Verifique',
                            },
                            maxLength: {
                            value: 15,
                            message: 'Telefone inválido. Verifique',
                            },
                            pattern: {
                            value: telefone,
                            message: 'Telefone inválido. Verifique',
                            },
                        }}
                        disabled={loadingSelectUser}
                        mask={TELEFONEMask}
                        errorText={methods.formState.errors.telefone && methods.formState.errors.telefone.message as string}
                        />
                  </div> 
                  <Input
                      disabledClean
                    type="email"
                    name="email"
                    id="email"
                    label="Email"
                    rules={{
                      required: {
                        value: true,
                        message: 'E-mail inválido. Verifique',
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*$/,
                        message: 'E-mail inválido. Verifique',
                      },
                    }}
                    disabled={loadingSelectUser}
                    errorText={methods.formState.errors.email && methods.formState.errors.email.message as string}
                  />
                </> : <>  
                {countries.length > 2 && <Select
                    name="idPais"
                    id='idPais' 
                    disabled={isLoadingCountries}
                    loading={isLoadingCountries} 
                    label="País"
                    onChange={handleChangeCountry}
                    options={
                      countries?.map((country) => ({
                        value: country.id,
                        innerText: country.nomePais,
                      }))
                    }
                    rules={{
                      required: {
                        value: true,
                        message: 'País inválido. Verifique',
                      },
                    }}
                  />}
      
                  <Select
                    name="idTipoDocumento"
                    id="idTipoDocumento"
                    defaultValue={typesDoc && typesDoc[0]?.id}
                    loading={isLoadingTypesDoc}
                    label="Documento" 
                    disabled={isLoadingTypesDoc || !selectCountry}
                    options={
                      typesDoc && typesDoc?.length > 0 && typesDoc?.map((typeDoc) => ({
                      innerText: typeDoc.nomeTipoDocumento,
                      value: typeDoc.id,
                      })) 
                    }
                  />  
                  <Input
                    disabledClean 
                    id="numeroDoc"
                    disabled={false}
                    label="Nº do documento"
                    name="numeroDoc"
                    type="text"
                    rules={{
                      required: {
                        value: true,
                        message: "Nº do documento inválido. Verifique",
                      },
                    }}
                    errorText={
                      methods.formState.errors.numeroDoc &&
                      (methods.formState.errors.numeroDoc.message as string)
                    }
                  />
                  <Input
                    disabledClean
                    type="text"
                    name="nome"
                    id="nome"
                    label="Nome completo"
                    rules={{
                      required: {
                        value: true,
                        message: 'Nome inválido. Verifique',
                      },
                    }}
                    disabled={false}
                    errorText={methods.formState.errors.nome && methods.formState.errors.nome.message as string}
                  />
                  
                  <div>
                    <Input
                      disabledClean
                        type="tel"
                        name="internationalPhone"
                        id="internationalPhone"
                        label="Telefone"
                        rules={{
                            required: {
                            value: true,
                            message: 'Telefone inválido. Verifique',
                            }, 
                        }}
                        disabled={loadingSelectUser}
                        mask={INTERNATIONALNUMBERMask}
                        errorText={methods.formState.errors.internationalPhone && methods.formState.errors.internationalPhone.message as string}
                        />
                  </div> 
                  <Input
                      disabledClean
                    type="email"
                    name="email"
                    id="email"
                    label="Email"
                    rules={{
                      required: {
                        value: true,
                        message: 'E-mail inválido. Verifique',
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*$/,
                        message: 'E-mail inválido. Verifique',
                      },
                    }}
                    disabled={loadingSelectUser}
                    errorText={methods.formState.errors.email && methods.formState.errors.email.message as string}
                  />
                </>
              }
            </div>
            <span
              className='text-primary cursor-pointer hover:underline mt-4'
              onClick={() => setIsForeign(!isForeign)}
            >
              {
                isForeign ? 'Titular brasileiro? Clique aqui' : 'Titular estrangeiro? Clique aqui'
              }
            </span>
            <div className="buttons">
              <Button type="submit" disabled={isError} text="Confirmar" variant="small" loading={loadingSelectUser} />
            </div>
          </FormProvider>
        </form>
      </div>
      </div>

    </ContainerModal>
  );
};
