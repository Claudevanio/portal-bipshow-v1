import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerSectorRanks } from './styles';
import { Ranks } from '../Ranks';

export const SectorRanks: React.FC = () => {
  const { rank, hrefSector, handleSelectSectorRank } = useEventTicket();

  return (
    <ContainerSectorRanks>
      <header>
        {rank && Object.keys(rank).map((nome, index) => (
          <button key={index} onClick={() => handleSelectSectorRank(nome)} type="button" className={`${hrefSector === nome ? 'active' : ''}`}>
            {Object.keys(rank).length > 1 ? nome[nome.length - 1] : nome}
          </button>
        ))}
      </header>
      {rank && hrefSector && rank[hrefSector] && rank[hrefSector].fileiras && (
        <Ranks alinhamento={rank[hrefSector].alinhamento} fileiras={rank[hrefSector].fileiras} ordemReversa={rank[hrefSector].ordemReversa} />
      )}
    </ContainerSectorRanks>
  );
};
