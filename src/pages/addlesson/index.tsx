// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useForm } from 'react-hook-form'
import { Box, BoxProps, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import styled from '@emotion/styled'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import dataConfig from 'src/configs/data'
import  FallbackSpinner  from "src/@core/components/spinner";
import { useSnackbar } from 'notistack'
import { uploadImage } from 'src/@core/utils/httpClient'
import { useState } from 'react'

const InputsWrapper = styled(Box)<BoxProps>(({}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
  Box: {
    flexGrow: 1,
    width: '100%'
  }
}))
const defaultValues = {
  lessonName: '',
  topics: 'front',
  description: '',
  file: '',
  category: 1
}
interface FormData {
  lessonName: string
  topics: string
  description: string
  file: any
  category: string
}

const AddLessonPage = () => {
  const { register, handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const schema = yup.object().shape({
    title: yup.string().min(5).required(),
    description: yup.string().required(),
    category: yup.number().required()
  })
  const {
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (data: FormData) => {
    const { lessonName, topics, description, file, category } = data;
    const arrayTopics=topics.split(" ");
  
    
if(file){
  setLoading(true)
  const res: any = await uploadImage(file);
  try {
    const response = await axios.post(dataConfig.addLessonEndpoint, { lessonName, topics:arrayTopics, description, image:res, category });
    setLoading(false);
    if (response.data?.success) {
      enqueueSnackbar(response.data.message[0].message, {
        variant: 'success',
        autoHideDuration: 2000
      })
    }
    setLoading(false)
  } catch (error) {
    console.log(error);
    setLoading(false)
    enqueueSnackbar("خطایی رخ داده...", {
      variant: 'warning',
      autoHideDuration: 2000
    })
  }
 
}
  

   
  }


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ mb: 6 }}>
          <CardHeader title='اضافه کزدن درس جدید: 🙌'></CardHeader>
          <CardContent>
            <Typography>درس مورد نظر را اضافه کنید:</Typography>
          </CardContent>
        </Card>
{loading?<FallbackSpinner/>:  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <InputsWrapper>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='lesson1' error={Boolean(errors.lessonName)}>
                  نام درس
                </InputLabel>
                <OutlinedInput label='نام درس' {...register('lessonName')} />
                {errors.lessonName && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.lessonName.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='lesson2' error={Boolean(errors.lessonName)}>
                  توضیحات
                </InputLabel>
                <OutlinedInput label='توضیخات' {...register('description')} />
                {errors.lessonName && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.lessonName.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='lesson3' error={Boolean(errors.lessonName)}>
                  سرفصل
                </InputLabel>
                <OutlinedInput label='سرفصل ها' {...register('topics')} />
                {errors.topics && <FormHelperText sx={{ color: 'error.main' }}>{errors.topics.message}</FormHelperText>}
              </FormControl>
            </Box>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='lesson4' error={Boolean(errors.lessonName)}>
                  دسته بندی
                </InputLabel>
                <OutlinedInput label='دسته بندی' {...register('category')} />
                {errors.description && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='image-input'>عکس</InputLabel>
                <OutlinedInput id='image-input' type='file' {...register('file')} />
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4, fontSize: 22 }}>
                افزودن درس
              </Button>
            </Box>
          </InputsWrapper>
        </form>}
      
      </Grid>
    </Grid>
  )
}

export default AddLessonPage
