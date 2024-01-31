import Head from 'next/head';
import React from 'react';
import { ISEOEvent } from './interface';

export const SEOEvent: React.FC<ISEOEvent> = ({
  description, image, nome, id,
}) => {
  return (
    <Head>
      <title>
        {nome}
      </title>
      <meta name="description" content={description} />
      <meta name="application-name" content="Synpass" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={nome} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#05B59D" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#05B59D" />
      <meta
        httpEquiv="Content-Type"
        content="text/html; charset=utf-8"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={nome} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://www.synpass.com.br/evento/${id}`} />
      <meta property="og:site_name" content={nome} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="251" />
      <meta property="og:image:height" content="251" />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:alt" content="Imagem para compartilhamento" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="fb:app_id" content="" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={`https://www.synpass.com.br/evento/${id}`} />
      <meta name="twitter:title" content={nome} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
      <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5bbad5" />
    </Head>
  );
};
