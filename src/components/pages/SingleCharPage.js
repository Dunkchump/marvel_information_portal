
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import AppBanner from "../appBanner/AppBanner";

import './singleComicPage.scss';

const SingleCharPage = () => {
    const {charId} = useParams()
    const [char, setchar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updatechar();
    }, [charId])

    const oncharLoaded = (char) => {
        setchar(char);
    }


    const updatechar = () => {
        clearError()
        getCharacter(charId)
        .then(oncharLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
       <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
       </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content="Marvel character page"
                    />
                <title>{`${name} page`}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                
            </div>
            <Link to=".." className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharPage;