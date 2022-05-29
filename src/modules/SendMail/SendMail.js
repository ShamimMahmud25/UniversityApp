import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Typography,Button,Container,MenuItem,CircularProgress} from '@material-ui/core'
//import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles,TextField} from '@material-ui/core';
import Layout from "../Layout/NewLayout";
import {Allsessions, userServiceAPI} from "../../config/config"
import axios from "axios";

const useStyles=makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }

})
export default function SendMail() {
  const classes=useStyles()
  const history=useHistory()
  const [session,setSession]= useState("2000-2001");
  const [mailBody,setMailbody]=useState("");
  const [mailSubject,setMailSubject]=useState("");
  const [mailFooter,setMailFooter]=useState("");
     const [error,setError]=useState({
        bodyError:null,
        subjectError:null,
        footerError:null,
        sendError:false
     })
     const [errorMessage,setErrorMessage]=useState({
        bodyError:"",
        subjectError:"",
        footerError:"",
        sendError:""
     })
  const [loading,setLoading]=useState(false); 
  const handleSession=(e)=>{
      setSession(e.target.value);
  }
  const handleMailBody=(e)=>{
      setMailbody(e.target.value);
  }
  const handleMailSubject=(e)=>{
    setMailSubject(e.target.value);
}
const handleMailFooter=(e)=>{
    setMailFooter(e.target.value);
}
const validation=(field,value)=>{
    if(field==="Subject"){
        if(!value){
            setError((prev)=>{
                return {
                    ...prev,
                    subjectError:true
                }
                
            })
            setErrorMessage((prev)=>{
                return {
                    ...prev,
                    subjectError:"Mail Subject required"
                }
            })
        }
        else {
            setError((prev)=>{
                return {
                    ...prev,
                    subjectError:false
                }
                
            })
            setErrorMessage((prev)=>{
                return {
                    ...prev,
                    subjectError:""
                }
            })
        }
    }
    else if (field==="Body"){
        if(!value){
            setError((prev)=>{
                return {
                    ...prev,
                    bodyError:true
                }
                
            })
            setErrorMessage((prev)=>{
                return {
                    ...prev,
                    bodyError:"Mail Body required"
                }
            })
        }
        else {
            setError((prev)=>{
                return {
                    ...prev,
                    bodyError:false
                }
                
            })
            setErrorMessage((prev)=>{
                return {
                    ...prev,
                    bodyError:""
                }
            })
        }
    }
  else{
    if(!value){
        setError((prev)=>{
            return {
                ...prev,
                footerError:true
            }
            
        })
        setErrorMessage((prev)=>{
            return {
                ...prev,
                footerError:"Mail Footer required"
            }
        })
    }
    else {
        setError((prev)=>{
            return {
                ...prev,
                footerError:false
            }
            
        })
        setErrorMessage((prev)=>{
            return {
                ...prev,
                footerError:""
            }
        })
    }
  }
}
console.log(errorMessage);
const hasNoError=()=>{
    return error.subjectError===false && error.bodyError===false && error.footerError===false; 
}
  const handleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);
    // console.log({mailBody,mailSubject,mailFooter,session})
    const body={
        session,
        emailSubject:mailSubject,
        emailBody:mailBody,
        emailFooter:mailFooter

    }
    axios
    .post(`${userServiceAPI}/sendEmail`, body)
    .then((response) => {
    //   console.log(response.status);
    setLoading(false);
      setError((prev)=>{
         return {
             ...prev,
             sendError:false
         }
      });
      setErrorMessage((prev)=>{
          return {
              ...prev,
              sendError:""
          }
      })
      history.push("/home");
      
    })
    .catch((error) => {
      setLoading(false);
      setError((prev)=>{
        return {
            ...prev,
            sendError:true
        }
     });
     setErrorMessage((prev)=>{
         return {
             ...prev,
             sendError:error.response.data
         }
     })
      //console.log(error.response);
    });
   
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
        Send A email
      </Typography>
      <form noValidate autoCapitalize="off" onSubmit={handleSubmit}>
        <TextField
          onChange={handleMailSubject}
          onBlur={()=>{
              validation("Subject",mailSubject);
          }}
          value={mailSubject}
          className={classes.field}
          label="Mail Subject"
          variant="outlined"
          color="secondary"
          fullWidth
          error={error.subjectError}
          helperText={errorMessage.subjectError}
        />
            <TextField
          onChange={handleMailBody}
          onBlur={()=>{
              validation("Body",mailBody);
          }}
          value={mailBody}
          className={classes.field}
          label=" Mail Body"
          variant="outlined"
          color="secondary"
          multiline
          rows={8}
          fullWidth
          error={error.bodyError}
          helperText={errorMessage.bodyError}
        />
        <TextField
          onChange={handleMailFooter}
          onBlur={()=>{
              validation("Footer",mailFooter)
          }}
          value={mailFooter}
          className={classes.field}
          label="Mail Footer"
          variant="outlined"
          color="secondary"
          multiline
          rows={3}
          fullWidth
          error={error.footerError}
          helperText={errorMessage.footerError}
        />
         <TextField
              label="Session"
              select
              value={session}
              onChange={handleSession}
              size="small"
              fullWidth
              variant="outlined"
            >
                 {Allsessions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
            </TextField>
         <Button
        type="submit"
        color="secondary"
        variant="contained"
        disableElevation
        startIcon={<SendIcon />}
        endIcon={<KeyboardArrowRightIcon />}
        disabled={loading ||!hasNoError()}
      >
          {loading ? (
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  className={classes.loading}
                  size={24}
                  thickness={5}
                />
              ) : (
                "Send"
              )}
      </Button>
      </form>
     {error.sendError && 
     <Typography varient="body">
         {errorMessage.sendError}
     </Typography>
     }
    </Container>
    </Layout>
  );
}
