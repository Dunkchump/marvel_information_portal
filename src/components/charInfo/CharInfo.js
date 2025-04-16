import { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition} from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from "../skeleton/Skeleton"
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';


const CharInfo = (props) => {
    const [char, setChar] = useState(null)
    const [charKey, setCharKey] = useState(Date.now());
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    },[props.charId])


    const updateChar = () => {
        const {charId} = props
        if (!charId){
            return;
        }
        setCharKey(Date.now());
    
        // Задержка перед загрузкой нового персонажа
        setTimeout(() => {
            clearError();
            getCharacter(charId)
                .then(onCharLoaded);
        }, 300)

    }

    const onCharLoaded = (char) => {
        setChar(char)
    }


    const skeleton = char || loading || error ? null: <Skeleton/>;
    const errorMessage = error? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ?
            <SwitchTransition mode="out-in">
              <CSSTransition
              key={charKey}
              timeout={250}
              classNames={"fade-randomChar"}>
                  <View char={char} /> 
              </CSSTransition>
          </SwitchTransition>
     : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
  
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki}className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}

                {
                    comics.map((item, index) => {
                        // eslint-disable-next-line
                        if (item > 9) return

                        return (
                            <li key={index} className="char__comics-item">
                            {item}
                            </li>
                        )
                    })
                }        
            </ul>
        </>
    )
}

export default CharInfo;