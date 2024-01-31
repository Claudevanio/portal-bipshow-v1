import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerActionSectorOrChair } from './styles';
import { SelectSector } from './SelectSector';
import { SelectedSector } from './SelectedSector';

export const ActionSectorOrChair: React.FC = () => {
  const { rank } = useEventTicket();  

  return (
    <ContainerActionSectorOrChair>
      {!rank ? (
        <SelectSector />
      ) : (
        <SelectedSector />
      )}
    </ContainerActionSectorOrChair>
  );
};
