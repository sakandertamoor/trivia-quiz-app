import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from '../../common/style';
import axios from 'axios';
import moment from 'moment';
import {
  DataGrid,
  GridToolbar,
} from '@material-ui/data-grid';
import NoRowsOverlay from '../../components/EditableDatatable/NoRowsOverlay/NoRowsOverlay';
import CardTitle from '../../components/table/CardTitle';
import './Quiz.scss';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Model from './../../components/Model/ModelTemplate';
import AddQuestion from './Question/AddQuestion';
const columns = [
    { 
      field: 'question', 
      headerName: 'Question',  
      type: 'string',
      editable: true, 
      flex: 1, 
    },
    { 
      field: 'answers',
      headerName: 'Answer', 
      type: 'string', 
      editable: true,
      valueFormatter: (params) => {
        return params.value[0].answer
      },
      flex: 1, 
    },
    { 
      field: 'answerOne',
      headerName: 'Answer One', 
      type: 'string', 
      editable: true,
      flex: 1, 
    },
    { 
      field: 'answerTwo',
      headerName: 'Answer Two', 
      type: 'string', 
      editable: true,
      flex: 1, 
    },
    { 
      field: 'answerThree',
      headerName: 'Answer Three', 
      type: 'string', 
      editable: true,
      flex: 1, 
    },
    { 
      field: 'answerFour',
      headerName: 'Answer Four', 
      type: 'string', 
      editable: true,
      flex: 1, 
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      type: 'date',
      flex: 1,
      valueFormatter: (params) => {
        return moment(params.value).format("DD-MM-YYYY");
      },
      editable: false,
    }
];
function ToolbarCustom({disabled, onDelete, onAdd}){
  return (
      <div className="custom-toolbar-container">
        <GridToolbar />
        <div>
        <Button
          variant="contained"
          size={"small"}
          color="secondary"
          onClick={onAdd}
          style={{marginLeft:"15px"}}
          startIcon={<EditIcon />}
        >
          Add
        </Button>
        <Button
          variant="contained"
          size={"small"}
          color="secondary"
          onClick={onDelete}
          disabled={disabled}
          style={{marginLeft:"15px"}}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        </div>
      </div>
  );
}
function Quiz() {
    const classes = useStyles();
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modelState, setModelState] = useState({
      open:false,
      modelTitle:"Add Question Detials",
      content: <AddQuestion handleClose={handleModelClose}/>
    });
    const [selectionModel, setSelectionModel] = React.useState([]);
    useEffect(() => {
        axios.get("quiz").then((resp)=>{
            setQuiz(formateData(resp.data));
        }).finally(()=>{
          setLoading(false);
        })
    }, []);
    const formateData = (data) => {
      return data.map((row) => ({
        ...row, 
        answerOne: row.answers[0].answer,
        answerTwo: row.answers[1].answer,
        answerThree: row.answers[2].answer,
        answerFour: row.answers[3].answer,
      }))
    }
    const handleCellEditCommit = React.useCallback(
        ({ id, field, value }) => {
            if(field === "email" && value.trim().length <=0){
              alert("Email can not be null");
              return;
            }
            const data = {
              [field]:value
            };
            console.log("Data:::", data)
            axios.put(`user/${id}/update`, data).then((response)=>{
              const updatedRows = quiz.map((row) => {
                if (row.id === id) {
                  return { ...row, [field]:value };
                }
                return row;
              });
              setQuiz(removeCurrentUser(updatedRows));
                
            }).catch((error)=>{
              console.log("error::", error)
            });
        },
        [quiz],
    );
    const handleOnDelete = () => {
      setLoading(true);
      axios.post('quiz/delete/bulk', {
          ids:[...selectionModel]
      }).then((response)=>{
        const updatedRows = quiz.filter((row) => {
          return !selectionModel.includes(row.id);
        });
        console.log("updatedRows::", updatedRows)
        setQuiz(formateData(updatedRows));
        setSelectionModel([]);
      }).finally(()=>{
        setLoading(false);
      })
    }
    const handleOnAdd = () => {
      handleModelState({
        open:true,
        modelTitle:"Add Question Detials",
        content: <AddQuestion handleClose={handleModelClose}/>
      })
    }
    const handleModelState = (modelNewState) => {
      setModelState(prevState => ({
        ...prevState,
        ...modelNewState,
      }))
    }
    const handleModelClose = () => handleModelState({open:false})
    const handleSaveModelState = () => {
        //api request to save data;
    }
    return (
        <>
            <Grid container spacing={3}>
                {/* Recent Table */}
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <CardTitle>Quiz</CardTitle>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid 
                        rows={quiz}
                        columns={columns}
                        components={{
                          Toolbar: ()=> <ToolbarCustom 
                          disabled={selectionModel.length <= 0} 
                          onDelete={handleOnDelete}
                          onAdd={handleOnAdd}
                          />,
                          NoRowsOverlay: NoRowsOverlay,
                        }}
                        loading={loading}
                        onCellEditCommit={handleCellEditCommit}
                        onSelectionModelChange={(newSelectionModel) => {
                          setSelectionModel(newSelectionModel)
                        }}
                        selectionModel={selectionModel}
                        // isRowSelectable={(params) => {
                        //   console.log("params::", params);
                        //   return true;
                        //   // return params.row.email !== window.auth.user.email
                        // }}
                        checkboxSelection
                      />
                  </div>
                </Paper>
                </Grid>
            </Grid>      
            <Model 
              open={modelState.open}
              handleClose={handleModelClose}
              modelTitle={modelState.modelTitle}
              content={modelState.content}
              actions={
                <>
                </>
              }
            /> 
        </>

    )
}
export default Quiz;