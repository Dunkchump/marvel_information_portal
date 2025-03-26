import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 0,
        charEnded: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9){
            ended = true
        }

        this.setState(({offset, charList}) => {
            return {
                charList: [...charList, ...newCharList],
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }
        } )
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            // let imgStyle = {'objectFit' : 'cover'};
            // if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            //     imgStyle = {'objectFit' : 'unset'};
            // }
            
            return (
                <li 
                    className="char__item "
                    tabIndex={0}
                    key={item.id}>
                        <img src={item.thumbnail} alt={item.name} 
                        onClick={() => this.props.gettingCharId(item.id)}
                        // style={imgStyle}
                        />
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        
        const items = this.renderItems(charList);


        return (
            <div className="char__list">
                
                {loading ? <Spinner />: error ? <ErrorMessage/> : items }
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onFocus={() => this.onRequest(offset)}
                    style={{"display": charEnded ? "none" : "block"}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}



export default CharList;