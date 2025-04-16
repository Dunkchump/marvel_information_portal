import { useHttp } from "../hooks/http.hook"

function useMarvelService() {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = "https://marvel-server-zeta.vercel.app/"
    const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df"
    const _baseOffset = 0

    const getAllCharacters = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(item => _trasformCharacter(item))
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _trasformCharacter(res.data.results[0])
    }

    const getAllComics = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(item => _trasformComics(item))
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _trasformComics(res.data.results[0])
    }

    const getCharacterBySearch = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        
        // Проверка наличия результатов
        if (res.data.results.length > 0) {
            return _trasformCharacter(res.data.results[0]);
        }
        
        // Возвращаем null, если персонаж не найден
        return null;
    }

    const _trasformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'There is no description for this character',
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items                                          
        }
    } 

    const _trasformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            pageCount: comics.pageCount ? `${comics.pageCount} p.`: "No information about the number of pages",
            language: comics.textObjects[0]?.language || "en-us",
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : "not available",
        }
    } 

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getCharacterBySearch}
}

export default useMarvelService