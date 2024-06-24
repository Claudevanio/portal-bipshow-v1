import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AuthProvider } from '@/shared/hooks/useAuth';
// import { Loading } from "@/components/Loading";
import { useRegister } from '@/shared/hooks/useRegister';
import { IUser } from '@/types';
import { ContainerLoginAndRegister } from './styles';
import { Login } from './Login';
import { Register } from './Register';
import { ILoginAndRegister } from './interface';
import { usePathname, useSearchParams } from 'next/navigation';

export const LoginAndRegister: React.FC<ILoginAndRegister> = ({ type, onClickPurchase, handleChangeType }) => {
  const { defaultValues, setDefaultValues } = useRegister();

  const pathName = usePathname();

  const query = useSearchParams();

  const methods = useForm<IUser>({
    defaultValues: defaultValues
  });

  useEffect(() => {
    if (pathName !== '/registrar') {
      return;
    }
    if (defaultValues && JSON.stringify(defaultValues) !== JSON.stringify(methods.getValues())) {
      methods.reset(defaultValues);
    }
  }, [pathName, defaultValues, methods, setDefaultValues]);

  useEffect(() => {
    if (pathName !== '/registrar') return;
    if (!query.get('payload')) return;
    const payload = JSON.parse(query.get('payload') as string);
    if (JSON.stringify(defaultValues) === JSON.stringify(payload)) return;
    setDefaultValues(payload);
  }, [pathName, query]);

  return (
    <ContainerLoginAndRegister>
      {/* <Loading open={isLoading} /> */}
      <div className="container-form">
        {type === 'login' && (
          <FormProvider {...methods}>
            <AuthProvider>
              <Login onClickPurchase={onClickPurchase} handleChangeType={handleChangeType} />
            </AuthProvider>
          </FormProvider>
        )}
        {type === 'register' && (
          <FormProvider {...methods}>
            <AuthProvider>
              <Register handleChangeType={handleChangeType} onClickPurchase={onClickPurchase} />
            </AuthProvider>
          </FormProvider>
        )}
      </div>
    </ContainerLoginAndRegister>
  );
};
