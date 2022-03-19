import React from 'react';
import Layout from '../Layout/NewLayout'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Layout>
    <Card className={classes.root}>
      <CardHeader
        title="About this App"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This app is build to help both students and teachers. It can be a platform where everyone can
          access resources.Our seniors can share their current job status and students can be benefited from 
          our seniors. Teachers can easily notify students.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>How to use this app :</Typography>
          <Typography paragraph>
            To use this app , one have to sigup using his email.Then one have to fill up a Registration from
            After registration, one have to verify his email id . A 6 digits OTP will be sent to user given email,
            he can verify email with the otp.
          </Typography>
          <Typography paragraph>
            Then user wil redirect to Home page.User can login this app using email and password.User can reset his password and
            can recover password incase he forget it.
          </Typography>
          <Typography paragraph>
          Teachers can send mail to a group of students to forward some important message.
          </Typography>
          <Typography>
            Everyone can acess some resources and can see who are in this app and their details.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Layout>
  );
}

