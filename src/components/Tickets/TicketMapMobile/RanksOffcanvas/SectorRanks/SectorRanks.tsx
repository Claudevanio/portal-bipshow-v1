import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { Ranks } from '../Ranks';
import { ContainerSectorRanks } from './styles';
import 'react-multi-carousel/lib/styles.css';

export const SectorRanks: React.FC = () => {
  const { rank, hrefSector, handleSelectSectorRank } = useEventTicket();

  return (
    <ContainerSectorRanks>
      <div className="header">
        {rank && Object.keys(rank).map((nome) => (
          <button onClick={() => handleSelectSectorRank(nome)} type="button" className={`${hrefSector === nome ? 'active' : ''}`} key={nome}>
            {Object.keys(rank).length > 1 ? nome[nome.length - 1] : nome}
          </button>
        ))}
      </div>
      {rank && hrefSector && (
        <Ranks alinhamento={rank[hrefSector].alinhamento} fileiras={rank[hrefSector].fileiras} ordemReversa={rank[hrefSector].ordemReversa} />
      )}
    </ContainerSectorRanks>
  );
};
