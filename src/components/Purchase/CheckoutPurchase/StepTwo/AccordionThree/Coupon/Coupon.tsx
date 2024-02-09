import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/components/Form/Input';
import { Button } from '@/components/Form/Button';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { ContainerCoupon } from './styles';
import { CircularProgress, IconButton, Modal, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEventTicket } from '@/shared/hooks';
import { Table } from 'react-bootstrap';
import { Close } from '@mui/icons-material';

export const Coupon: React.FC = () => {
  const methods = useForm<{
    coupon: string
  }>();
  const {
    handleSubmitCouponDiscount, loadingCouponDiscount, couponAppliep, handleRemoveCoupon, amount
  } = useTicketPurchase();
  const { ticketsPurchase } = useEventTicket();
  const [isCoupon, setIsCoupon] = useState<string>();
  const [isError, setIsError] = useState<string>();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const onSubmit = () => {
    if (isCoupon === '' || !isCoupon) {
      setIsError('Insira um valor');
    } else {
      handleSubmitCouponDiscount(isCoupon);
    }
  }; 

  return (
    <ContainerCoupon>
        {ticketsPurchase && (
    <div className="tickets">
      <h6 className="title">Ingressos</h6>
      <TableContainer component={Paper}  
        sx={{
          '& .MuiTableCell-root': {
            textAlign: 'center',
          },
        }}
      >
        <Table
          style={{
            width: '100%',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Valor Unitário</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketsPurchase.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.qtde}</TableCell>
                <TableCell>
                  {item.valor.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell>
                  {(item.valor * item.qtde).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            ))}
            {
              couponAppliep && (
                <TableRow>
                  <TableCell colSpan={1}
                  >Desconto do cupom</TableCell>
                  <TableCell colSpan={2}/>
                  <TableCell>
                    - {couponAppliep.valorDesconto.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </TableCell>
                </TableRow>
              )
            }
            {
              amount && amount !== ticketsPurchase.reduce((acc, item) => acc + (item.valor * item.qtde), 0) -(couponAppliep?.valorDesconto ?? 0) && (
                <TableRow
                  style={{
                    backgroundColor: '#fcfcfc',
                  }}
                >
                  <TableCell colSpan={1}
                  >Taxa:</TableCell>
                  <TableCell colSpan={2}/>
                  <TableCell>
                    {
                      (amount - ticketsPurchase.reduce((acc, item) => acc + (item.valor * item.qtde), 0) + (couponAppliep?.valorDesconto ?? 0)).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        style: 'currency',
                        currency: 'BRL',
                      })
                    }
                  </TableCell>
                </TableRow>
              )
            }
            {
              (
                <TableRow
                  style={{
                    backgroundColor: '#fbfbfb',
                  }}
                >
                  <TableCell
                    colSpan={2}
                  >
                    {
                      !isCouponModalOpen && (
                        <Button
                          type="button"
                          variant="outline-text"
                          text="Incluir cupom de desconto"
                          className='!h-fit !p-0'
                          onClick={() => setIsCouponModalOpen(true)}
                        />
                      )
                    }
                    
                  {!couponAppliep && isCouponModalOpen && (
                      <form
                      >
                        <FormProvider {...methods}> 
                          <div className="input-coupon">
                            <Input
                              onClean={() => {
                                setIsCoupon("");
                                setIsCouponModalOpen(false);
                              }}
                              value={isCoupon}
                              disabled={loadingCouponDiscount}
                              id="coupon"
                              name="coupon"
                              label="Cupom de desconto"
                              rules={{
                                required: {
                                  message: 'Insira um valor',
                                  value: true,
                                },
                              }}
                              type="text"
                              onChange={(event) => {
                                if(event.target.value.length > 12) 
                                  return;
                                setIsCoupon(event.target.value);
                                methods.setValue('coupon', event.target.value);
                              }}
                              errorText={isError}
                            />
                          </div>
                          <div className="btn">
                            {!loadingCouponDiscount && (
                              <Button type="button" variant="outline-text" text="Aplicar" onClick={onSubmit} />
                            )}
                            {loadingCouponDiscount && (
                              <CircularProgress/>
                            )}
                          </div>
                        </FormProvider>
                      </form>
                  )}
                  </TableCell> 
                  <TableCell>Valor Total:</TableCell>
                  <TableCell>
                    {
                      amount.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        style: 'currency',
                        currency: 'BRL',
                      })
                    }
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
        )}
        {
          // (
          //   <>
          //       <h6 className="title mt-4">{couponAppliep ? 'Cupom aplicado' : 'Incluir cupom de desconto'}</h6>
                
          //       {couponAppliep && (
          //         <div className="coupon-applied">
          //           <p className="information pt-2">
          //             {couponAppliep.coupon}
          //           </p>
          //           <div className="btn">
          //             {loadingCouponDiscount && (
          //               <CircularProgress/>
          //             )}
          //             {/* {!loadingCouponDiscount && (
          //               <Button type="button" variant="outline-text" text="Remover cupom" onClick={handleRemoveCoupon} />
          //             )} */}
          //           </div>
          //         </div>
          //       )}

          //       {!couponAppliep && isCouponModalOpen && (
          //           <form
          //           >
          //             <FormProvider {...methods}> 
          //               <div className="input-coupon">
          //                 <Input
          //                   onClean={() => {
          //                     setIsCoupon("");
          //                   }}
          //                   value={isCoupon}
          //                   disabled={loadingCouponDiscount}
          //                   id="coupon"
          //                   name="coupon"
          //                   label="Cupom de desconto"
          //                   rules={{
          //                     required: {
          //                       message: 'Insira um valor',
          //                       value: true,
          //                     },
          //                   }}
          //                   type="text"
          //                   onChange={(event) => {
          //                     if(event.target.value.length > 12) 
          //                       return;
          //                     setIsCoupon(event.target.value);
          //                     methods.setValue('coupon', event.target.value);
          //                   }}
          //                   errorText={isError}
          //                 />
          //               </div>
          //               <div className="btn">
          //                 {!loadingCouponDiscount && (
          //                   <Button type="button" variant="outline-text" text="Aplicar" onClick={onSubmit} />
          //                 )}
          //                 {loadingCouponDiscount && (
          //                   <CircularProgress/>
          //                 )}
          //               </div>
          //             </FormProvider>
          //           </form>
          //       )}
          //       {couponAppliep && (
          //         <div className="discount mb-6">
          //           <h6 className="title">Valor de desconto</h6>
          //           <p className="information">
          //             {couponAppliep.valorDesconto.toLocaleString('pt-BR', {
          //               minimumFractionDigits: 2,
          //               style: 'currency',
          //               currency: 'BRL',
          //             })}
          //           </p>
          //         </div>
          //       )}

          //   </>
          // )
        }

    </ContainerCoupon>
  );
};
