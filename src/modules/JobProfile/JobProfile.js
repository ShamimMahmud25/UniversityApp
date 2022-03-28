import { Grid, TextField, MenuItem } from "@material-ui/core";
import React, { useState,useEffect } from "react";
import "./jobprofile.css";
import Layout from "../Layout/NewLayout";
import { getSignupReducer } from "../SignUp/reducer";
import { getUserReducer } from "../Registration/reducer"
import { connect } from "react-redux";
import {companyList,jobRolesList} from "../../config/config"
const JobProfileComponent=(props)=> {
  const [companyName, setCompanyName] = useState("select");
  const [jobRole, setJobRole] = useState("select");
  const [companyNameText, setCompanyNameText] = useState("");
  const [jobRoleText, setJobRoleText] = useState("");
  const [adviceText, setAdviceText] = useState("");
  const [joinDate, setJoinDate] = useState((new Date()).toLocaleDateString('en-CA'));
  const [showOthers, setShowothers] = useState({
    companyName: false,
    jobRole: false,
  });
  const [helpText, setHelpText] = useState({
    companyList: "Please select current your company name",
    companyNameText: "",
    jobRole: "Please select your currernt Job Role",
    jobRoleText: "",
    joinDate :"please choose your approximate joining date"
  });

  useEffect(() => {
    console.log(props);
  }, [props]);
  const handleCompanyChange = (e) => {
    setCompanyName(e.target.value);
    if (e.target.value === "others") {
      setShowothers((prev) => {
        return {
          ...prev,
          companyName: true,
        };
      });
      setHelpText((prev) => {
        return {
          ...prev,
          companyNameText: "Please Type your current Company Name",
        };
      });
    } else {
      setShowothers((prev) => {
        return {
          ...prev,
          companyName: false,
        };
      });
      setCompanyNameText("");
    }
    if (e.target.value !== "select") {
      setHelpText((prev) => {
        return {
          ...prev,
          companyList: "",
        };
      });
    }
  };
  const handleCompanyChangeText = (e) => {
    setCompanyNameText(e.target.value);
  };
  const handleJobRole = (e) => {
    setJobRole(e.target.value);
    if (e.target.value === "others") {
      setShowothers((prev) => {
        return {
          ...prev,
          jobRole: true,
        };
      });
      setHelpText((prev) => {
        return {
          ...prev,
          jobRoleText: "Please Type your Current Job Role",
        };
      });
    } else {
      setShowothers((prev) => {
        return {
          ...prev,
          jobRole: false,
        };
      });
      setCompanyNameText("");
    }
    if (e.target.value !== "select") {
      setHelpText((prev) => {
        return {
          ...prev,
          jobRole: "",
        };
      });
    }
  };
  const handleJobRoleText = (e) => {
    setJobRoleText(e.target.value);
  };
  const handleadviceText = (e) => {
    setAdviceText(e.target.value);
  };
  const handleJoinDate = (e) => {
    setJoinDate(e.target.value);
    setHelpText((prev) => {
      return {
        ...prev,
        joinDate: "",
      };
    });
  };
   
  return (
    <Layout>
      <Grid container className="jobcontainer">
        <Grid item xs={12}>
          <TextField
            id="outlined-select-company"
            select
            label="Company Name"
            value={companyName}
            onChange={handleCompanyChange}
            helperText={helpText.companyList}
            variant="outlined"
            className="company"
          >
            {companyList.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {showOthers.companyName && (
          <Grid item xs={12}>
            <TextField
              value={companyNameText}
              onChange={handleCompanyChangeText}
              variant="outlined"
              className="companyText"
              helperText={helpText.companyNameText}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Job Role"
            value={jobRole}
            onChange={handleJobRole}
            helperText={helpText.jobRole}
            variant="outlined"
            className="jobRole"
          >
            {jobRolesList.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {showOthers.jobRole && (
          <Grid item xs={12}>
            <TextField
              value={jobRoleText}
              onChange={handleJobRoleText}
              variant="outlined"
              className="jobRoleText"
              helperText={helpText.jobRoleText}
            />
          </Grid>
        )}
           <Grid item xs={12}>
            <TextField
              value={joinDate}
              type="date"
              onChange={handleJoinDate}
              default
              variant="outlined"
              label="Job Joining Date"
              className="jobRoleText"
              helperText={helpText.joinDate}
            />
          </Grid >  
          <Grid item xs={12}>
          <TextField
          onChange={handleadviceText}
          value={adviceText}
          className="jobRoleText"
          label="Put your valuable advice"
          variant="outlined"
          color="secondary"
          multiline
          rows={5}
          
        />
           </Grid>
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    signupData: getSignupReducer(state),
    userData: getUserReducer(state),
  };
};
export const JobProfile = connect(mapStateToProps)(
  JobProfileComponent
);
