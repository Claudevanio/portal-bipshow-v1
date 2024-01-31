import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerAccordionTwo } from './styles';

export const AccordionTwo: React.FC = () => {
  const { isTicketSelectedUser, ticketFormatted } = useEventTicket();

  return (
    <ContainerAccordionTwo>
      {
        (ticketFormatted && ticketFormatted[0].tiposDeIngresso.find((item) => isTicketSelectedUser && item.id === isTicketSelectedUser[0].idTipo)?.formaRetirada === "FACIAL") && 
      <div className="header-accordion-two">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.81815 5H10.679V6.64292H6.64347V10.7337H5V5.81815C5 5.37153 5.37098 5 5.81815 5ZM21.3215 5H26.1824C26.629 5 27.0005 5.37098 27.0005 5.81815V10.727H25.3576V6.64347H21.3149V5H21.3215ZM21.2663 25.3571H25.3571V21.3144H27V26.1752C27 26.629 26.629 26.9934 26.1818 26.9934H21.273V25.3571H21.2663ZM5 21.2663H6.64292V25.3571H10.6856V27H5.81815C5.37153 27 5 26.629 5 26.1819V21.2663Z" fill="#8779F8" />
          <path fillRule="evenodd" clipRule="evenodd" d="M19.4718 18.8131C19.6507 18.4764 20.0631 18.3455 20.3998 18.5244C20.7366 18.6961 20.8674 19.1156 20.6885 19.4524C19.781 21.1919 17.9934 22.2778 16.027 22.2778C14.0539 22.2778 12.273 21.1985 11.3588 19.4524C11.1871 19.1156 11.3108 18.6961 11.6541 18.5244C11.9909 18.3455 12.4105 18.4764 12.5822 18.8131C13.2557 20.1055 14.5762 20.9032 16.0264 20.9032C17.4778 20.9032 18.7978 20.0988 19.4718 18.8131ZM15.3673 18.0159H17.1962C17.5744 18.0159 17.8835 17.7068 17.8835 17.3286C17.8835 16.9505 17.5744 16.6413 17.1962 16.6413H16.0551V14.2482C16.0551 13.87 15.746 13.5608 15.3678 13.5608C14.9897 13.5608 14.6805 13.87 14.6805 14.2482V17.3281C14.6794 17.7134 14.9819 18.0159 15.3673 18.0159ZM11.9092 11.1478C12.5695 11.1478 13.1055 11.6838 13.1055 12.3441C13.1055 13.0044 12.5695 13.5404 11.9092 13.5404C11.2489 13.5404 10.7129 13.0044 10.7129 12.3441C10.7129 11.6838 11.2489 11.1478 11.9092 11.1478ZM18.901 12.3369C18.901 11.6767 19.437 11.1406 20.0973 11.1406C20.7576 11.1406 21.2936 11.6767 21.2936 12.3369C21.2936 12.9972 20.7576 13.5332 20.0973 13.5332C19.437 13.5332 18.901 12.9972 18.901 12.3369Z" fill="#8779F8" />
        </svg>
          <h6 className="title !text-primary">Acesso via identificação facial</h6>
      </div>
        }
      <div className="content-info">
          <h6 className="title">As instruções serão enviadas por e-mail e disponibilizadas no app BipShow</h6>
        {isTicketSelectedUser && isTicketSelectedUser.length > 0 && (
        <ul>
            {isTicketSelectedUser?.map((item) => (
              <li key={item.nome}>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.78906 11.0004H2.78906C2.52385 11.0004 2.26949 11.1057 2.08196 11.2933C1.89442 11.4808 1.78906 11.7352 1.78906 12.0004C1.78906 12.2656 1.89442 12.52 2.08196 12.7075C2.26949 12.895 2.52385 13.0004 2.78906 13.0004H4.78906C5.05428 13.0004 5.30863 12.895 5.49617 12.7075C5.68371 12.52 5.78906 12.2656 5.78906 12.0004C5.78906 11.7352 5.68371 11.4808 5.49617 11.2933C5.30863 11.1057 5.05428 11.0004 4.78906 11.0004ZM21.5691 8.16038V8.10038C21.2825 7.75017 20.9205 7.46931 20.5101 7.27882C20.0997 7.08832 19.6515 6.99314 19.1991 7.00038H11.2691C10.5343 6.99378 9.8226 7.2571 9.26906 7.74038C8.75207 8.19592 8.41216 8.81909 8.30906 9.50038L7.42906 14.5004C7.35339 14.9322 7.37327 15.3753 7.48729 15.7986C7.60132 16.2219 7.80673 16.615 8.08906 16.9504C8.36992 17.2846 8.72035 17.5535 9.11587 17.7383C9.5114 17.9231 9.94249 18.0194 10.3791 18.0204H18.3191C19.0323 18.0312 19.7261 17.7874 20.2759 17.333C20.8256 16.8785 21.1955 16.2429 21.3191 15.5404L22.1991 10.5404C22.2684 10.1217 22.2481 9.69305 22.1395 9.28278C22.0309 8.87252 21.8364 8.48996 21.5691 8.16038ZM18.8291 9.00038L15.4291 11.7604C15.228 11.9224 14.9721 12.0004 14.7149 11.978C14.4577 11.9557 14.2191 11.8347 14.0491 11.6404L11.7191 9.00038H18.8291ZM19.3091 15.1704C19.2686 15.4052 19.1456 15.6178 18.9623 15.77C18.7789 15.9221 18.5473 16.0038 18.3091 16.0004H10.3791C10.2338 15.9992 10.0906 15.9663 9.95938 15.9042C9.82813 15.842 9.712 15.752 9.61906 15.6404C9.52589 15.5294 9.45795 15.3994 9.41997 15.2596C9.38198 15.1197 9.37485 14.9733 9.39906 14.8304L10.1991 10.3004L12.5491 12.9604C13.0606 13.5418 13.7771 13.9028 14.5487 13.968C15.3203 14.0333 16.0872 13.7976 16.6891 13.3104L20.1291 10.5004L19.3091 15.1704ZM5.78906 7.00038H2.78906C2.52385 7.00038 2.26949 7.10574 2.08196 7.29328C1.89442 7.48081 1.78906 7.73517 1.78906 8.00038C1.78906 8.2656 1.89442 8.51996 2.08196 8.70749C2.26949 8.89503 2.52385 9.00038 2.78906 9.00038H5.78906C6.05428 9.00038 6.30863 8.89503 6.49617 8.70749C6.68371 8.51996 6.78906 8.2656 6.78906 8.00038C6.78906 7.73517 6.68371 7.48081 6.49617 7.29328C6.30863 7.10574 6.05428 7.00038 5.78906 7.00038Z" fill="black" fillOpacity="0.6" />
                </svg>
                <div className="email">
                  <p className="text-dark">
                    {item.nome}
                  </p>
                  <p>
                    {item.email}
                  </p>
                </div>
              </li>
            ))}
        </ul>
        )}
      </div>
    </ContainerAccordionTwo>
  );
};
