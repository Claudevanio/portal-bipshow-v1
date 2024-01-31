import React from 'react';
import type { NextPage } from 'next';
import { SEO } from '@/components/SEO';

const Tickets: NextPage = () => {

  return (
    <React.Fragment>
      <SEO
        description="Compre ingressos para seus eventos favoritos"
        image="https://www.synpass.com.br/assets/banner.png"
        nome="Synpass - Pagamento"
        imageTwo="https://www.synpass.com.br/assets/banner.png"
      />
      {/* <Order /> */}
    </React.Fragment>
  );
};

export default Tickets;