import React from 'react';
import { useSearch } from '@/shared/hooks/useSearch';
import { Search } from '../icons/Search';
import { Empty } from '../Empty';
import { IAddress } from '@/types';
import { ContainerSearchEvents } from './styles';
import { SEO } from '../SEO';
import { EventCard } from '../EventCard/EventCard';

export const SearchEvents: React.FC = () => {
  const {
    searchEvents, search
  } = useSearch();

  return (
    <ContainerSearchEvents>
      <SEO
        description="Compre ingressos para seus eventos favoritos"
        image="https://www.synpass.com.br/assets/banner.png"
        nome="Synpass"
        imageTwo="https://www.synpass.com.br/assets/banner.png"
      />
        <div
        className='w-full flex items-center pt-12 mb-12 justify-between px-4 md:px-32 pb-4 border-b-2 border-gray'
      >
        <h2
          className='md:text-2xl flex gap-2 items-center font-normal text-textPrimary'
          >   
          <Search
            width={24}
            height={24}
            color='rgba(74, 61, 144, 1)'
          ></Search>
          Exibindo resultados para 
          <strong>{`"${search}"`}</strong>
        </h2>
        {searchEvents?.length ?? 0} resultados
      </div>
        <div
        className='w-full center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4 md:px-32 mb-16'
      >
          
          {
            searchEvents && searchEvents.length > 0 && searchEvents.map((event : any, index) => {
              return (
                <EventCard
                  event={{
                    ...event,
                    nomeDoLugar: event.endereco?.nomeDoLugar,
                    localidade: event.endereco?.localidade,
                    endereco: event.endereco?.endereco,
                  }}
                  key={index}
                  />
              )
            })
          }
      </div>
    </ContainerSearchEvents>
  );
};
