import React, {useState, useEffect} from 'react';

import './Home.css';

import {Container, Row, Col, Form} from 'react-bootstrap';

import {useDispatch} from 'react-redux';
import {responseData} from './../../actions';

import Navbar from './../../components/Navbar';
import Input from './Input';
import ButtonPrimary from './../../components/Button/ButtonPrimary';
import ButtonSecondary from './../../components/Button/ButtonSecondary';

import CharacterIcon from './../../assets/bg-web/character-icon.png';
import MovieIcon from './../../assets/bg-web/movie-icon.png';
import Darth from './../../assets/bg-web/1.png';
import Luke from './../../assets/bg-web/2.png';

import api from './../../services/api';
import history from './../../services/history';

import axios from 'axios';

import {toast} from 'react-toastify';

export default function Home() {
  let [search, setSearch] = useState('');
  let [type_search, setTypeSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(responseData(''));
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    let films_data = [];

    async function searchRequest() {
      try {
        const response = await api.get(`/${type_search}/?search=${search}`);
        
        if(type_search === "films"){
          dispatch(responseData(response.data.results));
          history.push(`/movie/${search}`);
        } else {
          async function getFilmsCharacter() {
            try {
              const promises = response.data.results[0].films.map(async (url) => {
                const response_film = await axios.get(url);
                films_data.push(response_film.data);
              });
              await Promise.all(promises);
              dispatch(responseData(films_data));
              history.push(`/movie/${search}`);
            } catch (err) {
              toast.error('Error to found your search. Please, try again');
            }
          }
          getFilmsCharacter();
        }

      } catch (err) {
        toast.error('Error to found your search. Please, try again');
      }
    }
    searchRequest();
  }

  function selectType(type){
    if(type === "movie"){
      setTypeSearch("films");
    } else {
      setTypeSearch("people");
    }
  }

  function backHome(){
    setTypeSearch("");
  }

  return (
    <div>
        <Container fluid={true}>
          <Navbar/>
          <Row className="row-home-page" lg={12} md={12} sm={12}>
            <Col className="left-container" lg={4} md={4} sm={12}>
              <img alt="Darth Vader" src={Darth} />
            </Col>
            <Col className="center-container" lg={4} md={4} sm={12}>
              <div>
                <h1>Star Wars app challenge</h1>
                <h5>
                  Go on and try to search your favorite movie or character from Star Wars Saga.
                </h5>
                {
                  type_search === ""
                  ?
                  <Row className="container-box">
                    <div onClick={() => selectType("movie")} className="box-choose-search box-red">
                      <div>
                        <img alt="Movie" src={MovieIcon} />
                        <p>Movie</p>
                      </div>
                    </div>
                    <div onClick={() => selectType("people")} className="box-choose-search box-blue">
                      <div>
                        <img alt="Character" src={CharacterIcon} />
                        <p>Character</p>
                      </div>
                    </div>
                  </Row>
                  :
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Input
                        required
                        type="text"
                        name="search"
                        placeholder={type_search === "films" ? "Movie" : "Character"}
                        onChange={e => setSearch(e.target.value)}
                      />
                      <Row className="container-button">
                        <ButtonSecondary onClick={backHome}>
                          Back
                        </ButtonSecondary>
                        <ButtonPrimary type="submit">
                          Search
                        </ButtonPrimary>
                      </Row>
                    </Row>
                  </Form>
                }
              </div>
            </Col>
            <Col className="right-container" lg={4} md={4} sm={12}>
              <img alt="Luke" src={Luke} />
            </Col>
          </Row>
        </Container>
    </div>
  );
}
