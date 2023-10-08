import Timeline, { TimelineProps } from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { ForwardRefRenderFunction, forwardRef } from "react";

export interface ButtonProps extends TimelineProps {
  badgeContent?: number;
}

export const TimeLineC : ForwardRefRenderFunction<HTMLButtonElement, TimelineProps> = ({
   ...rest
}, ref) => {
return (<Timeline
          position={rest.position}
          className={rest.className}
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0
            },
          }}
          role={rest.role}
        >
          {rest.children}
        </Timeline>)

};