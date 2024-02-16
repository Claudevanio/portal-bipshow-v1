"use client";
import { Avatar, Button } from "@/components";
import { AvatarWithTabs } from "../../components/AvatarWithTabs/AvatarWithTabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import MeusIngressos from "../meus-ingressos/page";
import { userService } from "@/services";
import { IUser } from "@/types";
import { useRegister } from "@/shared/hooks/useRegister";
import { useAuth } from "@/shared/hooks/useAuth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FormAddress } from "@/components/FormAddress";
import { states } from "@/shared/config/states";
import { Orders } from './Orders';
import { OrdersProvider } from '@/shared/hooks/useOrders';
import { TicketsProvider } from '@/shared/hooks/useTickets';
import { Tickets } from './Tickets';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const { countries } = useAuth();
  const {
    user,
    setIsUser,
    handleUpdateUser,
    handleLogoutUser,
    isLoadingUpdatedAddress,
  } = useRegister();
  const [originalEmail, setOriginalEmail] = useState(user?.email);
  const router = useRouter();

  const {setIsAuthModalOpen} = useAuth();

  const searchParams = useSearchParams();
  const pathname = usePathname()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    debugger;
    setActiveTab(newValue);
    if (newValue == 0) {
      router.replace("/profile?tab=meus-ingressos");
    }
    if (newValue == 1) {
      router.replace("/profile");
    }
    if (newValue == 2) {
      router.replace("/profile?tab=orders");
    }
    if (newValue == 3) { 
      handleLogoutUser();
    }
  };
   
  useEffect(() => {
    function handleIsOrdersTab() {
      if (searchParams.get('tab') === 'orders') {
        setActiveTab(2);
      }
      if (searchParams.get('tab') === 'meus-ingressos') {
        setActiveTab(0);
      }
    }
    handleIsOrdersTab();
  }, [searchParams]);

  useEffect(() => {
    if (user && user.email) {
      setOriginalEmail(user.email);
    }
  }, [user]);

  const onSubmit = async (data: any) => {
    if (data) {
      await handleUpdateUser({
        ...data,
      });
    }
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      e.preventDefault();
      setIsEditing(true);
    }
  };

  const methods = useForm();

  const handleInputChange = (event: any, key: string) => {
    setIsUser({ ...user, [key]: event.target.value });
  };

  const getCountryName = (idPais: number) => {
    const countryToFind = countries?.find((country) => country.id == idPais);
    if (countryToFind) {
      return countryToFind.nomePais;
    }
    return "";
  };

  const getStateName = (uf: string) => {
    const stateToFind = states?.find((state) => state.uf == uf);
    if (stateToFind) {
      return stateToFind.estado;
    }
    return "";
  };

  const handleButtonClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleImageSelect;
    input.click();
  };

  const handleImageSelect = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (base64String) {
          setIsUser({ ...user, imagem: String(base64String) });
        }
        console.log("Imagem em base64:", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const shouldOpenAuthModal = () => {
    return !user?.id && !user;
  }


  useEffect(() => {
    let timeoutId : any;

    if (!user?.id || !user) {
      timeoutId = setTimeout(() => {
        setIsAuthModalOpen(shouldOpenAuthModal());
      }, 3000);
    } else {
      setIsAuthModalOpen(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user]);


  return (
        <div className="w-full flex flex-1 flex-row gap-2 px-4 md:px-14 xl:px-20 2xl:px-14  pt-10 pb-10 overflow-x-hidden">
          <AvatarWithTabs
            activeTab={activeTab}
            size="normal"
            handleChangeTab={handleChange}
          />
          <div className="w-full flex flex-1 flex-column gap-4 overflow-x-hidden">
            {activeTab == 1 && (
              <div className="flex-column gap-4 flex-1 p-4">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <div className="flex flex-row gap-3  w-full p-5 pb-4 items-center">
                  <Image src="/my-profile.svg" alt="" width={32} height={32} />
                  <h2 className="h-fit font-semibold text-2xl">Meu perfil</h2>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="relative">
                    <Avatar src={user?.imagem} size="medium" />
                  </div>

                  <Button
                    variant="secondary"
                    onClick={handleEditClick} // Chame a função de callback em vez de handleEdit diretamente
                    gray={!isEditing}
                  >
                    <Image
                      src={!isEditing ? "/edit.svg" : "/save.svg"}
                      width={16}
                      height={16}
                      alt=""
                    />
                    {isEditing ? "Salvar" : "Editar"}
                  </Button>
                </div>
                {isEditing == false && (
                  <>
                    <div className="mb-6">
                      <p className="text-sm font-normal">Nome</p>
                      <p className="text-lg font-medium">{user?.nome}</p>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-normal">E-mail</p>
                      <p className="text-lg font-medium">{user?.email}</p>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-normal">Celular</p>
                      <p className="text-lg font-medium">{user?.telefone}</p>
                    </div>
                    <div className="mb-6">
                    <p className=" text-lg font-normal mb-4">Endereço</p>
                      {/* <p className="text-sm font-normal">País</p>
                      <p className="text-lg font-medium">
                        {user?.idPais ? getCountryName(user.idPais) : "Nenhum"}
                      </p> */}
                      <p className="text-sm font-normal">CEP</p>
                      <p className="text-lg font-medium">
                        {user?.endereco?.cep?.trim() != ""
                          ? user?.endereco?.cep
                          : "Nenhum"}{" "}
                      </p>
                      <p className="text-sm font-normal">Rua</p>
                      <p className="text-lg font-medium">
                        {user?.endereco?.logradouro?.trim() != ""
                          ? user?.endereco?.logradouro
                          : "Nenhum"}{" "}
                      </p>
                      <p className="text-sm font-normal">Número</p>
                      <p className="text-lg font-medium">
                        {user?.endereco?.numero?.trim() != ""
                          ? user?.endereco?.numero
                          : "Nenhum"}{" "}
                      </p>
                      <p className="text-sm font-normal">Complemento</p>
                      <p className="text-lg font-medium">
                        {user?.endereco?.complemento?.trim() != ""
                          ? user?.endereco?.complemento
                          : "Nenhum"}{" "}
                      </p>
                      <p className="text-sm font-normal">Bairro</p>
                      <p className="text-lg font-medium">
                        {user?.endereco?.bairro?.trim() != ""
                          ? user?.endereco?.bairro
                          : "Nenhum"}{" "}
                      </p>
                      <p className="text-sm font-normal">Cidade</p>
                      <p className="text-lg font-medium">
                        {user?.endereco?.nomeCidade?.trim() != ""
                          ? user?.endereco?.nomeCidade
                          : "Nenhum"}{" "}
                      </p>
                      <p className="text-sm font-normal">Estado</p>
                      <p className="text-lg font-medium">
                        {user?.endereco?.uf?.trim() != ""
                          ? getStateName(user?.endereco?.uf!)
                          : "Nenhum"}
                      </p>
                    </div>
                  </>
                )}
                {isEditing == true && (
                  <div className="w-full md:w-[50%]">
                    <div
                      className="mb-6"
                    >
                      <p className="text-sm font-normal">Nome</p>

                      <TextField
                        disabled
                        value={user?.nome}
                        onChange={(e) => handleInputChange(e, "nome")}
                      />
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-normal">E-mail</p>

                      <TextField
                        disabled
                        value={user?.email}
                        onChange={(e) => handleInputChange(e, "email")}
                      />
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-normal">Celular</p>

                      <TextField
                        value={user?.telefone}
                        onChange={(e) => handleInputChange(e, "telefone")}
                      />
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-normal">Endereço</p>

                      <FormAddress
                        defaultValue={user?.endereco}
                        loading={isLoadingUpdatedAddress}
                        variant="normal"
                      />
                    </div>
                  </div>
                )}
              
      </FormProvider>
      </form>
              </div>
            )}
            {activeTab === 0 && <TicketsProvider>
              <Tickets/>
            </TicketsProvider> }
            {
              activeTab === 2 && (
                <OrdersProvider>
                  <Orders/>
                </OrdersProvider>
              )
            }
          </div>
        </div>
  );
}
