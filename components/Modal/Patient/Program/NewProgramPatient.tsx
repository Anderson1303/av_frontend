import { Modal } from "../..";
import { Grid } from "@mui/material";
import NewPatientProgram from "../../../Patient/Program";
import { IGridParams } from "../../../../interfaces/IGridParams";

type NewProgramPatientProps = {
  open: boolean;
  onClose: () => void;
  queryInvalidate: string;
  onChangeFilterParams: (gridParams: IGridParams[]) => void;
};

const NewProgramPatient = ({
  open,
  onClose,
  onChangeFilterParams
}: NewProgramPatientProps) => {

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
            <NewPatientProgram onChangeFilterParams={onChangeFilterParams} onClose={onClose}/>
          </Grid>
      </Grid>
    </Modal>
  );
};

export default NewProgramPatient;
