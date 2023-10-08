import { Modal } from "..";

type DetailConsultationProps = {
    open: boolean;
    onClose: () => void;
    queryInvalidate: string;
  }

const DetailConsultation = ({open,onClose}: DetailConsultationProps) => {
    return <Modal open={open} onClose={onClose} maxHeight={600}>
        Detail
    </Modal>
}

export default DetailConsultation;