import {useState, useEffect, useRef} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

function CharList (props){

    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)
    
    
    const {loading, error, getAllCharacters} = useMarvelService();


    useEffect(() => {
        onRequest(offset, false);
    }, []) 

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }


    const onCharListLoaded = async (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
 
        for (let char of newCharList) {
            await delay(330);
            setCharList(charList => [...charList, char]);
        }

        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }


    const itemRefs = useRef([]);


    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    
    
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <CSSTransition key={item.id} timeout={400} classNames="char__item">
                    <li 
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });
        
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                        {items}
                </TransitionGroup>
            </ul>
            
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !setNewItemLoading? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;