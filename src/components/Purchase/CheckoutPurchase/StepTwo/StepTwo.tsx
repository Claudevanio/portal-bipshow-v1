import { Button } from '@/components/Form/Button';
import React, { useCallback, useState } from 'react';
import { ContainerStepTwp } from './styles';
import { AccordionTwo } from './AccordionTwo';
import { AccordionThree } from './AccordionThree';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { Accordion, AccordionDetails, AccordionSummary
 } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material';

export const StepTwo: React.FC = () => {
  const [isAccordion, setIsAccordion] = useState<number>(0);
  const [isAccordions, setIsAccordions] = useState<string[]>([String('0')]);

  const {
   amount
  } = useTicketPurchase();

  const handleNextAccordion = useCallback((next: number) => {
    setIsAccordion(next);
    setIsAccordions([
      String(next),
      String(next + 1),
    ]);
  }, []);

  return (
    <ContainerStepTwp>

      <Accordion
        expanded={isAccordion === 0 || isAccordions.includes('0')}
        onChange={() => handleNextAccordion(0)}
        sx={{
            borderRadius: '.5rem',
        }}
        className='py-2'
      >
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDown
              className="text-primary"
            />
          }
        >
          <p className="text-light">Termos de uso</p>
        </AccordionSummary>
        <AccordionDetails>
            <div
              dangerouslySetInnerHTML={{
                __html: `Mauris vehicula pellentesque elit, nec malesuada felis egestas id. Vivamus auctor, eros et sollicitudin feugiat, sem augue rhoncus dolor, ut ornare libero velit vel mauris. Nullam mollis mauris nec aliquet porta. Aliquam ex elit, efficitur id nunc id, commodo fermentum metus. Suspendisse at ipsum eget massa posuere scelerisque ut nec lacus. Vestibulum finibus ipsum et laoreet vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam condimentum rhoncus orci vitae lobortis.`
              }}
            >

            </div>
            <p className="text-light">Ao avançar, declaro que li e estou ciente dos termos e condições acima</p>
            <Button className="button-accept" type="button" text="Aceitar e avançar" variant="medium" onClick={() => handleNextAccordion(1)} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        className='py-2'
        sx={{
            borderRadius: '.5rem',
        }}
        expanded={(!(isAccordion === 0)) && isAccordions.includes('1')}
        onChange={() =>{
          if(isAccordions.includes('1')){
            setIsAccordions(
              isAccordions.filter((i) => i !== '1')
            )
            return
          }

           handleNextAccordion(1)
          }}
        disabled={isAccordion < 1}
        >
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDown
              className="text-primary"
            />
          }>
          <p className="text-light">Acessos</p>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionTwo />
        </AccordionDetails>
      </Accordion>

      <Accordion
        className='py-2'
        sx={{
            borderRadius: '.5rem',
        }}
        disabled={isAccordion < 1}
        expanded={(!(isAccordion === 0)) && isAccordions.includes('2')}
        onChange={() => {
          if(isAccordions.includes('2')){
            setIsAccordions(
              isAccordions.filter((i) => i !== '2')
            )
            return
          }

           handleNextAccordion(2)
          }
        }
        >
        <AccordionSummary
          expandIcon={
            <KeyboardArrowDown
              className="text-primary"
            />
          }>
            {amount > 0 && (
                  <p>Informações de pagamento</p>
                )}
            {amount <= 0 && (
              <p>Ingresso cortesia</p>
            )}
        </AccordionSummary>
        <AccordionDetails>
          <AccordionThree />
        </AccordionDetails>
      </Accordion>

      {/* <Accordion defaultActiveKey={String(isAccordion)} activeKey={isAccordions} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => {
            setIsAccordion(0);
            setIsAccordions(['0']);
          }}
          >
          </Accordion.Header>
          <Accordion.Body className="key-0">

          <iframe
                src={`/assets/termos.html`}
                title={"Termos de uso"}
                width="100%"
                height="80%"
            />
            <p className="text-light">Ao avançar, declaro que li e estou ciente dos termos e condições acima</p>
            <Button className="button-accept" type="button" text="Aceitar e avançar" variant="medium" onClick={() => handleNextAccordion(1)} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className={`${isAccordions.find((i) => i === '1') ? '' : 'disabled'}`}>
          <Accordion.Header>
            Acessos
          </Accordion.Header>
          <Accordion.Body className="key-0">
            <AccordionTwo />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className={`${isAccordions.find((i) => i === '2') ? '' : 'disabled'}`}>
          <Accordion.Header>
            {amount > 0 && (
              <p>Informações de pagamento</p>
            )}
            {amount <= 0 && (
              <p>Ingresso cortesia</p>
            )}
          </Accordion.Header>
          <Accordion.Body className="key-0">
            <AccordionThree />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
    </ContainerStepTwp>
  );
};
