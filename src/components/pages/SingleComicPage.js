
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import AppBanner from "../appBanner/AppBanner";

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams()
    const [comics, setComics] = useState({});
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [comicId])

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }


    const updateComics = () => {
        clearError()
        getComics(comicId)
        .then(onComicsLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comics) ? <View comics={comics} /> : null;
    return (
       <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
       </>
    )
}

const View = ({comics}) => {
    const {title, description, thumbnail, pageCount, language, price} = comics;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Page count: {pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;