import React from 'react';
import { format } from 'date-fns'; 
import { Arrow } from '@/components/icons/Arrow'; 
import { ContainerCard, Image } from './styles';
import { ICard } from './interface';
import dayjs from 'dayjs';
import ptBr from "dayjs/locale/pt-br";
import localizeFormat from "dayjs/plugin/localizedFormat";
import { Button } from '@/components';
import { Box } from '@mui/material';
import { fi } from 'date-fns/locale';

dayjs.extend(localizeFormat);

export const Card: React.FC<ICard> = ({
  tickets: {
    date, address, foto, name,
  }, active = false, onClick, endereco, canceled = false
}) => {
  return (
    <div className="flex gap-4 flex-row-reverse md:flex-row pb-4 w-full md:w-auto border-b-2 border-gray justify-between">
      <Box className="flex flex-row-reverse gap-4 md:flex-row "
      sx={{
          '*': {
            filter: canceled ? 'grayscale(100%)' : 'none'
          }
      }}
      > 
        <Image image={foto} />
      </Box>
      
      <div className="flex flex-col md:flex-row flex-none md:flex-1 w-1/2 justify-between">
        <div className="flex flex-col gap-0 md:gap-2 justify-center mt-4 md:mt-0 ">
          <h4 className="font-medium text-sm sm:text-base md:text-lg">
            {name}
          </h4>
          <p className="font-medium text-xs md:text-sm">
           {
            endereco && <>{endereco} - </>
           }
            {
              address
            }
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:w-1/2 justify-between">
          <div className="flex flex-col gap-0 md:gap-2 justify-center mt-4 md:mt-0">
            <h4 className="font-medium text-sm sm:text-base md:text-lg">
              {dayjs(date).locale(ptBr).format("HH:mm")}
            </h4>
            {date && (
              <p className="font-medium text-xs md:text-sm">
              {dayjs(date).locale(ptBr).format("LL")}
              </p>
            )}
          </div>
          <div className="items-center flex mt-4 md:mt-0">
            {
              !canceled && <Button 
              onClick={() => onClick()}
              className="px-8 py-2 !border-gray text-textSecondary"
              variant="secondary"
            >
              Detalhes
            </Button>}
          </div>
        </div>
      </div>
      {/* <div className="infos">
        <p className="text-light date">
          {format(new Date(date), 'ccc, dd/MM · kk:mm', {
            locale: ptBr as any,
          })}
        </p>
        <p className="text-dark name">{name}</p>
        <p className="text-light address">{address}</p>
      </div>
      <div className="icon">
        <Arrow width={32} height={32} color={'#bcbcbc'} />
      </div> */}
    </div>
  );
};
