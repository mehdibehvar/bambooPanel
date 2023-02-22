import Modal from '@mui/material/Modal';
import EditCourse from './editcourse'
import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import { ICourse } from 'src/@core/utils/types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps{
    courseRow:ICourse
}
const EditModal = ({courseRow}:IProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
    <Button onClick={handleOpen}>ویرایش دوره</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ویرایش : {courseRow.title}
        </Typography>
       <EditCourse courseInfo={courseRow}/>
      </Box>
    </Modal>
  </div>
  )
}

export default EditModal