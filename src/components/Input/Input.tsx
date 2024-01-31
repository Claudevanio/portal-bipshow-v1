'use client'
import { InputProps } from '@/types'
import { Cancel } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'

export const Input = ({ placeholder, className, variant = 'filled', resetButton, ...props }: InputProps) => {
  return (
    <div
      className='relative w-full'
    >
      <TextField
        variant={variant}
        className={className}
        placeholder={placeholder}
        sx={
          variant === 'outlined' ? {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '1.5rem',
              },
              '&:hover fieldset': {
                borderRadius: '1.5rem',
              },
              '&.Mui-focused fieldset': {
                borderRadius: '1.5rem',
              },
            },
          } : {}
        }
        InputProps={{
          startAdornment:  <InputAdornment position="start">{props.lefticon ?? ''}</InputAdornment>,
          endAdornment: resetButton && ( props.value ==='' ? <InputAdornment position="end">
              {props.righticon ? props.righticon : ''}
          </InputAdornment> :<InputAdornment position="end">
              <button
                className='focus:outline-none'
                onClick={() => {
                  if (props.onChange) {
                    props.onChange({ target: { value: '' } } as any)
                  }
                  if(props.onCancelClick)
                    props.onCancelClick()
                }
                }
              >
                <p
                  className='text-sm text-primary font-medium'
                >
                  <Cancel
                    className='text-textPrimary'
                  />
                </p>
              </button>
            </InputAdornment>
          ),
        }}

        {...props as any}
      />
      {
        props.errors && (
          <p className='text-red-500 absolute bottom-0 text-xs mt-1'>{props.errors}</p>
        )
      }
    </div>
  )
}