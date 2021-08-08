import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function AnswerForm({question, answers, onChange}) {
  const handleChange = ({target:{name, value}}) => {
    const indexToUpdate = +name.split('-')[1];
    const prevAns = [
        ...answers
    ]
    prevAns[indexToUpdate] = value;
    onChange && onChange({ answers: prevAns });
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Answers ({question})
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
            required 
            id="answer-0"
            name="answer-0"
            label="Answer One" 
            fullWidth 
            autoComplete="cc-name" 
            onChange={handleChange}
           />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="answer-1"
            name="answer-1"
            label="Answer Two"
            fullWidth
            autoComplete="cc-number"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
          required 
          id="answer-2" 
          name="answer-2" 
          label="Answer Three" 
          fullWidth 
          autoComplete="cc-exp" 
          onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="answer-3"
            name="answer-3"
            label="Answer Four"
            helperText=""
            fullWidth
            autoComplete="cc-csc"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}