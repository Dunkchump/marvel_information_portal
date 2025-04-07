import ErrorMessage from '../errorMessage/ErrorMessage';
import { NavLink } from 'react-router-dom';

function Page404(){

    return (
        <>

            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <NavLink style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', "color": "red"}} to="/">Back to main page</NavLink>
        </>
    )

}

export default Page404