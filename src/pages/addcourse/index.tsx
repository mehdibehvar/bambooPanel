// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useForm, Controller } from 'react-hook-form'
import { Box, BoxProps, Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import styled from '@emotion/styled'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import { useSnackbar } from "notistack";
import AsyncSelect from 'react-select/async';
import { ILesson, ITeacher } from 'src/@core/utils/types'
import { useEffect, useState } from 'react'
const InputsWrapper=styled(Box)<BoxProps>(({theme})=>({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  gap:8
}));
const defaultValues = {
  title:    "",
    cost:  400000,
    endDate:  "",
    startDate:"",
    capacity: 100,
    teacher:  "",
    lesson:   "",
};
interface FormData {
    title:     string;
    cost:      number;
    endDate:   string;
    startDate: string;
    capacity:  number;
    teacher:   string;
    lesson:    string;
}

const SecondPage = () => {
  const [teachersOptions, setTeachersOptions] = useState<ITeacher[]>([]);
  const [lessonsOptions, setLessonsOptions] = useState<ILesson[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const schema = yup.object().shape({
    title: yup.string().min(5).required(),
    cost: yup.number().min(3).required(),
    teacher: yup.string().required(),
  })
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const onSubmit = async(data: FormData) => {
    console.log(data);
    
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!;
  const response= await axios
    .post(authConfig.addCourseEndpoint,data,
      {
      headers: {
        'x-auth-token': storedToken,
      }
    });
    if (response.data?.success) {
      enqueueSnackbar(response.data.message[0].message, {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
    
  }
useEffect(() => { 
  const getTeachers =async () => {
    const response=await axios.get(authConfig.getAllTeachersEndpoint);       
    setTeachersOptions(response.data.result)
  };
  getTeachers();
}, [])
useEffect(() => { 
  const getLessons =async () => {
    const response=await axios.get(authConfig.getAllLessonsEndpoint);       
    setLessonsOptions(response.data.result)
  };
  getLessons();
}, [])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{mb:6}}>
          <CardHeader title='اضافه کزدن دوره جدید: 🙌'></CardHeader>
          <CardContent>
            <Typography>
      دوره مورد نظر را اضافه کنید:
            </Typography>
          </CardContent>
        </Card>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <InputsWrapper>
      <Box>
             <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.title)}>
           نام دوره
                </InputLabel>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label='title'
                      onBlur={onBlur}
                      onChange={onChange}
      
                      error={Boolean(errors.title)}
                 
 
                    />
                  )}
                />
                {errors.title && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>
                )}
              </FormControl>
         
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='cost'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label='قیمت'
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.cost)}
                      placeholder='قیمت'
                    />
                  )}
                />
                {errors.cost && <FormHelperText sx={{ color: 'error.main' }}>{errors.cost.message}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor='outlined-select-lessons' error={Boolean(errors.title)}>
           نام درس
                </InputLabel>
                <Controller
                  name='lesson'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
          
                    <Select
                    id="outlined-select-lessons"
                    label="درس"
                   value={value}
                   onChange={onChange}
                   onBlur={onBlur}
                   placeholder="نام درس"
                  >
                    {lessonsOptions.map((option) => (
                      <MenuItem key={option._id}  value={option._id}>
                        {option.lessonName}
                      </MenuItem>
                    ))}
                   
                  </Select>
                  )}
                />
                {errors.lesson && <FormHelperText sx={{ color: 'error.main' }}>{errors.lesson.message}</FormHelperText>}
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4,fontSize:22 }}>
              افزودن دوره
              </Button>
     </Box>
      <Box>
             <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='endDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label='تاریخ پایان'
                      onChange={onChange}
                      placeholder='1343/05/05'
                      error={Boolean(errors.endDate)}
                    />
                  )}
                />
                {errors.endDate && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.endDate.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='startDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label='تاریخ شروع'
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.startDate)}
                      placeholder='تاریخ شروع'
                    />
                  )}
                />
                {errors.startDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.startDate.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='capacity'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label='ظرفیت'
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.startDate)}
                      placeholder='ظرفیت'
                    />
                  )}
                />
                {errors.capacity && <FormHelperText sx={{ color: 'error.main' }}>{errors.capacity.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor='outlined-select-teacher' error={Boolean(errors.title)}>
           نام استاد
                </InputLabel>
                <Controller
                  name='teacher'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Select
                    id="outlined-select-teacher"
                    label="استاد"
                   value={value}
                   onChange={onChange}
                   onBlur={onBlur}
                  >
                    {teachersOptions.map((option) => (
                      <MenuItem key={option._id}  value={option._id}>
                        {option.fullName}
                      </MenuItem>
                    ))}
                   
                  </Select>
                  )}
                />
                {errors.teacher && <FormHelperText sx={{ color: 'error.main' }}>{errors.teacher.message}</FormHelperText>}
              </FormControl>
        </Box>
   
      </InputsWrapper>
           
            </form>
      </Grid>
    </Grid>
  )
}

export default SecondPage
