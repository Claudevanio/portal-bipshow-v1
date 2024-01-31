import { TypeEnum, useError } from '@/shared/hooks/useDialog';
import { CheckRounded, ErrorOutlineRounded, InfoRounded } from '@mui/icons-material';
import { Dialog as MuiDialog } from '@mui/material';
import { Button } from '..';

export const Dialog = ({messagem, type} : any ) => {
  
  const { errorMessage } = useError();
  const { isErrorDialogVisible, setIsErrorDialogVisible } = useError();


  const getIcon = () => {
    switch (type) {
      case TypeEnum.INFO:
        return <InfoRounded 
        className='text-blue'
        fontSize="large" />;
      case TypeEnum.ERROR:
        return <ErrorOutlineRounded 
        className='text-danger'
        fontSize="large" />;
      case TypeEnum.SUCCESS:
        return <CheckRounded
        className='text-green'
        fontSize="large" />;
      default:
        return null;
    }
  };

  return(
    <>
      {isErrorDialogVisible && (
        <MuiDialog
          open={isErrorDialogVisible}
          onClose={() => setIsErrorDialogVisible(false)}
          sx={{
            '& .MuiDialog-paper': {
              width: '100%',
              maxWidth: '400px',
              borderRadius: '8px',
              padding: '40px 20px',
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '.875rem',
            },
          }}
        >
          <div className='flex flex-col items-center justify-center'>
            {getIcon()}
            <p className='text-center'>{errorMessage}</p>
          </div>
          <div className='flex justify-center w-full'>
            <Button
              onClick={() => setIsErrorDialogVisible(false)}
              className='w-[50%] flex justify-center'
            >
              OK
            </Button>
          </div>
        </MuiDialog>
      )}
    </>
  )
}