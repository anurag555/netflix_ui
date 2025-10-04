import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";
const api_key="7e74dff1f58e7f183814cfeacb7008d6";
const url="https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming="upcoming";
const nowPlaying="now_playing";
const popular="popular";
const topRated="top_rated";


const Card=({img})=>{
    return(
        <img className='card' src={img} alt="cover"></img>
    )
}

const Row=({title,arr=[]})=>{
    return(
        <div className='row'>
            
            <h2>{title}</h2>
            <div>
           {
            arr.map((item,index)=>(
                <Card img={`${imgUrl}/${item.poster_path}`} key={index}/>
            ))
           }
            
            


            </div>
            </div>
    )
}

const Home = () => {

 const [upcomingMovies,setUpcomingMovies]=useState([]);
 const [nowPlayingMovies,setNowPlayingMovies]=useState([]);
 const [popularMovies,setPopularMovies]=useState([]);
 const [topRatedMovies,setTopRatedMovies]=useState([]);
 const [genres,setGenre]=useState([]);




    useEffect(()=>{
        const fetchUpcoming=async()=>{
       const {data:{results}}=await axios.get(`${url}/movie/${upcoming}?api_key=${api_key}`);
       setUpcomingMovies(results);
      
        };
        const fetchNowPlaying=async()=>{
            const {data:{results}}=await axios.get(`${url}/movie/${nowPlaying}?api_key=${api_key}`);
            setNowPlayingMovies(results);
           
             };
             const fetchPopular=async()=>{
                const {data:{results}}=await axios.get(`${url}/movie/${popular}?api_key=${api_key}`);
                setPopularMovies(results);
               
                 };
                 const fetchTopRated=async()=>{
                    const {data:{results}}=await axios.get(`${url}/movie/${topRated}?api_key=${api_key}`);
                    setTopRatedMovies(results);
                   
                     };
                     const fetchGenre=async()=>{
                        const {data:{genres}}=await axios.get(`${url}/genre/movie/list?api_key=${api_key}`);
                        setGenre(genres);
                       
                         };
        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
        fetchGenre();

    },[])
  return (
    <section className='home'>
        <div className='banner' style={{
            backgroundImage:popularMovies[0]?`url(${`${imgUrl}/${popularMovies[0].poster_path}`})`:"rgb(16,16,16)",

        }}>{
      popularMovies[0]&&
    
     <h1>{popularMovies[0].original_title}</h1>
  
    }
    {
        popularMovies[0]&&
        <p>{popularMovies[0].overview}</p>
    }
    <div>
    <button>
    <BiPlay/>Play 
    </button>
    <button>
My List <AiOutlinePlus/>
    </button>
    </div>


        </div>
        <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
        <Row title={"Now Playing Movies"} arr={nowPlayingMovies}/>
        <Row title={"Popular Movies"} arr={popularMovies}/>
        <Row title={"Top Rated Movies"} arr={topRatedMovies}/>
       <div className='genre'>
        {
            genres.map((item,index)=>(
                <Link to={`/genre/${item.id}`} key={index}>{item.name}</Link>
            ))
        }
       </div>
     
    </section>
  )
}

export default Home
