import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button, ButtonProps } from "../Button";

interface ButtonDetailProps extends ButtonProps { }

export function ButtonDetail({ ...rest }: ButtonDetailProps) {
  return (
    <Button
      loadingPosition="start"
      startIcon={<RemoveRedEyeIcon />}
      color="info"
      {...rest}
      sx={{
        ...rest.sx,
        ":disabled": {
          background: theme => theme.palette.info.main, opacity: 0.5
        }
      }}
    >
      {rest.children}
    </Button>
  )
}