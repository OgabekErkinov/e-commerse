import { Box, Skeleton } from "@mui/material";

interface MultipleLoadingProps {
  count: number;
}

const MultipleLoading: React.FC<MultipleLoadingProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => (
        <Box key={idx} sx={{ width: "100%" }}>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton width="80%" height={30} sx={{ mt: 1 }} />
          <Skeleton width="60%" height={30} />
        </Box>
      ))}
    </>
  );
};

export default MultipleLoading;
