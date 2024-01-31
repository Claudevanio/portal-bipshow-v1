import React from 'react';
// import { Avatar } from '@/components/Avatar';
import { SymbolUzer } from '@/components/icons/SymbolUzer';
import { ContainerUploadAvatar } from './styles';
import { IUploadAvatar } from './interface';
import { Avatar } from '@/components';

export const UploadAvatar: React.FC<IUploadAvatar> = ({
  id, name, disabled, foto,
}) => {
  return (
    <ContainerUploadAvatar>
      <label htmlFor={id}>
        <Avatar size="medium" src={foto} />
      </label>
      <input type="file" name={name} hidden id={id} disabled={disabled} />
      <div className="icon">
        <SymbolUzer width={32} height={32} />
      </div>
    </ContainerUploadAvatar>
  );
};
