// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import authConfig from "src/configs/auth";

// ** Custom Components

import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import

import { deleteCourseById, getAllCourses } from 'src/@core/utils/httpClient'
import { ICourse } from 'src/@core/utils/types'
import { useSnackbar } from 'notistack'
import EditModal from './editmodal'



// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.lesson.image) {
    return <CustomAvatar src={`${row.lesson.image}`} sx={{  width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.title ? row.title : 'John Doe')}
      </CustomAvatar>
    )
  }
}



// ** Full Name Getter


//////////com-----------------------///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CourseDataGrid = () => {

  const { enqueueSnackbar } = useSnackbar();
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!;

  // ** States
  const [pageSize, setPageSize] = useState<number>(7);
  const [loading, setLoading] = useState<boolean>(false);
  const [hideNameColumn, setHideNameColumn] = useState(false);
  const [rows, setRows] = useState<ICourse[]>([])
useEffect(() => {
  const getCourses=async ()=>{
    const res=await getAllCourses();
setRows(res.result);
  };
getCourses()
}, [loading,rows])
const handleDeleteCourse=async (id:string)=>{
  try {
    setLoading(true)
    const res=await deleteCourseById(id,storedToken);
    if (res.success) {
      enqueueSnackbar(res.message[0].message, {
        variant: "success",
        autoHideDuration: 2000,
      });
    }else{
      enqueueSnackbar(res.message[0].message, {
        variant: "warning",
        autoHideDuration: 2000,
      });
    };
    setLoading(false)
  } catch (error) {
    console.log(error);
    setLoading(false)
  }
}
  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'title',
      headerName: 'title',
      hide: hideNameColumn,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center',gap:3 }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, }}>
                {row.title}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.capacity}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'startDate',
      field: 'start_date',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {new Date(params.row.startDate).toLocaleDateString('de-DE')}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'cost',
      headerName: 'cost',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.cost}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'endDate',
      minWidth: 80,
      headerName: 'endDate',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {new Date(params.row.endDate).toLocaleDateString('de-DE')}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'teacher',
      minWidth: 80,
      headerName: 'teacher',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.teacher.fullName}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'delete',
      minWidth: 80,
      headerName: 'delete',
      renderCell: (params: GridRenderCellParams) => (
      <Button onClick={()=>handleDeleteCourse(params.row._id)}>
       حذف دوره
      </Button>
      )
    },
    {
      flex: 0.1,
      field: 'edit',
      minWidth: 80,
      headerName: 'edit',
      renderCell: (params: GridRenderCellParams) => {
        const courseRow=params.row;

        return (
      <EditModal courseRow={courseRow}/>
        )
      }
    },
 

 
  ]

  return (
    <Card>
      <CardHeader
        title='دوره ها'
        action={
          <div>
            <Button size='small' variant='contained' onClick={() => setHideNameColumn(!hideNameColumn)}>
              مخفی کردن نام دوره
            </Button>
          </div>
        }
      />
      <DataGrid
        autoHeight
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />
    </Card>
  )
}

export default CourseDataGrid
