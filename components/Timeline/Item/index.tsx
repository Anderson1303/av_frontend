import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import DoneIcon from '@mui/icons-material/Done';
import { TimelineOppositeContent } from '@mui/lab';

type Props = {
  children?: JSX.Element|JSX.Element[]|undefined;
  text: String;
  lastChildren?: boolean;
  colorCss?: 'done' | 'sequence' | 'default';
  id: number;
  colorName?: 'error' | 'grey' | 'info' | 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | string;
  isDone?: true;
};

const colorStyle = {
  done: '#0288d1',
  sequence: '#014361',
  default: '#afb1b3'
}

const getColor = (color: string) : string => {
  if(color == 'done')
    return colorStyle.done;
  if(color == 'sequence')
    return colorStyle.sequence;
  return colorStyle.default;
}

export function TimeLineItemC({ text, children, id, colorCss, lastChildren, isDone, ...rest }: Props) {

  return (
    <TimelineItem position='right' {...rest}>
      <TimelineOppositeContent display={'none'} color="textSecondary" >
        {children}
      </TimelineOppositeContent>
      <TimelineSeparator>
          <span style={{paddingTop: 5,height: 35,width: 35,borderRadius: 35,color: '#fff',backgroundColor: getColor(colorCss!!),textAlign: 'center'}}>
            {colorCss == 'sequence' ? <DoneIcon /> : id}
          </span>
          {!lastChildren && <TimelineConnector className='last-item' />}
      </TimelineSeparator>
      <TimelineContent color={getColor(colorCss!!)}>{text}</TimelineContent>
    </TimelineItem>
  );
};
