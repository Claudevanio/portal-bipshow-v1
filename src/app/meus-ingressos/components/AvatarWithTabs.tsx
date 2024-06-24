'use client';
import { Avatar, GradientBorder } from '@/components';
import { Tab, Tabs } from '@mui/material';
import Ticket from '../../../../public/ticket-black.svg';
import Profile from '../../../../public/profile.svg';
import Logout from '../../../../public/logout.svg';
import Image from 'next/image';
import { useState } from 'react';
import { useRegister } from '@/shared/hooks/useRegister';

export const AvatarWithTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { handleLogoutUser } = useRegister();

  return (
    <div className=" hidden items-center  md:block">
      <div className="w-250 h-250 rounded-full bg-background p-1 bg-gradient">
        <Avatar size="small" />
      </div>
      <Tabs orientation="vertical" className="mt-2" value={value} onChange={handleChange}>
        <Tab
          value={0}
          icon={<Image src={Ticket} alt="Ticket Icon" width={24} height={24} />}
          iconPosition="start"
          label="Meus Ingressos"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            width: '100%',
            justifyContent: 'start'
          }}
        />
        <Tab
          value={1}
          icon={<Image src={Profile} alt="Ticket Icon" width={24} height={24} />}
          iconPosition="start"
          label="Meu Perfil"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            width: '100%',
            justifyContent: 'start'
          }}
        />
        <Tab
          value={2}
          icon={<Image src={Logout} alt="Ticket Icon" width={24} height={24} />}
          iconPosition="start"
          label="Sair"
          onClick={handleLogoutUser}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            width: '100%',
            justifyContent: 'start'
          }}
        />
      </Tabs>
    </div>
  );
};
