"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import localizeFormat from "dayjs/plugin/localizedFormat";
import ptBr from "dayjs/locale/pt-br";
import { Button } from "@/components";
import { useFetch } from "@/shared/hooks/useFetch";
import { GET_EVENTS, GET_TICKETS_LOCKED } from "@/services";
import { useEffect, useState } from "react";
import { IEventProps } from "@/types";

dayjs.extend(localizeFormat);
export interface ITicketCard {
  id: number;
  isFinished: boolean;
}

export const TicketCard = ({ id, isFinished }: ITicketCard) => {
  const router = useRouter();
  const [eventData, setEventData] = useState<IEventProps | undefined>(
    undefined
  );
  const handleDetalhes = () => {
    router.push(`/evento/${id}`);
  };

  const { data, isLoading, error } = useFetch(
    `${GET_EVENTS}/${id}/online`,
    "user"
  );

  useEffect(() => {
    !isLoading && setEventData(data);
  }, [isLoading]);

  return (
    <div className="flex gap-4 flex-row-reverse md:flex-row pb-4 w-full md:w-auto border-b-2 border-gray justify-between">
      <div className="flex flex-row-reverse gap-4 md:flex-row ">
        <Image
          src={"/event-bg.svg"}
          alt="event-image"
          sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px, 175px"
          width={175}
          height={50}
          className={isFinished ? "filter grayscale" : ""}
        />
      </div>
      <div className="flex flex-col md:flex-row flex-none md:flex-1 w-1/2 justify-between">
        <div className="flex flex-col gap-0 md:gap-2 justify-center mt-4 md:mt-0 ">
          <h4 className="font-medium text-sm sm:text-base md:text-lg">
            {eventData ? eventData?.nome : "--"}
          </h4>
          <p className="font-medium text-xs md:text-sm">
            {eventData ? eventData.localidade.replace("/", ", ") : "--"} -{" "}
            {eventData ? eventData.nomeDoLugar : "--"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:w-1/2 justify-between">
          <div className="flex flex-col gap-0 md:gap-2 justify-center mt-4 md:mt-0">
            <h4 className="font-medium text-sm sm:text-base md:text-lg">
              {eventData
                ? dayjs(eventData?.dataRealizacao).locale(ptBr).format("HH:mm")
                : "--:--"}
            </h4>
            {eventData && (
              <p className="font-medium text-xs md:text-sm">
                {dayjs(eventData.dataRealizacao).locale(ptBr).format("LL")}
              </p>
            )}
          </div>
          <div className="items-center flex mt-4 md:mt-0">
            <Button
              disabled={isLoading}
              onClick={() => handleDetalhes()}
              className="px-8 py-2 !border-gray text-textSecondary"
              variant="secondary"
            >
              Detalhes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
