// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CrmTable from 'src/views/components/crmTabel'
import CrmTeachersTable from 'src/views/components/CrmTeachersTable'
import CourseDataGrid from 'src/views/components/coursesDataGrid'

const Home = () => {
  return (
    <Grid container spacing={6}>
           <Grid item xs={12}>
        <Card>
          <CardHeader title='لیست دوره ها'></CardHeader>
          <CardContent>
            <Typography>لیست دوره ها که در دوره های بامبو شرکت کردهاند.</Typography>
            
          </CardContent>
        <CourseDataGrid/>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='لیست استادها:'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>لیست اساتید بامبو</Typography>
            <CrmTeachersTable/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='لیست دانشجویان'></CardHeader>
          <CardContent>
            <Typography>لیست دانشجویانی که در دوره های بامبو شرکت کردهاند.</Typography>
            
          </CardContent>
        <CrmTable/>
        </Card>
      </Grid>
 
    </Grid>
  )
}

export default Home
