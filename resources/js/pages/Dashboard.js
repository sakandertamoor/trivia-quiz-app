import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from './../common/style';
export default function Dashboard() {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={3}>
                {/* Recent Table */}
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    Welcome 
                </Paper>
                </Grid>
            </Grid>       
        </div>
    )
}
