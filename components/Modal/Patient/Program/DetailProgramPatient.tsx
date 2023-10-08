import { Modal } from "../..";

type NewBasicConfigurationProps = {
    open: boolean;
    onClose: () => void;
    queryInvalidate: string;
  }

const DetailBasicConfiguration = ({open,onClose}: NewBasicConfigurationProps) => {
    return <Modal open={open} onClose={onClose} maxHeight={600}>
        Detail
    </Modal>
}

export default DetailBasicConfiguration;