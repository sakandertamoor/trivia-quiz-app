import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Switch,
    Route
} from "react-router-dom";
import ProtectedRoute from './Protected.route';
import LogIn from './pages/login';
import SignUp from './pages/SignUp';
import Quiz from './pages/Quiz/Quiz';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users/Users';
// import {Provider, connect} from 'react-redux'

function Main() {
    return (
        <>
        <HashRouter>
            <Switch>
                <ProtectedRoute exact path="/" component={Dashboard} />
                <ProtectedRoute exact path="/users" component={Users} />
                <ProtectedRoute exact path="/quiz" component={Quiz} />
                <ProtectedRoute exact path="/login" component={LogIn} />
                <ProtectedRoute exact path="/signup" component={SignUp} />
            </Switch>
        </HashRouter>
        </>
    )
}
// let Main = connect(null)(Main);
// let AppNew = withStyles(styles)(App);
if (document.getElementById('root')) {
    ReactDOM.render(
        // <Provider store={store}>
            <Main/>
        // </Provider>,
        ,
        document.getElementById('root'));
}
