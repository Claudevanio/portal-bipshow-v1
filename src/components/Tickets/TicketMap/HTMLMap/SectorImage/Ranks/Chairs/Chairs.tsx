import React from 'react';
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Tooltip, styled, tooltipClasses } from '@mui/material';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { theme } from '@/shared/';
import { ContainerChairs, Circle } from './styles';
import { IChairs } from './interface';
import { Tooltip as TooltipContent } from './Tooltip';
import { AccessibleOutlined, WheelchairPickupOutlined } from '@mui/icons-material';

const LightTooltip = styled(({ className, ...props }: any) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme: any }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 11
  }
}));

export const Chairs: React.FC<IChairs> = ({ chairs }) => {
  const { nomeSector, idSector, handleSelectChair, selectedChairs, chairs: isChairs } = useEventTicket();

  return (
    <ContainerChairs>
      <ul>
        {chairs.map(item => (
          //   <OverlayTrigger
          //     key={item.identificador}
          //     placement="top"
          //     overlay={(
          //       <Tooltip id={`tooltip-${item.identificador}`}>
          //         <TooltipContent title={nomeSector} text={item.identificador} />
          //       </Tooltip>

          // )}
          //   >
          <LightTooltip
            key={item.numero}
            title={item.identificador}
            sx={{
              '& *': {
                backgroundColor: 'white',
                color: '#000'
              }
            }}
          >
            <Circle
              quantity={chairs.length}
              hover={item.numero}
              wheelChair={item.cadeirante}
              key={item.identificador}
              className={`${isChairs.find((i: any) => i.c.id === item.id)?.r || item.excluida ? 'excluded' : ''} ${
                selectedChairs.find(i => i.identifierChair === `${item.identificador} - ${idSector}`) ? 'seleted' : ''
              }
                ${item.cadeirante ? 'wheelChair' : ''}
                `}
              excluded={item.excluida || isChairs.find((i: any) => i.c.id === item.id)?.r}
              onClick={() => {
                if (!isChairs.find((i: any) => i.c.id === item.id)?.r) {
                  handleSelectChair(Number(idSector), item.identificador, item.numero, isChairs.find((i: any) => i.c.id === item.id)?.id!);
                }
              }}
            >
              {item.cadeirante && <AccessibleOutlined sx={{ color: '#39474F', padding: '2.5px' }} />}
              <div />
            </Circle>
          </LightTooltip>

          // </OverlayTrigger>
        ))}
      </ul>
    </ContainerChairs>
  );
};
