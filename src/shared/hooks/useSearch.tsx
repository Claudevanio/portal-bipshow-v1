'use client'
import { IEventProps, ISelect, IState } from '@/types';
import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { api, GET_CITYS, GET_STATES, SEARCH_EVENTS } from '@/services'; 
import { TypeEnum, useError } from './useDialog';
import { useEffectOnce } from '@/hooks';
import { Cache } from '@/adapters';

interface ISearchProvider {
    search: string | undefined;
    searchEvents: IEventProps[] | null;
    handleSearchEvents: (search: string) => void;
    handleClearSearchEvents: () => void;
    location: {
      city: string;
      uf: string;
    };
    setLocation: React.Dispatch<React.SetStateAction<{
      city: string;
      uf: string;
    }>>;
    // handleLoadCitys: (id: number) => Promise<ISelect[] | undefined>;
    // handleLoadStates: () => Promise<void>;
    // city: {
    //   id: number | undefined;
    //   nome: string | undefined;
    // } | undefined;
    // state: {
    //   id: number | undefined;
    //   nome: string | undefined;
    // } | undefined;
    // setState: React.Dispatch<React.SetStateAction<{
    //   id: number | undefined;
    //   nome: string | undefined;
    // } | undefined>>;
    // setCity: React.Dispatch<React.SetStateAction<{
    //   id: number | undefined;
    //   nome: string | undefined;
    // } | undefined>>;
    // isCitys: ISelect[] | undefined;
    
}

const SearchContext = createContext({} as ISearchProvider);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearch, setIsSearch] = useState<string>();
  const [isSearchEvents, setIsSearchEvents] = useState<IEventProps[] | null>(null);
  const { showErrorDialog } = useError();

  const callErrorDialogComponent = (message: string, type: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  
  const [isCitys, setIsCitys] = useState<ISelect[]>();
  const [isStates, setIsStates] = useState<ISelect[]>();
  
  const [location, setLocation] = useState<{ city: string, uf: string }>({
    city: '',
    uf: '',
  })
  const locationCache = Cache.get({ key: 'location' })

  useEffectOnce(() => {
    if (locationCache) 
      setLocation(locationCache)
  })

    
  // useEffectOnce(() => {
  //   if (locationCache) return

  //   getCityAndUf()
  // })

  const handleLoadCitys = useCallback(async (id: number) => {
    try {
      const { data } = await api.get(`${GET_CITYS}/${id}/cidades`) as { data: IState[] };

      if (data.length > 0) {
        setIsCitys(data.map((state) => {
          return {
            value: state.valor,
            innerText: state.descricao,
          };
        }) as ISelect[]);
        return data.map((state) => {
          return {
            value: state.valor,
            innerText: state.descricao,
          };
        });
      }
    } catch (err) {
      callErrorDialogComponent("As cidades não foram encontrados.", TypeEnum.INFO)
    }
  }, [showErrorDialog]);

  const handleLoadStates = useCallback(async () => {
    try {
      const { data } = await api.get(GET_STATES) as { data: IState[] };

      if (data.length > 0) {
        setIsStates(data.map((state) => {
          return {
            value: state.valor,
            innerText: state.descricao,
          };
        }) as ISelect[]);
      }
    } catch (err) {
      callErrorDialogComponent("Os estados não foram encontrados.", TypeEnum.INFO)
    }
  }, [showErrorDialog]);

  const [city, setCity] = useState<{
    id: number | undefined;
    nome: string | undefined;
  }>();

  const [state, setState] = useState<{
    id: number | undefined;
    nome: string | undefined;
  }>();

  useEffect(() => {
    if (state?.id) {
      handleLoadCitys(state.id);
    }
  }, [handleLoadCitys, state]);

  const handleSearchEvents = useCallback(async (search: string) => {
    setIsSearch(search);
    const { data } = await api.get(`${SEARCH_EVENTS}?bu=1&pp=nome,id,descricao,link,dataRealizacao,horario,imagens,foto,encerrado,endereco&nome=${search}&i=0&t=12`) as { data: { eventos: IEventProps[] } };
    // const { data } = await api.get(`${SEARCH_EVENTS}?cp=1`) as { data: { eventos: IEventProps[] } };

    setIsSearchEvents(data.eventos);

    // const filteredEvents = data.eventos.filter((event) => {
    //   const { nome = '', localidade, dataRealizacao = '', nomeDoLugar = '' } = event;
    //   const searchLowerCase = search.toLowerCase();
    //   return nome.toLowerCase().includes(searchLowerCase) || localidade.toLowerCase().includes(searchLowerCase) || dataRealizacao.toLowerCase().includes(searchLowerCase) || nomeDoLugar.toLowerCase().includes(searchLowerCase);
    // });    
    // setIsSearchEvents(filteredEvents);
  }, []);

  const handleClearSearchEvents = useCallback(() => {
    setIsSearchEvents(null);
    setIsSearch('');
  }, []);

  return (
    <SearchContext.Provider value={{
      search: isSearch, handleSearchEvents, handleClearSearchEvents, searchEvents: isSearchEvents, location, setLocation
    }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): ISearchProvider => {
  const context = useContext(SearchContext);
  return context;
};
