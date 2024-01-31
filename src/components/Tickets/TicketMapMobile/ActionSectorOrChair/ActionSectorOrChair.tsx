import React from 'react';
import { ContainerActionSectorOrChair } from './styles';
import { SelectSector } from './SelectSector';

export const ActionSectorOrChair: React.FC = () => {
  return (
    <ContainerActionSectorOrChair>
      <SelectSector />
    </ContainerActionSectorOrChair>
  );
};
