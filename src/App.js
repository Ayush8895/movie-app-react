import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import MovieComponent from "./components/MovieComponent";
import MovieInfo from "./components/MovieInfo";
export const API_KEY ="ce43f643";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  background-color: purple;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 20px;
  font-size: 65px;
  font-weight: bold;
  box-shadow: 0 3px 600px 500px #555;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 26px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 5px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;


const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;



function App() {

  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 400);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
         <Header>
        <AppName>
          Movie App
        </AppName>
        <SearchBox>
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfo selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
      {movieList?.length ? 
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
       :<div>
       <img src="https://prospected.com/wp-content/uploads/2019/12/Best-Free-Bootstrap-Movie-Templates-Featured.jpg"alt="" />
     </div>}
        </MovieListContainer>
    </Container>
  
  );
}

export default App;
