import { TypeEnum, useError } from '@/shared/hooks/useDialog'; 
import { CloseOutlined } from '@mui/icons-material';
import { Dialog as MuiDialog } from '@mui/material'; 

export const ConfirmDialog = ({
  title,
  message,
  open,
  handleClose,
  confirmButtonText,
  onConfirm,
} : any ) => {
   

  return(
    <> 
        <MuiDialog
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDialog-paper': {
              width: '100%',
              maxWidth: '600px',
              borderRadius: '8px',
              padding: '16px 24px',
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '.875rem',
            },
          }}
        >
          <div
            className='flex items-center justify-between w-full'
          >
            <h1
              className='text-xl font-bold'
            >{title}</h1>
            <CloseOutlined
              onClick={handleClose}
              className='cursor-pointer'
            />
          </div>
          <div className='flex flex-col items-center justify-center'> 
            <p className=''>{message}</p>
          </div>
          <div className='flex justify-center w-full'> 
          <div
            className='flex justify-start w-full gap-4'
          >
              <button
                className='text-start'
                onClick={handleClose}
                >
                Fechar
              </button> 
          </div>
            <button
              className='px-4 bg-gradient rounded-lg cursor-pointer text-white py-2 hover:bg-opacity-90'
              onClick={onConfirm}
            >
              {confirmButtonText}
            </button>
          </div>
        </MuiDialog> 
    </>
  )
}