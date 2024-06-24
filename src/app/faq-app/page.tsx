import { FAQApp } from '@/components/FAQ-App';
import { SEO } from '@/components/SEO';
import type { NextPage } from 'next';
import React from 'react';

const FAQAppPage: NextPage = () => {
  return (
    <React.Fragment>
      <SEO
        description="Compre ingressos para seus eventos favoritos"
        image="https://bipshow.com/bannerPrincipal.svg"
        nome="bipshow - Central de dúvidas"
        imageTwo="https://bipshow.com/bannerPrincipal.svg"
      />
      <FAQApp />
    </React.Fragment>
  );
};

export default FAQAppPage;
