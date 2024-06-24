'use client';

import { useAuth } from '@/shared/hooks/useAuth';
import { useRegister } from '@/shared/hooks/useRegister';
import { WhatsApp } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const Footer = () => {
  const { user } = useRegister();
  const { setIsAuthModalOpen, setAfterLogin } = useAuth();
  const router = useRouter();

  const pathName = usePathname();

  const isApp = pathName.includes('/viewer-app') || pathName.includes('/faq-app') || pathName.includes('/payment/webview');

  if (isApp) return <></>;

  return (
    <footer className="bg-grayLight relative overflow-hidden">
      <Image
        className="opacity-80 hidden lg:flex absolute w-[100%] left-[-50%] top-0 pointer-events-none"
        src="/FooterBackground-1.svg"
        alt="background"
        width={2000}
        height={2000}
      />
      <Image
        className="opacity-80 hidden absolute lg:flex w-[100%] left-[20%] bottom-[-10%] rotate-[-7deg] pointer-events-none object-contain"
        src="/FooterBackground-2.svg"
        alt="background"
        width={2000}
        height={2000}
      />
      <div className=" items-center justify-center w-fullpy-2 md:hidden flex">
        <Image src={'/Logo.svg'} alt="Logo" width={200} height={200} />
      </div>
      <div className="container grid grid-cols-1 mx-auto p-6 relative z-[5] gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium text-primary">Go - Goiânia</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <p className="text-textPrimary font-medium">
              <a target="_blank" rel="noopener noreferrer" href="whatsapp://send?phone=5562982260746">
                <WhatsApp
                  sx={{
                    color: '#00E676',
                    mr: 1
                  }}
                />
              </a>
              (62) 98226-0746
              <br />
              contato@bipshow.com.br
            </p>
            <p className="text-textTertiary text-sm tracking-tighter">
              Av.Dep.Jamel Cecilio, 2690 Sala 606 <br />
              Ed. Metropolitan Tokyo- Jd.Goiás, Goiânia, GO - CEP 74810-100
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium text-primary">Acesso rápido</h2>
          <div className="flex flex-col space-y-2 text-sm text-textPrimary font-normal pl-6">
            <a rel="noopener noreferrer" className="list-item" href="/">
              Início
            </a>
            {user ? (
              <Link href={'/meus-ingressos'} className="list-item">
                Meus Ingressos
              </Link>
            ) : (
              <p
                rel="noopener noreferrer"
                className="list-item cursor-pointer"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setAfterLogin(true);
                }}
              >
                Meus Ingressos
              </p>
            )}
            <a rel="noopener noreferrer" className="list-item" href="https://uzerticket.com.br/home/eventos/" target="_blank">
              Area de produtores
            </a>
            <a rel="noopener noreferrer" className="list-item" href="http://uzer.com.br/" target="_blank">
              Institucional
            </a>
            <Link className="list-item" href="/viewer/meia-entrada/Meia%20entrada">
              Lei de meia-entrada
            </Link>
            <Link href={'/faq'} className="list-item">
              FAQ
            </Link>
            <Link href={'/viewer/termos/termos-de-uso'} className="list-item">
              Termos de uso
            </Link>
            <Link href={'/viewer/privacidade/Pol%C3%ADtica%20de%20Privacidade'} className="list-item">
              Política de privacidade
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium text-primary">Redes sociais</h2>
          <div className="flex flex-col space-y-2 text-sm text-textPrimary font-normal">
            <a
              rel="noopener noreferrer"
              href="https://www.instagram.com/bipshow_oficial?igsh=amp5ZWg0MnppczAx&utm_source=qr"
              target="_blank"
              className="flex gap-1 items-center"
            >
              <Image src={'/Instagram.svg'} alt="Logo" width={20} height={20} />
              Instagram
            </a>
            <a
              rel="noopener noreferrer"
              href="https://www.facebook.com/uzertec/?locale2=ca_ES&paipv=0&eav=Afb4dTnBXIQFtWdPe7uIHfPL1d2xlkJyvLQ4sDZOoVMkJNhdKcSsa7O1LWICXpNNk_8&_rdr"
              target="_blank"
              className="flex gap-1 items-center"
            >
              <Image src={'/Facebook.svg'} alt="Logo" width={20} height={20} />
              Facebook
            </a>
            <a
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/uzertec/mycompany/"
              target="_blank"
              className="flex gap-1 items-center"
            >
              <Image src={'/Linkedin.svg'} alt="Logo" width={20} height={20} />
              <span className="mt-[3px]">Linkedin</span>
            </a>
            <a rel="noopener noreferrer" href="https://twitter/usuario" target="_blank" className="flex gap-1 items-center">
              <Image src={'/twitter.svg'} alt="Logo" width={20} height={20} />
              Twitter
            </a>
            <a rel="noopener noreferrer" href="https://www.youtube.com/@uzertecnologia1484" target="_blank" className="flex gap-1 items-center">
              <Image src={'/Youtube.svg'} alt="Logo" width={20} height={20} />
              YouTube
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium text-primary">Criar um evento</h2>

          <div className="flex flex-col space-y-2 text-sm text-textPrimary font-normal">
            <Link href={'/criar-evento'} className="text-[#049E8A]">
              <button className="bg-green text-white rounded-md py-2 px-4 w-3/4 hover:bg-[#049E8A] transition duration-300 ease-in-out">
                Criar meu evento agora!
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="font-medium text-primary">Baixe o aplicativo</h2>
          <div className="flex flex-col space-y-4 text-sm dark:text-gray-400">
            <a href="https://play.google.com/store/apps/details?id=br.com.synpass" target="_blank" rel="noopener noreferrer">
              <Image src={'/googlePlay.svg'} alt="Logo" width={150} height={55} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/br/app/bipshow-ingressos-para-eventos/id6448878208">
              <Image src={'/AppStore.svg'} alt="Logo" width={150} height={55} />
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full relative z-[2] bg-green justify-center px-6 py-6 text-sm">
        <span className="text-background">
          Uzer Soluções e Tecnologia Ltda - CNPJ: 50.325.987/0001-92- Bipshow é um marca registrada com os direitos autorais.
        </span>
      </div>
    </footer>
  );
};
