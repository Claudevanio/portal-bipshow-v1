import React, {
  useCallback,
  useEffect, useState,
} from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import 'react-multi-carousel/lib/styles.css';
import { Modal } from 'react-bootstrap';
import ImageMapper from 'react-img-mapper';
import { ContainerSectorImage } from './styles';
import { ModalInfo } from './ModalInfo';
import { SectorRanks } from './SectorRanks';
import { theme } from '@/shared';
import { CircularProgress } from '@mui/material';

export const SectorImage: React.FC = () => {
  const {
    eventTicket, rank, loadingSector, areas, loadingAreas, selectChair, hrefSector, handleSelectSector, areasMobile, handleSelectTicketWithSelectedSectorInStadium,
  } = useEventTicket();
  const [isShow, setIsShow] = useState<boolean>(false);

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

  useEffect(() => {
    if (selectChair) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [selectChair]);

  return (
    <ContainerSectorImage id="container-map-html">
      {loadingSector && (
          <CircularProgress
            size={24}
          />
      )}
      {!loadingSector && (
        <>
            {rank && (
              Object.entries(rank).length <= 0 ? (
                <p>Cadeiras Indisponiveis</p>
              ) : (
                <SectorRanks />
              )
            )}
            {!rank && (
            <div className="container-html-map">
              { areas.length > 0 && areasMobile.length > 0 && !loadingAreas ? (
                <React.Fragment>
                  <div className="desktop">
                    <ImageMapper
                      src={String(eventTicket?.local?.mapa?.grande ? eventTicket?.local?.mapa?.grande.imagem : eventTicket?.local?.mapa?.imagem)}
                      map={{
                        name: 'map-area-chairs',
                        areas,
                      }}
                      fillColor={"#19D26E"}
                      onClick={(event) => {
                        if (eventTicket && eventTicket.local && eventTicket.local.selecaoDeSetorNoEstadio && event.href) {
                          handleSelectTicketWithSelectedSectorInStadium(event.href);
                        } else {
                          handleSelectSector(Number(event.id), isFindNameSector(Number(event.id)), event.href);
                        }
                      }}
                    />
                  </div>
                  <div className="mobile">
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
                          handleSelectSector(Number(event.id), isFindNameSector(Number(event.id)), event.href);
                        }
                      }}
                    />
                  </div>
                </React.Fragment>
              ) : (
                <CircularProgress
                  size={24}
                />
              )}
            </div>
            )}
        </>
      )}

      {/* <Modal show={isShow} onHide={() => setIsShow(false)} className="modal-info-selected-chair">
        {selectChair && (
        <ModalInfo
          chair={selectChair}
          onClose={() => setIsShow(false)}
        />
        )}
      </Modal> */}
    </ContainerSectorImage>
  );
};
