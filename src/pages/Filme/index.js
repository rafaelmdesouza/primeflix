import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import { toast } from 'react-toastify';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadFilme() {
            await api.get(`/movie/ ${ id }`, {
                params:{
                    api_key:"dc009c9dbe6d93a1683882818ba69ec4",
                    language:"pt-BR",                    
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch((e)=>{
                navigate("/", { replace: true });
                return;
            });            
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        }
    }, [navigate, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id);

        if (hasFilme){
            toast.warn('Esse filme já está na sua lista!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className='detalhe'>
            <div className='filme-info'>
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="Capa do filme" />

                <h3>Sinopse</h3>
                <span>{filme.overview}</span>
                <strong>Avaliação: { Number(filme.vote_average).toFixed(1) } / 10</strong>

                <hr/>

                <div className='area-buttons'>
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                            Trailer
                        </a>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Filme;