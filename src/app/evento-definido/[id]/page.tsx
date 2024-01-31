'use client'
import { EventMockList } from '@/utils/event-mock'
import dayjs from 'dayjs'
import Image from 'next/image'
import ptBr from 'dayjs/locale/pt-br'
import { Button, GradientBorder } from '@/components'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import Link from 'next/link'
import { TicketsContainerDefinido } from '../../evento/[id]/components/TicketsContainerDefinido'
import { useState } from 'react'
import { ActionTicketMap, TicketMap } from '@/components/Tickets'
import { TicketMapMobile } from '@/components/Tickets/TicketMapMobile'

dayjs.locale(ptBr)

export default function EventoPage({ params }: { params: { id: string } }){

  const currentEvent = EventMockList.find(event => event.id === params.id)

  const [activeTab, setActiveTab] = useState<'info' | 'tickets'>('info')

  const [readMore, setReadMore] = useState(false)

  return (
    <div
      className='w-full flex flex-col items-center justify-center px-4 md:px-24 xl:px-56 2xl:px-72  pt-10 pb-10 overflow-x-hidden'
    >
      <div
          className='w-full  pb-4 text-start text-textPrimary'
      >
        <Link
          className='flex items-center gap-1 w-fit'
          href='/'
          >
          <KeyboardArrowLeft/> Voltar
        </Link>
      </div>
      <div
        className='flex flex-col gap-4 w-full'
      >
        <Image
          className='w-full rounded-xl h-80 object-cover'
          src={currentEvent?.image || '/Logo.svg'}
          alt="Evento"
          width={300}
          height={300}
        />
        <div
          className='flex flex-col gap-4 text-textPrimary'
        >
          <h1
            className='text-2xl font-medium'
          >{currentEvent?.title}</h1>

          <h4
            className='text-sm font-medium leading-6'
          >{currentEvent?.title}, {currentEvent?.state} - {currentEvent?.stadium} <br/>
          {dayjs(currentEvent?.date).format('hh:mm')} <br/>
          {dayjs(currentEvent?.date).format('DD')} de {dayjs(currentEvent?.date).format('MMMM')} de {dayjs(currentEvent?.date).format('YYYY')}
          </h4>
        </div>
      </div>

      <div
        className='flex items-center w-full mt-8 gap-8 border-b-2 mb-6 border-gray pb-2 md:hidden'>
        <h4
          className={`text-sm flex items-center gap-2 font-medium cursor-pointer ${activeTab == 'info' ? 'text-primary' : 'text-textPrimary'}`}
          onClick={() => setActiveTab('info')}
        >
          <Image
            className={`${activeTab == 'info' ? '' : 'brightness-0'}`}
            src={'/Ticket.svg'}
            alt="Logo"
            width={20}
            height={20}
          />
          Ingressos
        </h4>
        
        <div
          className='border-l-2 border-gray h-6'
        />

        <h4
          className={`text-sm flex items-center gap-2 font-medium cursor-pointer ${activeTab == 'tickets' ? 'text-primary' : 'text-textPrimary'}`}
          onClick={() => setActiveTab('tickets')}
        >
          <Image
            className={`${activeTab == 'tickets' ? '' : 'brightness-0'}`}
            src={'/Info.svg'}
            alt="Logo"
            width={20}
            height={20}
          />
          Informações
        </h4>

      </div>

      <div
        className={`md:flex flex-col w-full gap-6 `}
      >
        <div
        className={`${activeTab == 'info' ? 'block' : 'hidden'} md:w-full md:!block `}
        >
          <div
            className='flex md:gap-4 gap-2 pt-12 flex-wrap '
          >
            <Button
              variant='secondary'
            >
              <Image
                src={'/Localization.svg'}
                alt="Logo"
                width={20}
                height={20}
              />
              Como Chegar
            </Button>
            <Button
              variant='secondary'>
                <Image
                  src={'/Calendar.svg'}
                  alt="Logo"
                  width={20}
                  height={20}
                />
                Adicionar na agenda
            </Button>
            <Button
              variant='secondary'
            >
              <Image
                src={'/Share.svg'}
                alt="Logo"
                width={20}
                height={20}
                />
              Compartilhar
            </Button>

          </div>
          <div
            className='flex flex-col gap-4 w-full mt-8 text-textPrimary'>
              <h3
                className='text-lg font-medium'
              >Informações gerais</h3>
              <article
                className={ (readMore ? '' : 'line-clamp-4') + 'text-sm leading-6'}
              >
                {currentEvent?.description}
              </article>
              <div
                className='flex flex-col gap-4 p-6 bg-softPurple rounded-xl text-textPrimary font-medium'
              >
                <h5>
                  Regras da compra online e acesso digital
                </h5>
                <p
                  className='text-xs leading-5 '
                >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum in purus non facilisis. Morbi laoreet varius dolor, in sagittis ipsum ultricies eget. Nulla pretium pretium mi eu gravida. Donec accumsan tempus imperdiet. Proin eget tincidunt metus, at fermentum diam. Aliquam laoreet consectetur leo, at volutpat eros consectetur non. Proin a lorem eu dolor elementum pulvinar. Phasellus sit amet lorem bibendum, posuere est eget, efficitur dui.
                </p>
              </div>
          </div>
        </div>
        <aside
          className={`md:w-full flex-col gap-4 ${activeTab == 'tickets' ? 'flex' : 'hidden'} md:flex`}
        >
          <TicketsContainerDefinido
            currentEvent={currentEvent}
          />
          {/* <TicketMapMobile/> */}
        </aside>
      </div>
    </div>

  )
}