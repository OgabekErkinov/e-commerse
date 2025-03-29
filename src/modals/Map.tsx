import { Box, Typography } from "@mui/material";

const Map = () => {
  return (
    <Box width="60%" m="auto" bgcolor="#fff" p={3} borderRadius="8px">
      <Typography variant="h6" fontWeight="600" mb={2}>
        Our Location (Qarshi, Uzbekistan)
      </Typography>
      <Box height="400px">
        <iframe
          title="Google Maps"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47921.88162719076!2d65.77185928535093!3d38.86083916177217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4ea6e06b6828df%3A0x997d8cc644f2e164!2sQarshi%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1711049572894"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default Map;
