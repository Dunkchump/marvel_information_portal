import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []); 

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = async (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
 
        for (let comic of newComicsList) {
            await delay(330);
            setComicsList(comicsList => [...comicsList, comic]);
        }

        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(comicsList) {
        const items = comicsList.map(comics => {
            return (
                <CSSTransition key={comics.id} timeout={400} classNames="comics__item">
                    <li className="comics__item">
                        <Link to={`/comics/${comics.id}`}>
                            <img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                            <div className="comics__item-name">{comics.title}</div>
                            <div className="comics__item-price">{comics.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items} 
                </TransitionGroup>
            </ul>
        );
    }
    
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;