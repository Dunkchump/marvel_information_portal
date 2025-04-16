import ErrorMessage from '../errorMessage/ErrorMessage';
import { NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";
function Page404(){

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>404</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <NavLink style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', "color": "red"}} to="/">Back to main page</NavLink>
        </>
    )

}

export default Page404