// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CrmTable from 'src/views/components/crmTabel'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Kick start your project 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
            <Typography>
              Please make sure to read our Template Documentation to understand where to go from here and how to use our
              template.
            </Typography>
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
