import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function QuestionForm({
    onChange
}) {
    const handleOnChange = ({target:{name, value}}) => {
        onChange && onChange({[name]:value})
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Question
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="question"
            name="question"
            label="Question"
            fullWidth
            autoComplete="given-name"
            onChange={handleOnChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}