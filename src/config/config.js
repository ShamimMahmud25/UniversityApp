require("dotenv").config();

export const userServiceAPI=process.env.REACT_APP_USER_SERVICE_URL;
export const mailSendAPI=process.env.REACT_APP_MAILSEND_ADAPTER_URL;
export const sessions = [
    {
      value: "2000-2001",
    },
    {
      value: "2001-2002",
    },
    {
      value: "2002-2003",
    },
    {
      value: "2003-2004",
    },
    {
      value: "2004-2005",
    },
    {
      value: "2005-2006",
    },
    {
      value: "2007-2008",
    },
    {
      value: "2008-2009",
    },
    {
      value: "2009-2010",
    },
    {
      value: "2010-2011",
    },
    {
      value: "2011-2012",
    },
    {
      value: "2012-2013",
    },
    {
      value: "2013-2014",
    },
    {
      value: "2014-2015",
    },
    {
      value: "2015-2016",
    },
    {
      value: "2016-2017",
    },
    {
      value: "2017-2018",
    },
  ];
  export const Allsessions=[...sessions,{value:"ALL"}];
