// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useForm, Controller } from 'react-hook-form'
import { Box, BoxProps, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, TextField } from '@mui/material'
import styled from '@emotion/styled'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import dataConfig from 'src/configs/data'

import { useSnackbar } from 'notistack'

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
  image: '',
  category: 1
}
interface FormData {
  lessonName: string
  topics: string
  description: string
  image: string
  category: number
}

const AddLessonPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const schema = yup.object().shape({
    title: yup.string().min(5).required(),
    description: yup.string().required(),
    image: yup.string().required(),
    category: yup.number().required()
  })
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)

    const response = await axios.post(dataConfig.addLessonEndpoint, data)
    console.log(response)

    if (response.data?.success) {
      enqueueSnackbar(response.data.message[0].message, {
        variant: 'success',
        autoHideDuration: 2000
      })
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
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <InputsWrapper>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.lessonName)}>
                  نام درس
                </InputLabel>
                <Controller
                  name='lessonName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label='lessonName'
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.lessonName)}
                    />
                  )}
                />
                {errors.lessonName && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.lessonName.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='topics'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label='topics'
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.topics)}
                      placeholder='topics'
                    />
                  )}
                />
                {errors.topics && <FormHelperText sx={{ color: 'error.main' }}>{errors.topics.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label='توضیحات'
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.description)}
                      placeholder='توضیحات'
                    />
                  )}
                />
                {errors.description && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='category'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label=' دسته بندی'
                      onChange={onChange}
                      error={Boolean(errors.category)}
                    />
                  )}
                />
                {errors.category && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.category.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='image'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField value={value} onBlur={onBlur} label='عکس' onChange={onChange} type='file' />
                  )}
                />
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4, fontSize: 22 }}>
                افزودن درس
              </Button>
            </Box>
          </InputsWrapper>
        </form>
      </Grid>
    </Grid>
  )
}

export default AddLessonPage
