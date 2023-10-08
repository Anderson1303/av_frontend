import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import ModalMui from '@mui/material/Modal';
import {
  forwardRef, ForwardRefRenderFunction, ReactNode
} from 'react';

interface ModalProps extends BoxProps {
  children: ReactNode;
  isBorder?: boolean;
  isIconClose?: boolean;
  widthModal?: number
  open: boolean;
  onClose: () => void;
}

const ModalBase: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = ({
  children, isBorder = false, open, onClose, isIconClose = false,
  widthModal, ...rest
}, ref) => {

  return (
    <ModalMui
      open={open}
      onClose={() => onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={{
          transform: 'translate(-50%, -50%)',
        }}
          padding={{ xs: 2, sm: 4 }}
          position="absolute"
          top="50%"
          left="50%"
          width="100%"
          maxWidth={rest.maxWidth ?? 600}
          bgcolor="background.paper"
          border={isBorder ? "2px solid #000" : "none"}
          boxShadow="24"
          borderRadius="5px"
          {...rest}
        >
          {isIconClose &&
            <Box
              m=".3rem .5rem 0 0"
              position="absolute"
              top="0"
              right="0"
            >
              <Button
                sx={{ padding: 0, minWidth: 0 }}
                onClick={() => onClose()}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </Box>
          }
          {children}
        </Box>
      </>
    </ModalMui>
  )
}
export const Modal = forwardRef(ModalBase);
