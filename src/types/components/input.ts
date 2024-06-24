import { TextField } from '@mui/material';

export interface InputProps extends React.ComponentProps<typeof TextField> {
  label?: string;
  errors?: string;
  validationSchema?: any;
  variant?: 'filled' | 'outlined';
  resetButton?: boolean;
  lefticon?: React.ReactNode;
  righticon?: React.ReactNode;
  onCancelClick?: () => void;
}
