import { Box, NoSsr, Skeleton, Stack } from "@mui/material";

interface SkeletonDataGridProps {
  filterColunms: boolean;
}
export function SkeletonDataGrid({
  filterColunms = false,
}: SkeletonDataGridProps) {
  const countRow = typeof window !== "undefined" ? window.innerHeight / 100 : 3;
  const innerHeight: number[] = [];

  for (let index = 1; index < countRow; index++) {
    innerHeight.push(index);
  }

  return (
    <NoSsr>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        height="100%"
      >
        <Stack spacing={1}>
          {innerHeight.map((m) => (
            <Skeleton variant="rounded" height="3rem" key={m} />
          ))}
        </Stack>
        <Box display="flex" justifyContent="space-between" margin=".5rem 1rem">
          <Stack direction="row" spacing={1.5}>
            <Skeleton variant="rounded" height="2rem" width="14rem" />
            <Skeleton variant="circular" height="2rem" width="2rem" />
            {filterColunms && (
              <Skeleton variant="rectangular" height="2rem" width="2rem" />
            )}
          </Stack>
          <Box>
            <Skeleton variant="rounded" height="1rem" width="7rem" />
            <Stack direction="row" spacing={1} marginTop=".5rem">
              <Skeleton variant="circular" height="2rem" width="2rem" />
              <Skeleton variant="circular" height="2rem" width="2rem" />
              <Skeleton variant="circular" height="2rem" width="2rem" />
            </Stack>
          </Box>
        </Box>
      </Box>
    </NoSsr>
  );
}
