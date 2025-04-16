import { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition} from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'


function RandomChar (){
    
    const [char, setChar] = useState({});
    const [charKey, setCharKey] = useState(Date.now());
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        setCharKey(Date.now());
    
         setTimeout(() => {
            clearError();
            const id = Math.floor(Math.random() * 21);
            getCharacter(id)
                .then(onCharLoaded);
        }, 300);

       
    }

    const errorMessage = error ? <ErrorMessage/> : null;
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
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default RandomChar;