'use client'
import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { GET_EVENTS } from '@/services';
import { ICategories, IEventProps } from '@/types';
import { useRegister } from './useRegister';
import { useFetch } from './useFetch';
import { TypeEnum, useError } from './useDialog';

interface ICategoryFilter {
  eventos: IEventProps[];
  categoria: ICategories
}

interface IEventsProvider {
  cp: {
    eventos: IEventProps[];
    total: number
  } | undefined;
  de?: {
    eventos: IEventProps[];
    total: number;
  };
  pb: IEventProps[] | undefined;
  shows: IEventProps[];
  jogos: IEventProps[];
  loadingEvents: boolean;
  handleLoadCategoryFilter: (category: ICategories) => void;
  categoryFilter: ICategoryFilter | null;
  handleClearCategoryFilter: () => void;
}

const EventContext = createContext({} as IEventsProvider);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCategoryShow, setIsCategoryShow] = useState<IEventProps[]>([]);
  const [isCategoryJogo, setIsCategoryJogo] = useState<IEventProps[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const { isLoading } = useRegister();
  const [isCategoryFilter, setIsCategoryFilter] = useState<ICategoryFilter | null>(null);
  const { data: isDe, error: isErrorDe } = useFetch<{
    eventos: IEventProps[];
    total: number;
  }>(`${GET_EVENTS}?cp=1`, 'site');
  const { data: isCp, error: isErrorCp } = useFetch(`${GET_EVENTS}?cp=1`, 'site');
  const { data: isPb, error: isErrorPb } = useFetch<{ eventos: IEventProps[] }>(`${GET_EVENTS}?cp=1`, 'site');
  
  const handleFormattedEventsPB = useCallback(async () => {
    //  Modificar
    if (isPb && isPb.eventos.length > 0) {
      const shows = isPb.eventos.filter((event) => event.tipo === 'Show');
      const jogos = isPb.eventos.filter((event) => event.tipo === 'Jogo');

      setIsCategoryShow(shows);
      setIsCategoryJogo(jogos);
    }
  }, [isPb]);

  const handleLoadCategoryFilter = useCallback((category: ICategories) => {
    if (category === ICategories.Shows) {
      setIsCategoryFilter({
        categoria: ICategories.Shows,
        eventos: isCategoryShow,
      });
    }
    if (category === ICategories.Jogos) {
      setIsCategoryFilter({
        categoria: ICategories.Jogos,
        eventos: isCategoryJogo,
      });
    }
  }, [isCategoryJogo, isCategoryShow]);

  const handleClearCategoryFilter = useCallback(() => {
    setIsCategoryFilter(null);
  }, []);

  useEffect(() => {
    if (!isLoading && isDe && isCp) {
      setIsLoadingEvents(false);
      handleFormattedEventsPB();
    }
  }, [handleFormattedEventsPB, isLoading, setIsLoadingEvents, isCp, isDe]);

  useEffect(() => {
    if (isErrorDe || isErrorCp || isErrorPb) {
      setIsLoadingEvents(false);
      callErrorDialogComponent("Ocorreu um erro de comunicação.", TypeEnum.ERROR)
    }
  }, [showErrorDialog, isErrorDe, isErrorCp, isErrorPb]);

  return (
    <EventContext.Provider value={{
      cp: isCp, de: isDe, shows: isCategoryShow, jogos: isCategoryJogo, loadingEvents: isLoadingEvents, handleLoadCategoryFilter, categoryFilter: isCategoryFilter, handleClearCategoryFilter, pb: isPb?.eventos,
    }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = (): IEventsProvider => {
  const context = useContext(EventContext);
  return context;
};
