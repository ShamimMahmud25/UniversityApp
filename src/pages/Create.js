import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Typography,Button,Container, FormControlLabel} from '@material-ui/core'
//import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles,Radio,TextField ,RadioGroup,FormControl,FormLabel} from '@material-ui/core';
import Layout from '../modules/Layout/NewLayout';
;

const useStyles=makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }

})
export default function Create() {
  const classes=useStyles()
  const history=useHistory()
  const [title,setTitle]= useState('')
  const [details,setDetails]= useState('')
  const [titleError,setTitleError]= useState(false)
  const [detailsError,setDetailsError]= useState(false)
  const [category,setcategory]= useState("money")
  const handleSubmit=(e)=>{
    setTitleError(false);
    setDetailsError(false);
     e.preventDefault();
     if(title===''){
       setTitleError(true);
     }
     if(details===''){
      setDetailsError(true);
    }
     if(title && details){
      fetch('http://localhost:3000/notes',{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({title,details,category})
      }).then(()=>history.push('/'))
     }
  }
  return (
    <Layout>
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Node 
      </Typography>
      <form noValidate autoCapitalize="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e)=>setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
            <TextField
          onChange={(e)=>setDetails(e.target.value)}
          className={classes.field}
          label=" Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        <FormControl className={classes.field}>
        <FormLabel>Note categorys</FormLabel>
        <RadioGroup value={category} onChange={e=>setcategory(e.target.value)}>
        <FormControlLabel value="money" control={<Radio/>} label="Money"/> 
        <FormControlLabel value="todoes" control={<Radio/>} label="Todoes"/> 
        <FormControlLabel value="reminder" control={<Radio/>} label="Reminder"/> 
        <FormControlLabel value="work" control={<Radio/>} label="Work"/> 
        </RadioGroup>
        </FormControl>
         <Button
        type="submit"
        color="secondary"
        variant="contained"
        disableElevation
        startIcon={<SendIcon />}
        endIcon={<KeyboardArrowRightIcon />}
      >
        Submit
      </Button>
      </form>
     
    </Container>
    </Layout>
  );
}
