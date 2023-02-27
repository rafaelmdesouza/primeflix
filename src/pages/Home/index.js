import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

let maxPage = 1;

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadFilmes(page) {
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key:"dc009c9dbe6d93a1683882818ba69ec4",
                    language:"pt-BR",
                    page: currentPage,
                }
            });

            maxPage = response.data.total_pages;
            console.log(response);
            setFilmes(response.data.results);
            setLoading(false);
        };

        loadFilmes();
    }, [currentPage]);

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    function previousPage(e) {        
        window.scrollTo(0,0);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage(e) {        
        window.scrollTo(0,0);
        if (currentPage < maxPage) {            
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='lista-filmes'>
                    {filmes.map( (filme) => {
                        return(
                            <article key={filme.id}>
                                <div className='titulo'>
                                    <strong>{filme.title}</strong>
                                </div>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="Capa do filme"></img>
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })}                
                </div>                         
            </div>
            <div className='botoes'>
                <button onClick={previousPage}>Voltar</button>
                <span>Página {currentPage} de {maxPage} </span>
                <button onClick={nextPage}>Avançar</button>
            </div>
        </div>
    )
}

export default Home;