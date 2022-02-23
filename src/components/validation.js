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
        isValid: false,
        message: "Last Name Required",
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
};
