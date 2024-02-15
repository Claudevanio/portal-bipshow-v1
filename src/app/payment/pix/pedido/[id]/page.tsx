'use client'

import React from 'react';
import type { NextPage } from 'next';
import { SEO } from '@/components/SEO';
import { Orders } from '@/app/profile/Orders';

const Tickets: NextPage = () => {

  return (
    <React.Fragment>
      <SEO
        description="Compre ingressos para seus eventos favoritos"
        image="https://bipshow.com/bannerPrincipal.svg"
        nome="BipShow - Pagamento"
        imageTwo="https://bipshow.com/bannerPrincipal.svg"
      />
      <Orders />
    </React.Fragment>
  );
};

export default Tickets;