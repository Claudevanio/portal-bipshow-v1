import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { Button } from '@/components';
import ImageMapper, { CustomArea, MapAreas } from 'react-img-mapper';
import { Modal } from 'react-bootstrap';
import { AlertInfoTable, ContainerModalTicketTypeMesa, ElementScroll } from './styles';
import { IModalTicketTypeMesa } from './interface';
import { theme } from '@/shared';
import { ModalInfoTable } from './ModalInfoTable';
import { TypeEnum, useError } from '@/shared/hooks/useDialog';
import { Close } from '@mui/icons-material';

export const ModalTicketTypeMesa: React.FC<IModalTicketTypeMesa> = ({
  onClose,
  id,
  nome,
  valor,
  taxaConveniencia,
  taxaFixa,
  taxaServico,
  quantityMax,
  handleChangeQTD,
  description,
  mapa,
  mesas
}) => {
  const { ticket, handleDataMapHTMLTable, setIsTables, isTables, quantityTickets } = useEventTicket();
  const [isInfoFormatMap, setIsInfoFormatMap] = useState<{
    urlImage: string;
    areas: MapAreas[];
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInfoTable, setIsInfoTable] = useState<{
    left: number;
    top: number;
    right: number;
    bottom: number;
    name: string;
  }>();
  const [isSelectPlace, setIsSelectPlace] = useState<CustomArea>();
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const elementClickTag = useRef(null);

  const handleLoadFormMapArea = useCallback(async () => {
    if (ticket) {
      setIsLoading(true);
      const findUrlMapHTML = ticket.tiposDeIngresso.find(i => i.id === id);

      if (findUrlMapHTML && findUrlMapHTML.mapa) {
        const areas = await handleDataMapHTMLTable(findUrlMapHTML.mapa?.coordenadas, mesas);

        //

        const string = 'https://synpass.com.br/images/mapa-mesa/acasa/mesas-selecionadas.jpeg';
        // get only the path part of the url
        const path = string.split('.com.br/')[1];

        const urlImage = process.env.URL_API + path;

        setIsInfoFormatMap({
          urlImage: urlImage,
          areas
        });

        setIsLoading(false);
      }
    }
  }, [ticket, id, handleDataMapHTMLTable, mesas]);

  const handleMouseOut = useCallback(() => {
    setIsInfoTable(undefined);
  }, []);

  const handleMouseEnter = useCallback((event: CustomArea) => {
    const [left, top, right, bottom] = event.coords;
    const { href } = event;

    setIsInfoTable({
      left: Number(left),
      top: Number(top),
      right: Number(right),
      bottom: Number(bottom),
      name: String(href)
    });
  }, []);

  const handleClickArea = useCallback(
    (event: CustomArea) => {
      if (isInfoFormatMap) {
        if (isTables.find(i => i === Number(event.href))) {
          const active = isInfoFormatMap.areas.map(i => {
            if (i.href === event.href) {
              return {
                ...i,
                active: false,
                preFillColor: 'transparent'
              };
            }
            return i;
          });

          setIsInfoFormatMap({
            ...isInfoFormatMap,
            areas: active as MapAreas[]
          });
          setIsTables(isTables.filter(i => i !== Number(event.href)));
          handleChangeQTD('prev');
        } else if (quantityTickets >= Number(quantityMax)) {
          callErrorDialogComponent('Quantidade máxima de ingressos excedidade. Verifique.', TypeEnum.INFO);
        } else {
          const active = isInfoFormatMap.areas.map(i => {
            if (i.href === event.href) {
              return {
                ...i,
                active: true,
                preFillColor: '#bcbcbc'
              };
            }
            return i;
          });

          setIsInfoFormatMap({
            ...isInfoFormatMap,
            areas: active as MapAreas[]
          });

          setIsTables([...isTables, Number(event.href)]);

          handleChangeQTD('next', Number(event.href));
        }

        setIsSelectPlace(undefined);
      }
    },
    [isInfoFormatMap, isTables, quantityMax, showErrorDialog, handleChangeQTD, setIsTables, quantityTickets]
  );

  const verifySelectPlace = useMemo(() => {
    let verify = true;

    isInfoFormatMap &&
      isInfoFormatMap.areas.forEach(item => {
        if (isTables.find(i => i === Number(item.href))) {
          verify = false;
        }
      });

    return verify;
  }, [isTables, isInfoFormatMap]);

  useEffect(() => {
    if (ticket) {
      handleLoadFormMapArea();
    }
  }, [ticket, handleLoadFormMapArea]);

  useEffect(() => {
    const isElementDocument = document.getElementById('content-modal') as HTMLDivElement;
    const isElementImage = document.querySelector('.img-mapper-img') as HTMLImageElement;

    if (isElementDocument && isElementImage && elementClickTag.current) {
      (elementClickTag.current as HTMLElement).click();
    }
  }, [isInfoFormatMap, elementClickTag]);

  return (
    <ContainerModalTicketTypeMesa className="container">
      {/* {isSelectPlace && (
        <Modal show={!!isSelectPlace} onHide={() => setIsSelectPlace(undefined)} className="modal-info-selected-chair modal-info-selected-place" backdropClassName="modal-info-selected-backdrop">
          <div
            className='w-full h-full absolute top-0 left-0 z-10'
          >
            <ModalInfoTable onClose={() => setIsSelectPlace(undefined)} nome={nome} taxa={Number(taxaConveniencia) + Number(taxaFixa) + Number(taxaServico)} valor={valor} handleClickArea={handleClickArea} lugar={isSelectPlace} description={description} />
          </div>
        </Modal>
      )} */}
      <header>
        <h6 className="title">Seleione o lugar desejado</h6>
        <Close className="text-gray" onClick={onClose} />
      </header>
      <div className="content-modal" id="content-modal">
        {isInfoTable && (
          <AlertInfoTable left={isInfoTable.left} top={isInfoTable.top}>
            <h6 className="title">{nome}</h6>
            <p className="text-light">
              Mesa: <strong>{isInfoTable.name}</strong>
            </p>
          </AlertInfoTable>
        )}
        {isInfoFormatMap && isInfoFormatMap.areas && isInfoFormatMap.urlImage && !isLoading ? (
          <React.Fragment>
            alou
            <a href="#padding" id="padding-top" ref={elementClickTag}>
              {null}
            </a>
            <ElementScroll padding={mapa.padding} id="padding"></ElementScroll>
            <ImageMapper
              active
              src={isInfoFormatMap.urlImage}
              onMouseEnter={event => handleMouseEnter(event)}
              onMouseLeave={handleMouseOut}
              onClick={event => {
                // if (event.active) {
                handleClickArea(event);
                // } else {
                //   setIsSelectPlace(event);
                // }
              }}
              map={{
                name: `map-table-${id}`,
                areas: isInfoFormatMap.areas.map(item => {
                  if (item.active || isTables.find(i => i === Number(item.href))) {
                    return {
                      shape: 'rect',
                      coords: item.coords,
                      href: item.href,
                      strokeColor: 'transparent',
                      preFillColor: item.disabled ? '#BDBFC2' : '#19D26E',
                      lineWidth: 0,
                      active: true,
                      disabled: item.disabled
                    };
                  }
                  return item;
                })
              }}
            />
          </React.Fragment>
        ) : (
          <p>Carreganado...</p>
        )}
      </div>
      <footer>
        <Button onClick={onClose}>Cancelar</Button>
        <Button disabled={verifySelectPlace} onClick={onClose}>
          Confirmar
        </Button>
      </footer>
    </ContainerModalTicketTypeMesa>
  );
};
