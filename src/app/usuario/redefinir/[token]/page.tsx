'use client'
import React from 'react';
import { NextPage } from 'next';
import { SEO } from '@/components/SEO';
import { ResetPassword as ResetPasswordComponent } from '@/components/ResetPassword';
import { FormProvider, useForm } from 'react-hook-form';
import { ResetPasswordProvider, IDataForm } from '@/shared/hooks/useResetPassword';

export default function ResetPassword({ params }: { params: { token: string } }) {
  const methods = useForm<IDataForm>();

  return (
    <React.Fragment>
      <SEO
        description="Compre ingressos para seus eventos favoritos"
        image="https://www.synpass.com.br/assets/banner.png"
        nome="Synpass - Redefinir senha"
        imageTwo="https://www.synpass.com.br/assets/banner.png"
      />
      <ResetPasswordProvider>
        <FormProvider {...methods}>
          <ResetPasswordComponent />
        </FormProvider>
      </ResetPasswordProvider>
    </React.Fragment>
  );
};
 