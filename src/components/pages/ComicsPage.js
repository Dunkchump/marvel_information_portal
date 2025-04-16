import ComicsList from "../comicsList/ComicsList"
import AppBanner from "../appBanner/AppBanner"
import {Helmet} from "react-helmet";

function ComicsPage (){

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel comics</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage