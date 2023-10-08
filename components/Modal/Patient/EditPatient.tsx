import { Modal } from "..";

type NewBasicConfigurationProps = {
    open: boolean;
    onClose: () => void;
    queryInvalidate: string;
  }

const EditPatient = ({open,onClose}: NewBasicConfigurationProps) => {
    return <Modal open={open} onClose={onClose} maxHeight={600}>
        Edit
    </Modal>
}

export default EditPatient;