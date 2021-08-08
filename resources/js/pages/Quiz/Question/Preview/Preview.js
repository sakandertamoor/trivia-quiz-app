import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({
    question,
    answers
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {question}
      </Typography>
      <List disablePadding>
        {answers.map((answer, key) => (
          <ListItem className={classes.listItem} key={"answer-"+(key+1)}>
            <ListItemText primary={"Answer-"+(key+1)} secondary={answer} />
            {/* <Typography variant="body2">{answer}</Typography> */}
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}