"use client";
import Image from "next/image";
import { TicketCard } from "./components/TicketCard";
import { useFetch } from "@/shared/hooks/useFetch";
import { GET_TICKETS_CONFIRMATIONS, GET_TICKETS_LOCKED } from "@/services";
import { ITicketPurchaseConfirmationUser } from "@/types";
import { LoadingSmall } from "@/components/LoadingSmall";

export default function MeusIngressos() {
  const {
    data: confirmations,
    isLoading: isLoadingConfirmations,
    error: erroTicketsConfirmations,
  } = useFetch(`${GET_TICKETS_CONFIRMATIONS}`, "user");
  const {
    data: lockeds,
    isLoading: isLoadingLockeds,
    error: erroTicketsLockeds,
  } = useFetch(`${GET_TICKETS_LOCKED}`, "user");

  return (
    <div className="w-full flex flex-col p-8 overflow-x-hidden gap-4">
      <div className="flex flex-row gap-1 w-full items-center">
        <Image src="/ticket-black.svg" alt="" width={32} height={32} />
        <h2 className="h-fit font-semibold text-lg sm:text-xl md:text-2xl">
          Meus ingressos
        </h2>
      </div>
      {isLoadingConfirmations ? (
        <LoadingSmall />
      ) : confirmations ? (
        confirmations.bilhetes.length > 0 &&
        confirmations.bilhetes.map(
          (value: ITicketPurchaseConfirmationUser, index: number) => {
            return (
              <TicketCard
                key={`valid-ticker-card-${index}`}
                id={value.evento.id}
                isFinished={false}
              />
            );
          }
        )
      ) : (
        <p className="px-8 text-center">Falha ao carregar dados</p>
      )}
      <div className="flex gap-1 w-full items-center">
        <Image src="/ticket-black.svg" alt="" width={32} height={32} />
        <h2 className="h-fit font-semibold text-lg sm:text-xl md:text-2xl">
          Ingressos encerrados
        </h2>
      </div>
      {isLoadingLockeds ? (
        <LoadingSmall />
      ) : lockeds ? (
        lockeds.bilhetes.length > 0 &&
        lockeds.bilhetes.map(
          (value: ITicketPurchaseConfirmationUser, index: number) => {
            return (
              <TicketCard
                key={`invalid-ticker-card-${index}`}
                id={value.evento.id}
                isFinished={true}
              />
            );
          }
        )
      ) : (
        <p className="px-8 text-center">Falha ao carregar dados</p>
      )}
    </div>
  );
}
