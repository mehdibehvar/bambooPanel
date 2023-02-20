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

import { IStudent } from 'src/@core/utils/types';
import { getAllStudents } from 'src/@core/utils/httpClient'




interface CellType {
  row: IStudent
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
  author: {
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

// const rows: TableBodyRowType[] = [
//   {
//     id: 1,
//     role: 'admin',
//     status: 'pending',
//     name: 'Jordan Stevenson',
//     username: '@jstevenson5c',
//     email: 'susanna.Lind57@gmail.com',
//     avatarSrc: '/images/avatars/1.png'
//   },
//   {
//     id: 2,
//     role: 'editor',
//     status: 'active',
//     name: 'Robert Crawford',
//     username: '@rcrawford1d',
//     avatarSrc: '/images/avatars/3.png',
//     email: 'estelle.Bailey10@gmail.com'
//   },
//   {
//     id: 3,
//     role: 'author',
//     status: 'inactive',
//     name: 'Lydia Reese',
//     username: '@lreese3b',
//     email: 'milo86@hotmail.com',
//     avatarSrc: '/images/avatars/2.png'
//   },
//   {
//     id: 4,
//     role: 'editor',
//     status: 'pending',
//     name: 'Richard Sims',
//     username: '@rsims6f',
//     email: 'lonnie35@hotmail.com',
//     avatarSrc: '/images/avatars/5.png'
//   },
//   {
//     id: 5,
//     status: 'active',
//     role: 'maintainer',
//     name: 'Lucile Young',
//     username: '@lyoung4a',
//     email: 'ahmad_Collins@yahoo.com',
//     avatarSrc: '/images/avatars/4.png'
//   },
//   {
//     id: 6,
//     role: 'editor',
//     status: 'pending',
//     name: 'Francis Frank',
//     username: '@ffrank7e',
//     avatarSrc: '/images/avatars/7.png',
//     email: 'tillman.Gleason68@hotmail.com'
//   },
//   {
//     id: 7,
//     role: 'subscriber',
//     status: 'inactive',
//     name: 'Phoebe Patterson',
//     email: 'otho21@gmail.com',
//     username: '@ppatterson2g',
//     avatarSrc: '/images/avatars/8.png'
//   },
//   {
//     id: 8,
//     status: 'active',
//     role: 'subscriber',
//     name: 'Curtis Underwood',
//     username: '@cunderwood8h',
//     avatarSrc: '/images/avatars/3.png',
//     email: 'florencio.Little@hotmail.com'
//   }
// ]

const renderUserAvatar = (row:IStudent) => {
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
    headerName: 'دانشجو',
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
        <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.role==="student"?"دانشجو":row.role==="admin"?"مدیر":"جدید"}</Typography>
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

const CrmTable = () => {
    const [students, setStudents] = useState<IStudent[]>([]);
    useEffect(() =>{
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
       const getStudents=async (storedToken:any)=>{
        const res=await getAllStudents(storedToken);
         setStudents(res.result);
       };
       getStudents(storedToken);
    }, [])

    const rows=students.map((item)=>{
    return {  id:item._id,
        email:item.email,
        fullName:item.fullName,
        profile:item.profile,
        role:item.role,
        isActive:item.isActive,
    }
    });
    console.log(rows);
    
  return (
    <Card>
      <DataGrid   autoHeight hideFooter rows={rows} columns={columns} disableSelectionOnClick pagination={undefined} />
    </Card>
  )
}

export default CrmTable
