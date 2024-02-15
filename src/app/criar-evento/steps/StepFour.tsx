import Image from 'next/image';

export function StepFour() {
  return (
    <div
      className="flex flex-col items-center justify-center"
    >
      <div 
        className="flex flex-col items-center justify-center gap-4 font-medium"
      > 
        <h1
          className="text-2xl text-textPrimary"
        >
          Seu evento está quase pronto! 
        </h1>
        <p
          className="text-textPrimary"
        >
          Basta clicar em “enviar informações” para entrarmos em contato e concluí-lo!
        </p>
      </div>
      <Image src={'/criar-evento-final.svg'}
        alt={'Finalizar'}
        width={300}
        height={300}
      />
    </div>
  );
}