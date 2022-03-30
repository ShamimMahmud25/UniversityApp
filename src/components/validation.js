export const validate = (Name, value) => {
  if (Name === "FirstName") {
    if (!/^\s*$/.test(value)) {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return {
          isValid: false,
          message: "First Name can not contain special characters",
        };
      } else {
        return {
          isValid: true,
          message: "",
        };
      }
    } else {
      return {
        isValid: false,
        message: "First Name Required",
      };
    }
  } else if (Name === "LastName") {
    if (!/^\s*$/.test(value)) {
        if (!/^[A-Za-z\s]*$/.test(value)) {
            return {
              isValid: false,
              message: "Last Name can not contain special characters",
            };
          } else {
            return {
              isValid: true,
              message: "",
            };
          }
    } else {
      return {
        isValid: true,
        message: "",
      };
    }
  }
  else if(Name==="Address"){
      if(!/^\s*$/.test(value)){
          return {
            isValid: true,
            message: "",
          }
      }
      else {
        return {
            isValid: false,
            message: "Address Required",
          };
      }
  }
  else if(Name==="Email"){
    if(!/^\s*$/.test(value)){
      if (  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )){
            return {
                isValid: true,
                message: "",
              }
          }
        else
        {
            return {
                isValid:false,
                message:"This does not look like email!"
            }
        }
       
    }
    else {
      return {
          isValid: false,
          message: "Email Required",
        };
    }
  }
  else if(Name==="Mobile"){
    if(!/^\s*$/.test(value)){
      if(!/^[0-9]{11}$/.test(value)){
        return {
          isValid: false,
          message: "Enter Valid Mobile Number",
        }
      }
      else
      {
        return {
          isValid: true,
          message: "",
        }
      }
     
  }
  else {
    return {
        isValid: true,
        message: "",
      };
  }
  }
  else if(Name==="StudentID"){
    if(!/^\s*$/.test(value)){
      if(!/^[0-9]{10}$/.test(value)){
        return {
          isValid: false,
          message: "Enter Valid StudentID or keep it empty",
        }
      }
      else
      {
        return {
          isValid: true,
          message: "",
        }
      }
     
  }
  else {
    return {
        isValid: true,
        message: "",
      };
  }
  }
  else if(Name==="Password"){
    if(!/^\s*$/.test(value)){
      if(String(value).length<8){
        return {
          isValid: false,
          message: "Password must be atleast 8 characters!",
        }
      }
      else
      {
        return {
          isValid: true,
          message: "",
        }
      }
     
  }
  else {
    return {
        isValid: false,
        message: "Password Required",
      };
  }
  }
  else if(Name==="Code"){
    if(!/^\s*$/.test(value)){
      if(String(value).length!==6){
        return {
          isValid: false,
          message: "Code must be 6 digits!",
        }
      }
      else
      {
        return {
          isValid: true,
          message: "",
        }
      }
     
  }
  else {
    return {
        isValid: false,
        message: "Code Required",
      };
  }
  }
};
