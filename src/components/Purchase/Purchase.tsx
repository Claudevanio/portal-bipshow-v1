'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { LoginAndRegister } from '@/components/LoginAndRegister';
import { useRegister } from '@/shared/hooks/useRegister';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { ContainerPurchase } from './styles';
import { IPurchase } from './interface';
import { Header } from './Header';
import { CheckoutPurchase } from './CheckoutPurchase';
import { Cache } from '@/adapters';

export const Purchase: React.FC<IPurchase> = ({ handleClose }) => {
  const { setIsCheckoutPurchase, isCheckoutPurchase, webView } = useTicketPurchase();
  const { user } = useRegister();
  const [isType, setIsType] = useState<'login' | 'register'>('login');

  const tokenUser = Cache.get({
    key: '@tokenUser',
  });

  const handleClickCheckoutPurchase = useCallback(() => {
    setIsCheckoutPurchase(true);
  }, [setIsCheckoutPurchase]);

  const handleChangeType = useCallback((type: 'login' | 'register') => {
    setIsType(type);
  }, []);

  const handleClickCheckoutNotPurchase = useCallback(() => {
    setIsCheckoutPurchase(false);
  }, [setIsCheckoutPurchase]);

  useEffect(() => {
    if (!user && !webView && !tokenUser) {
       setIsCheckoutPurchase(false)
    }
    else {
      setIsCheckoutPurchase(true)
    };
  }, [user, setIsCheckoutPurchase, webView]);

  return (
    <ContainerPurchase>
      <Header handleClose={handleClose} />
      {!isCheckoutPurchase && !tokenUser &&(
        <LoginAndRegister type={isType} onClickPurchase={handleClickCheckoutPurchase} handleChangeType={handleChangeType} />
      )}
      {isCheckoutPurchase && (
        <CheckoutPurchase handleClickCheckoutNotPurchase={handleClickCheckoutNotPurchase} />
      )}
    </ContainerPurchase>
  );
};
