'use client'
import { LoginAndRegister } from '@/components/LoginAndRegister';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function Register(){

  const [isType, setIsType] = useState<'login' | 'register'>('register');
  const handleChangeType = useCallback((type: 'login' | 'register') => {
    setIsType(type);
  }, []);

  const router = useRouter()

    return (
        <>
          <LoginAndRegister
            type={isType}
            handleChangeType={handleChangeType} 
            onClickPurchase={
              () => router.push('/')
            }
          />
        </>
    )
}