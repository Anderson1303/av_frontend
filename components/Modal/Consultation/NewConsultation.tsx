import { Modal } from "..";
import { Grid } from "@mui/material";
import NewConsultationRegister from "../../Consultation/NewConsultation";
import { IFilterParams } from "../../../interfaces/IGridParams";

type NewConsultationProps = {
  open: boolean;
  onClose: () => void;
  queryInvalidate: string;
  params: any;
  onChangeFilterParams: (event: IFilterParams[]) => void;
};

const NewConsultation = ({
  open,
  onClose,
  onChangeFilterParams,
  params
}: NewConsultationProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ maxWidth: 600 }}
      height={300}
      className="row"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <NewConsultationRegister params={params} onChangeFilterParams={onChangeFilterParams} onClose={onClose}/>
          </Grid>
      </Grid>
    </Modal>
  );
};

export default NewConsultation;
