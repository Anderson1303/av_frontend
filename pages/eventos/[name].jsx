import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import {api} from '../../services/api';
import NewConsultation from "../../components/Modal/Consultation/NewConsultation";
require('moment/locale/pt.js')
import { useEffect } from "react";
import { ButtonDelete } from '../../components/Button/ButtonDelete'
import { Grid } from "@mui/material";
import { useRouter } from 'next/router';
import { enqueueSnackbar } from "notistack";

moment.locale("pt-BR");
const localizer = momentLocalizer(moment);

const resourceMap = [
  { resourceId: 'consultation', resourceTitle: "Consulta" },
  { resourceId: 'birthday', resourceTitle: "Aniversário" }
];

const styles = {
  container: {
    width: "80wh",
    height: "80vh",
    margin: "2em"
  }
};

const CustomCalendar = (pageProps) => {

  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState(moment().toDate());
  const [event, setEvent] = useState(null);
  const [selection, setSelection] = useState(null);
  const [typeEvent, setTypeEvent] = useState('none');
  const [resourceMap, setResourceMap] = useState([]);
  const [open, setOpen] = useState({
    new: false,
    detail: false,
    search: false,
    update: false
  });
  const endpoint = "patient/read";

  const getEvents = async (date,typeEvent) => {
    const results = await api.post('events/read',{
      date,typeEvent
    });

    const data = results.data.data.map(event => {
      event.start = moment(event.start,'YYYY-MM-DDTHH:mm:ss').toDate();
      event.end = moment(event.end,'YYYY-MM-DDTHH:mm:ss').toDate();
      event.resourceId = event.resourceid;
      return event;
    })
    return data;
  }

  const getResources = async (typeEvent) => {
    const results = await api.post('events/type/read',{
      typeEvent
    });

    const data = results.data.data.map(event => {
      event.resourceId = event.id;
      event.resourceTitle = event.name_program;
      return event;
    })
    return data;
  }

  const onNavigate = async (navigate) => {
    setEventDate(navigate);
    const results = await getEvents(moment(navigate).format('YYYY-MM-DD'));
    setEvents(results);
  }

  const onSelectSlot = (slot) => {
    setEvent(slot);
    setOpen({new: true});
  }

  const handleClose = () => {
    setOpen({new: false})
  }

  const onConfirm = async (id, name) => {
    await refreshEvents(typeEvent)
  }

  const handleEventSelection = (e) => {
    setSelection(e);
  };

  const handleDeleteSelection = async () => {
    setSelection(null);
    try{
      const res = await deleteEvent(selection.id);
      if(res.success){
        const results = await getEvents(moment(eventDate).format('YYYY-MM-DD'),typeEvent);
        setEvents(results);
        enqueueSnackbar(
          `Notificação Excluida com Sucesso`,
          { variant: "success" }
        );
      }
    }catch(e){
      enqueueSnackbar(
        `Ocorreu um erro: Não foi possível excluir por que a Notificação já foi enviada` ?? "Internal Server Error",
        { variant: "error" }
      );
    }
  };

  const deleteEvent = async (id) => {
    const results = await api.post(`events/delete/${id}`);
    return results.data;
  }

  const refreshEvents = async (typeEvent) => {
    const results = await getEvents(moment(eventDate).format('YYYY-MM-DD'),typeEvent);
    setEvents(results);
  }

  const refreshResource = async (typeEvent) => {
    const data = await getResources(typeEvent);
    setResourceMap(data);
    await refreshEvents(typeEvent);
  }

  useEffect(() => {
    refreshEvents(typeEvent);
  },[eventDate])

  useEffect(() => {
    if(router.isReady){
      setTypeEvent(router.query.name);
      refreshResource(router.query.name);
    }
  },[router.isReady]);

  return (
    <div style={styles.container}>
      <Grid xs={12} sx={{pb: 1, pt: 1}}>
        <ButtonDelete disabled={selection == null} onClick={handleDeleteSelection}>Excluir</ButtonDelete>
      </Grid>
      <BigCalendar
        selectable
        localizer={localizer}
        events={events}
        onNavigate={onNavigate}
        defaultView={Views.DAY}
        onSelectSlot={onSelectSlot}
        onSelectEvent={handleEventSelection}
        eventPropGetter={
          (event, start, end, isSelected) => {
            console.log(event);
            let newStyle = {
              backgroundColor: "green",
              color: 'black',
              borderRadius: "3px",
              border: "none",
              marginTop: 25,
              marginBottom: 25
            };
      
            if (event.enviada == 1){
              newStyle.backgroundColor = "green"
            }else{
              newStyle.backgroundColor = "yellow"
            }
      
            return {
              className: "",
              style: newStyle
            };
          }
        }
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Día",
        }}
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        steps={60}
        startAccessor="start"
        endAccessor="end"
        toolbar={true}
        culture='pt'
        defaultDate={eventDate}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
      />

      <NewConsultation
        onClose={handleClose}
        open={open.new}
        queryInvalidate={endpoint}
        params={{event,eventDate,typeEvent,onConfirm}}
        onChangeFilterParams={event => setFilterParams(event)}
      />
    </div>
  );
}

export default CustomCalendar;