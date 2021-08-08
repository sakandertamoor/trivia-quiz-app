import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import QuestionForm from './QuestionForm/QuestionFrom';
import AnswerForm from './AnswerForm/AnswerForm';
import Preview from './Preview/Preview';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

const steps = ['Questions', 'Answers', 'Preview'];


export default function AddQuestion({
    handleClose
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [questionState, setQuestionState] = React.useState({
      question:"",
      answers:[],
  });
  const handleUpdateQuestionState = (newQuestionState) => {
    setQuestionState(prevState => ({
        ...prevState,
        ...newQuestionState,
    }))
  }
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <QuestionForm onChange={handleUpdateQuestionState}/>;
      case 1:
        return <AnswerForm onChange={handleUpdateQuestionState} answers={questionState.answers} question={questionState.question}/>;
      case 2:
        return <Preview question={questionState.question} answers={questionState.answers}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
    if(activeStep === steps.length - 1){
        setLoading(true);
        axios.post("quiz", questionState).then( response => {
            handleClose();
        }).finally(() => {
            setLoading(false);
        });
    }
    else{
        if((activeStep === 0 && questionState.question.length > 0) || (activeStep === 1 && questionState.answers.length >= 4))
        setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
          <Typography component="h1" variant="h4" align="center">
            Questions
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Done' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
      {
          loading &&
          <div className={classes.addQuestion}>
              <CircularProgress />
          </div>
      }
      </main>
    </React.Fragment>
  );
}