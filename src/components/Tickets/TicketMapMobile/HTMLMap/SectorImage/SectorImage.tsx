import React, {
  useCallback,
  useEffect,
} from 'react';
// import { LoadingSmall } from '@/components/LoadingSmall';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import 'react-multi-carousel/lib/styles.css';
// import { theme } from '@/shared';
import ImageMapper from 'react-img-mapper';
import { ContainerSectorImage } from './styles';
import { CircularProgress } from '@mui/material';

export const SectorImage: React.FC = () => {
  const {
    eventTicket, rank, areas, hrefSector, loadingAreas, areasMobile, handleSelectSector, setIsShowOffcanvas, handleSelectTicketWithSelectedSectorInStadium,
  } = useEventTicket();

  const isFindNameSector = useCallback((idSector: number) => {
    let isName = '';

    if (eventTicket && eventTicket.tiposDeIngresso && eventTicket.tiposDeIngresso.length > 0) {
      const isFindName = eventTicket.tiposDeIngresso.find((item) => Number(item?.setor?.id) === idSector);

      if (isFindName && isFindName.setor) {
        isName += isFindName.setor.nome;
      }
    }

    return isName;
  }, [eventTicket]);

  useEffect(() => {
    if (rank && hrefSector && rank[hrefSector].fileiras.length > 0) {
      (document.getElementById('container-map-html') as HTMLDivElement).style.height = 'fit-content';
    }
  }, [rank, hrefSector]);

  return (
    <ContainerSectorImage id="container-map-html">
      <div className="container-html-map">
        {areas.length > 0 && !loadingAreas ? (
          <ImageMapper
            src={String(eventTicket?.local?.mapa?.pequeno ? eventTicket?.local?.mapa?.pequeno.imagem : eventTicket?.local?.mapa?.imagem)}
            map={{
              name: 'map-area-chairs-mobile',
              areas: areasMobile,
            }}
            fillColor={"#19D26E"}
            onClick={(event) => {
              if (eventTicket && eventTicket.local && eventTicket.local.selecaoDeSetorNoEstadio && event.href) {
                handleSelectTicketWithSelectedSectorInStadium(event.href);
              } else {
                setIsShowOffcanvas(true);
                handleSelectSector(Number(event.id), isFindNameSector(Number(event.id)), event.href);
              }
            }}
          />
        ) : (
          <CircularProgress
            size={24}/>
        )}
      </div>
    </ContainerSectorImage>
  );
};
