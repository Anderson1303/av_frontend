import { Modal } from "..";
import { Grid } from "@mui/material";
import NewPatientRegister from "../../Patient/NewPatient";
import { IFilterParams } from "../../../interfaces/IGridParams";

type NewPatientProps = {
  open: boolean;
  onClose: () => void;
  queryInvalidate: string;
  onChangeFilterParams: (event: IFilterParams[]) => void;
};

const NewPatient = ({
  open,
  onClose,
  onChangeFilterParams
}: NewPatientProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ maxWidth: 600 }}
      height={500}
      className="row"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <NewPatientRegister onChangeFilterParams={onChangeFilterParams} onClose={onClose}/>
          </Grid>
      </Grid>
    </Modal>
  );
};

export default NewPatient;
