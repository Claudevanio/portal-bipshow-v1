'use client'
import { GradientBorder } from '@/components'
import { CarouselComponent } from '@/components/Banner/BannerCarrousel'
import { EventCard } from '@/components/EventCard/EventCard'
import { useGeoLocation } from '@/hooks'
import { GET_EVENTS, landingPageService } from '@/services'
import { useFetch } from '@/shared/hooks/useFetch'
import { useSearch } from '@/shared/hooks/useSearch'
import { Evento } from '@/types'
import { EventMockList } from '@/utils/event-mock'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const fontMontSerrat = Montserrat({ subsets: ['latin'] })

export default function Home() {

  const [eventos, setEventos] = useState<Evento[]>([])

  const [categorias, setCategorias] = useState<Array<{
    nome: string,
    id: number
  }>>([])

  const { data: isCp, error: isErrorCp } = useFetch(`${GET_EVENTS}?cp=1`, 'site');

  const [filteredList, setFilteredList] = useState<Evento[] | undefined>(undefined)

  const { location } = useSearch()

  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined)
  
  useEffect(() => {    
    if(isCp){
      const seenLocalIDsAndNames : Array<{
        localId: number,
        nome: string,
        eventosIds: Array<number>
      }> = []

      const mappedEventos = isCp.eventos.map((evento : any) => {
        const seenLocalIdAndName = seenLocalIDsAndNames.find((seenLocalIdAndName) => seenLocalIdAndName.localId === evento.localId && seenLocalIdAndName.nome === evento.nome.split(' ')[0])
        if(seenLocalIdAndName){
          evento.hide = true
          seenLocalIdAndName.eventosIds.push(evento.id)
        }else{
          seenLocalIDsAndNames.push({
            localId: evento.localId,
            nome: evento.nome.split(' ')[0],
            eventosIds: [evento.id]
          })
        }
        return evento
      })

      const eventosRemapped = mappedEventos.map((evento : any) => {
        const seenLocalIdAndName = seenLocalIDsAndNames.find((seenLocalIdAndName) => seenLocalIdAndName.localId === evento.localId && seenLocalIdAndName.nome === evento.nome.split(' ')[0])
        if(evento.id === seenLocalIdAndName?.eventosIds[0]){
          evento.hide = false
          if(seenLocalIdAndName?.eventosIds && seenLocalIdAndName?.eventosIds.length > 1){
            evento.multipleIds = true
            evento.eventosIds = seenLocalIdAndName?.eventosIds
          }
        }
        if(evento.id !== seenLocalIdAndName?.eventosIds[0] && seenLocalIdAndName?.eventosIds?.includes(evento.id)){
          evento.hide = true
        }
        return evento
      })

      setEventos([...eventosRemapped])

      setCategorias([...isCp.categorias])
      
      
      // setEventos([...isCp.eventos])
    }
  }, [isCp])

  useEffect(() => {
    debugger;
    if(location?.uf && location?.uf !== "" && eventos && eventos.length > 0){
      const events = eventos.filter((evento) => {
        return evento.localidade.includes(location.uf)
      })
      setFilteredList([...events])
    } else {
      setFilteredList(undefined)
    }
  }, [location, eventos])

  useEffect(() => {
    if(categoryFilter && eventos && eventos.length > 0){
      const events = eventos.filter((evento) => {
        return evento.categoria?.id === categoryFilter
      })
      setFilteredList([...events])
    }
  }, [categoryFilter, eventos])

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div
        className='w-full h-fit overflow-x-hidden'
      >
        <CarouselComponent/>
      </div>
      <div
        className='overflow-x-scroll w-full'
      >
        <div className='w-full flex items-center justify-center h-80 min-w-[1300px] '>
          {
            categorias.map((categoria, index, arr) => {
              return (
                <div key={index} className='flex flex-col px-6 py-2 mx-[-.8rem] relative items-center justify-center gap-2 '>
                  
                  {
                    index !== arr.length - 1 && <div
                      className='bg-background absolute right-0 h-8 w-6 bottom-[40%] z-10' 
                    />
                  }
                  {
                    index % 2 === 0  ? <>
                      <Image
                      className='absolute top-0 left-0 rotate-[260deg]'
                      src={'/single-border.svg'}
                      height={24}
                      width={95}
                      alt='borda'
                    />
                    <Image
                      className='absolute top-0 right-0 rotate-[11deg]'
                      src={'/single-border.svg'}
                      height={24}
                      width={95}
                      alt='borda'
                    />
                    
                  </> : <>
                    <Image
                      className='absolute bottom-0 left-0 rotate-[190deg]'
                      src={'/single-border.svg'}
                      height={24}
                      width={95}
                      alt='borda'
                    />
                    <Image
                      className='absolute bottom-0 right-0 rotate-[80deg]'
                      src={'/single-border.svg'}
                      height={24}
                      width={95}
                      alt='borda'
                    />
                    
                  </>
                  }
                  <div
                    className='cursor-pointer'
                    onClick={() => {
                      if(categoryFilter === categoria.id){
                        setCategoryFilter(undefined)
                        setFilteredList(undefined)
                        return
                      }
                      setCategoryFilter(categoria.id)
                    }}
                  >
                    <GradientBorder
                      innerStyle={{
                        padding: '1rem',
                        borderRadius: '50%',
                        width: '8.75rem',
                        height: '8.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        background: categoryFilter === categoria.id ? '#FDFDF0' :'#FDFDFD',
                        color: categoryFilter === categoria.id ? '#4A3D90' : '#4A3D90',
                      }}
                      borderStyle={{
                        borderRadius: '50%',
                        padding: '.5rem',
                        position: 'relative',
                        zIndex: 11
                      }}
                    >
                      <p className='font-semibold text-lg leading-5'>{categoria.nome}</p>
                    </GradientBorder>
                  </div>
                </div>
              )
            })
          }
      </div>  
    </div>


          {/* <div className='flex items-center justify-center h-72 max-w-[100%] px-10 py-6 overflow-x-auto categories-container md:w-full' 
          > */}
            {/* <div className="w-[1000px] md:w-full flex-shrink-0">
              <Image
                className='md:w-full md:h-48'
                src='/Categories.svg'
                alt='Imagem'
                width={1000}
                height={300}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div> */}
            {/* Conteúdo dentro da imagem */}
          {/* </div> */}



      <div
        className='w-full flex items-center justify-between px-4 md:px-8 pb-8 border-b-2 border-gray'
      >
        <h2
          className='md:text-2xl flex gap-2 items-center font-bold text-textPrimary'
          >
          <Image 
            src={'/Calendar.svg'}
            alt="Calendario"
            width={30}
            height={30}
            />
          Todos os eventos
        {
          categoryFilter && <button
            className='text-primary font-normal text-xs ml-8 self-center hover:underline'
            onClick={() => {
              setCategoryFilter(undefined)
              setFilteredList(undefined)
            }}
          >
            Limpar Categoria
          </button>
        }
        </h2>
        <p
          className={fontMontSerrat.className + 'md:text-2xl text-sm flex gap-2 items-center font-bold text-textPrimary'}
        >
          Comprou, <br/>
          sorriu, curtiu.
        </p>
      </div>
      <div
        className='w-full center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5
        gap-6 p-4 md:px-32 mb-16'
      >
          {
            filteredList && (filteredList.length === 0 ? <div className='w-full flex items-center justify-center'>
              <h1 className='text-textPrimary text-lg font-medium'>Nenhum evento encontrado</h1>
              </div> : filteredList.map((event, index) => {
              return (
                <EventCard
                  event={event}
                  key={index}
                  />
              )}))
          }
          {
            !filteredList && eventos && eventos.length > 0 && eventos.map((event, index) => {
              return (
                <EventCard
                  event={event}
                  key={index}
                  />
              )
            })
          }
      </div>
    </main>
  )
}
