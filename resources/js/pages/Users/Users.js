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
import './Users.scss';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 180, 
      editable: true, 
      flex: 1, 
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      type: 'string', 
      editable: true,
      flex: 1, 
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      type: 'date',
      width: 180,
      flex: 1,
      valueFormatter: (params) => {
        return moment(params.value).format("DD-MM-YYYY");
      },
      editable: false,
    }
];
function ToolbarCustom({disabled, onDelete}){
  return (
      <div className="custom-toolbar-container">
        <GridToolbar />
        <Button
          variant="contained"
          size={"small"}
          color="secondary"
          disabled={disabled}
          onClick={onDelete}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>
  );
}
function Users() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectionModel, setSelectionModel] = React.useState([]);
    
    useEffect(() => {
        axios.get("users").then((resp)=>{
            setUsers(removeCurrentUser(resp.data));
        }).finally(()=>{
          setLoading(false);
        })
    }, []);
    const removeCurrentUser = (data) => {
      return data.filter((row)=> row.email !== window.auth.user.email)
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
              const updatedRows = users.map((row) => {
                if (row.id === id) {
                  return { ...row, [field]:value };
                }
                return row;
              });
              setUsers(removeCurrentUser(updatedRows));
                
            }).catch((error)=>{
              console.log("error::", error)
            });
        },
        [users],
    );
    const handleOnDelete = () => {
      setLoading(true);
      axios.post('user/delete/bulk', {
          ids:[...selectionModel]
      }).then((response)=>{
        const updatedRows = users.filter((row) => {
          return !selectionModel.includes(row.id);
        });
        console.log("updatedRows::", updatedRows)
        setUsers(removeCurrentUser(updatedRows));
        setSelectionModel([]);
      }).finally(()=>{
        setLoading(false);
      })
    }
    return (
        <div>
            <Grid container spacing={3}>
                {/* Recent Table */}
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <CardTitle>Users</CardTitle>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid 
                        rows={users}
                        columns={columns}
                        components={{
                          Toolbar: ()=> <ToolbarCustom disabled={selectionModel.length <= 0} onDelete={handleOnDelete}/>,
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
        </div>
    )
}
export default Users;