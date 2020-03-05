import React, {useState, useEffect, Fragment} from 'react';

import './Movie.css';

import {Container, Row, Col} from 'react-bootstrap';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {useSelector} from 'react-redux';

import Navbar from '../../components/Navbar';

import Darth from './../../assets/bg-web/1.png';
import Luke from './../../assets/bg-web/2.png';

import axios from 'axios';

import history from './../../services/history';

import {toast} from 'react-toastify';

export default function Movie({match}) {

  let [character_data, setCharacterData] = useState([]);
  let [box_movie, setBoxMovie] = useState(false);
  let [index_box_movie, setIndexBoxMovie] = useState('');
  let [box_character, setBoxCharacter] = useState(false);
  let [numberBg, setNumberBg] = useState(0);

  const data = useSelector(store => store.requestData.response_data);

  useEffect(() => {
    if(data === ""){
      history.push(`/home`);
    }

    if(data.length === 0){
      history.push(`/home`);
      toast.error('Error to found your search. Please, try again');
    }

    setNumberBg(Math.floor(Math.random() * 2) + 1 ); 
  }, [])

  function renderResponse(){

    if(data === ""){
      history.push(`/home`);
      return;
    }

    function expandListMovie(index){
      setBoxMovie(!box_movie);
      setIndexBoxMovie(index);
      setBoxCharacter(false);
    }

    
    let character_response = []

    async function characterRequest(index) {
      if(index === index_box_movie && box_character === false){
        try {
          const size = 3;
          const promises = data[0].characters.slice(0, size).map(async (url, idx) => {
            const response = await axios.get(url);
            character_response.push(response.data)
          });
  
          await Promise.all(promises);
          setCharacterData(character_response);
          setBoxCharacter(true);
        } catch (err) {
         
        }
      } else {
        setBoxCharacter(!box_character);
      }
    }

    return(
        data.map((movie, i) => {
          return(
            <Fragment key={i} >
              <div className="button-movie" onClick={()=>expandListMovie(i)}>
                  <p>{movie.title}</p>
                  <ExpandMoreIcon/>
              </div>
              {
                box_movie && index_box_movie === i 
                ?
                <Row className="row-movie">
                  <div className="container-img-movie">
                    <img alt="Darth Vader" src={require(`./../../assets/movies/${movie.episode_id}.jpg`)} />
                  </div>
                  <div className="container-info-movie-single">
                    <div>
                      <p>Title: {movie.title}</p>
                    </div>
                    <div>
                      <p>Director: {movie.director}</p>
                    </div>
                    <div>
                      <p>Producer: {movie.producer}</p>
                    </div>
                    <div className="button-movie" onClick={() => characterRequest(i)}>
                      <p>Character</p>
                      <ExpandMoreIcon/>
                    </div>
                    {
                      character_data.length === 0 || !box_character
                      ?
                      null
                      :
                      character_data.map((character, i) => {
                          return(
                            <div className="character-container" key={i}>
                              <div>
                                <p>Name: {character.name}</p>
                                <p>Skin Color: {character.skin_color}</p>
                                <p>Birthday Year: {character.birth_year}</p>
                              </div>
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </Row>
                :
                null
              }
            </Fragment>
          )
        }
      )
    )
  }

  return (
    <div>
        <Container fluid={true}>
          <Navbar/>
          <Row className="row-movie-page" lg={12} md={12} sm={12}>
            <Col className="left-container" lg={4} md={4} sm={12}>
              {
                numberBg === 1
                ? 
                <img width={"65%"} alt="Darth Vader" src={Darth} />
                :
                <img width={"55%"} style={{transform: "scaleX(-1)"}} alt="Luke" src={Luke} />
              }
            </Col>
            <Col className="center-container" lg={8} md={8} sm={12}>
              <div style={{width: "100%"}}>
                <h3>Results of "{match.params.search}"</h3>
                <div className="container-box-movie">
                  {renderResponse()}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  );
}
