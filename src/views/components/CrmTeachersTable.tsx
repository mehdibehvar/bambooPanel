// ** React Import
import { ReactElement, useEffect, useState } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import authConfig from "src/configs/auth";

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import {  ITeacher } from 'src/@core/utils/types';
import {  getAllTeachers } from 'src/@core/utils/httpClient'
import { LoaderIcon } from 'react-hot-toast'




interface CellType {
  row: ITeacher
}

interface RoleObj {
  [key: string]: {
    icon: ReactElement
  }
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const roleObj: RoleObj = {
  admin: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'error.main' }}>
        <Icon icon='mdi:laptop' />
      </Box>
    )
  },
  teacher: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'warning.main' }}>
        <Icon icon='mdi:cog' />
      </Box>
    )
  },
  maintainer: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'success.main' }}>
        <Icon icon='mdi:chart-donut' />
      </Box>
    )
  },
  editor: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'info.main' }}>
        <Icon icon='mdi:pencil-outline' />
      </Box>
    )
  },
  student: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'primary.main' }}>
        <Icon icon='mdi:account-outline' />
      </Box>
    )
  }
}

const statusObj: StatusObj = {
  true: { color: 'success' },
  false: { color: 'secondary' }
}



const renderUserAvatar = (row:ITeacher) => {
  if (row.profile) {
    return <CustomAvatar src={row.profile} sx={{ ml: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar  skin='light' sx={{ ml: 3, width: 34, height: 34, fontSize: '.8rem' }}>
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 200,
    headerName: 'استاد',
    renderCell: ({ row }: CellType) => {
      return (
        <Box  sx={{ display: 'flex', alignItems: 'center' }}>
          {renderUserAvatar(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.fullName}
            </Typography>
            <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
              {row.fullName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: 'email',
    headerName: 'ایمیل',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.email}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 130,
    field: 'role',
    headerName: 'نقش',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
  {roleObj[row.role].icon}
        <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.role==="student"?"دانشجو":row.role==="admin"?"مدیر":row.role==="teacher"?"استاد":"جدید"}</Typography>
      </Box>
    )
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'status',
    headerName: 'وضعیت',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.isActive}
        color={statusObj[`${row.isActive}`].color}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  }
]

const CrmTeachersTable = () => {
    const [teachers, setTeachers] = useState<ITeacher[]>([]);
    useEffect(() =>{
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
       const getTeachers=async (storedToken:any)=>{
        const res=await getAllTeachers(storedToken);
        setTeachers(res.result);
       };
       getTeachers(storedToken);
    }, [])


    const rows=teachers.map((item)=>{
    return {  id:item._id,
        email:item.email,
        fullName:item.fullName,
        profile:item.profile,
        role:item.role,
        isActive:item.isActive,
    }
    });

    
  return (<>
  {teachers?<Card>
      <DataGrid   autoHeight hideFooter rows={rows} columns={columns} disableSelectionOnClick pagination={undefined} />
    </Card>:<LoaderIcon/>}
  </>
    
  )
}

export default CrmTeachersTable
