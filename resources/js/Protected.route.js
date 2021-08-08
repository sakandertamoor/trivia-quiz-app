import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import AuthenticationManager from './common/AuthenticationManager';
import App from './pages/App';
export default function ProtectedRoute({
    component: Component, ...rest
}) {
    return (
        <Route 
            {...rest}
            render={props => {
                if(AuthenticationManager.isLoggedIn()){
                    if(routeManager.isAuthenticationPage){        
                        return <Redirect to={
                            {
                                pathname:"/",
                                state:{
                                    from: props.location
                                }
                            }
                        } />
                    }
                    return (
                    <App>
                        <Component {...props} />
                    </App>
                    );
                }
                if(routeManager.isAuthenticationPage){
                   return <Component {...props} />
                }
                return <Redirect to={
                    {
                        pathname:"/login",
                        state:{
                            from: props.location
                        }
                    }
                } />
            }}
        
        />
    )
}
