import EditIcon from '@mui/icons-material/Edit';
import { Button, ButtonProps } from ".";

interface ButtonDeleteProps extends ButtonProps { }

export function ButtonDelete({ ...rest }: ButtonDeleteProps) {
  return (
    <Button
      loadingPosition="start"
      startIcon={<EditIcon />}
      color="error"
      {...rest}
      sx={{
        ...rest.sx,
        ":disabled": {
          background: theme => theme.palette.warning.main, opacity: 0.5
        }
      }}
    >
      {rest.children}
    </Button>
  )
}