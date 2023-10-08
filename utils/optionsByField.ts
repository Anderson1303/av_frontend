import { TypeOption } from "../interfaces/IOption";

export const ajustedFieldComboBox = (value: string) : TypeOption => {
    if(typeof value !== 'string'){
      return {} as TypeOption;
    }
    var info = value.split(' - ',2);
    if(info.length == 2){
      return {value: info[0].toString(), label: info[1].toString()} as TypeOption
    }
    return {} as TypeOption
}