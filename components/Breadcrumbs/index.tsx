
import { Breadcrumbs as BreadcrumbsMui, Typography } from "@mui/material";

interface BreadcrumbsProps {
  breadcrumbNameMap: { [key: string]: string };
  pathname: string[] | undefined;
}
export function Breadcrumbs({
  breadcrumbNameMap, pathname
}: BreadcrumbsProps) {

  return (
    <BreadcrumbsMui sx={{ mb: ".5rem" }}>
      {pathname?.map((_, index) => {

        const last = index === pathname!.length - 1;
        const to = `/${pathname?.slice(0, index + 1).join('/')}`;
        return last ? (
          <Typography
            key={index}
            color="text.primary"
          >
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Typography
            key={index}
            color="text.primary"
            component="strong"
          >
            {breadcrumbNameMap[to]}
          </Typography>
        )
      })
      }
    </BreadcrumbsMui >
  )
}
