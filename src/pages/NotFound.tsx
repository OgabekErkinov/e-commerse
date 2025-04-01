import { Box } from "@mui/material"

const NotFound = () => {

  return (
    <Box height='400px' maxWidth='500px' mb={2} mx='auto' display='flex' alignItems='flex-end' justifyContent='center'
         sx={{backgroundImage : 'url(https://img.freepik.com/premium-vector/robot-404-error-vector-design-website-connection-failed-webpage-404-with-ai-technology-computer_572293-3195.jpg)',
            backgroundRepeat : 'no-repeat', backgroundSize : 'contain'}}>
    </Box>
  )
}

export default NotFound
