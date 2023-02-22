// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import


// ** MUI Components
import Button from '@mui/material/Button'



import InputLabel from '@mui/material/InputLabel'

import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

import  FallbackSpinner  from "src/@core/components/spinner";
import Typography, { TypographyProps } from '@mui/material/Typography'


// ** Icon Imports


// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports

import { uploadImage } from 'src/@core/utils/httpClient'
import { MenuItem, Select } from '@mui/material'


const defaultValues = {
  email: '',
  fullName: '',
  password: '',
  phoneNumber:"",
  birthDate:"",
  nationalId:"",
  address:"",
  role:"",
  file:"",
}
interface FormData {
  fullName:    string;
    email:       string;
    password:    string;
    phoneNumber: string;
    birthDate:   string;
    nationalId:  string;
    address:     string;
    role:        string;
    file:     any;
}





const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: "100%"
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))
const InputsWrapper=styled(Box)<BoxProps>(({})=>({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  gap:8
}))
const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const Register = () => {
  // ** States
  // const [showPassword, setShowPassword] = useState<boolean>(false)
const [loading, setLoading] = useState<boolean>(false);
  const { register,handleSubmit } = useForm()

  // ** Hooks
  const theme = useTheme()
  const { registerUser } = useAuth()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings
  const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    fullName: yup.string().min(3).required(),
    email: yup.string().email().required(),
  })

  const {
    setError,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit =async (data: FormData) => {
    const { email, fullName, password,phoneNumber,
      birthDate,
      nationalId,
      address  ,
      role   ,
      file
   } = data;

   setLoading(true)
const response=await uploadImage(file);


const cloudImageUrl=response?response:'profile.png';
registerUser({ email, fullName, password,phoneNumber,
      birthDate,
      nationalId,
      address  ,
      role   ,
      profile:cloudImageUrl}, err => {
      if (err.email) {
        setError('email', {
          type: 'manual',
          message: err.email
        })
      }
      if (err.fullName) {
        setError('fullName', {
          type: 'manual',
          message: err.fullName
        })
      }
    });
    setLoading(false);
  }


  return (
    <Box className='content-right'>

      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fillOpacity='0.4'
                  fill='url(#paint0_linear_7821_79167)'
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fillOpacity='0.4'
                  fill='url(#paint1_linear_7821_79167)'
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
                />
                <defs>
                  <linearGradient
                    y1='0'
                    x1='25.1443'
                    x2='25.1443'
                    y2='143.953'
                    id='paint0_linear_7821_79167'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop />
                    <stop offset='1' stopOpacity='0' />
                  </linearGradient>
                  <linearGradient
                    y1='0'
                    x1='25.1443'
                    x2='25.1443'
                    y2='143.953'
                    id='paint1_linear_7821_79167'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop />
                    <stop offset='1' stopOpacity='0' />
                  </linearGradient>
                </defs>
              </svg>
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>ماجراجویی از اینجا شروع میشه🚀</TypographyStyled>
              <Typography variant='body2'>با بامبو اپلیکیشن خود را مدیریت کنید.</Typography>
            </Box>
            {loading?<FallbackSpinner/>:   <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <InputsWrapper>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='nationalId' error={Boolean(errors.nationalId)}>
                nationalId
                </InputLabel>
                <OutlinedInput label='nationalId ' {...register('nationalId')} />
                {errors.nationalId && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.nationalId.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='address' error={Boolean(errors.nationalId)}>
                address
                </InputLabel>
                <OutlinedInput label='address ' {...register('address')} />
                {errors.address && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='lesson2' error={Boolean(errors.email)}>
                email
                </InputLabel>
                <OutlinedInput label='توضیخات' {...register('email')} />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='fullName' error={Boolean(errors.fullName)}>
                fullName
                </InputLabel>
                <OutlinedInput label='fullName ها' {...register('fullName')} />
                {errors.fullName && <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='password' error={Boolean(errors.password)}>
                password
                </InputLabel>
                <OutlinedInput label='password ها' {...register('password')} />
                {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
              </FormControl>
            </Box>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='lesson4' error={Boolean(errors.role)}>
                role
                </InputLabel>
                <Select label='role ' {...register('role')} >
                <MenuItem value={"admin"}>admin</MenuItem>
               <MenuItem value={"teacher"}>teacher</MenuItem>
                </Select>
              
                {errors.role && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.role.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='phoneNumber' error={Boolean(errors.phoneNumber)}>
                phoneNumber
                </InputLabel>
                <OutlinedInput label='phoneNumber ' {...register('phoneNumber')} />
            
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='phoneNumber' error={Boolean(errors.birthDate)}>
                birthDate
                </InputLabel>
                <OutlinedInput label='birthDate ' {...register('birthDate')} />
             
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='image-input'>عکس</InputLabel>
                <OutlinedInput id='image-input' type='file' {...register('file')} />
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4, fontSize: 22 }}>
                 ثبت نام
              </Button>
            </Box>
          </InputsWrapper>
        </form>}
         
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
