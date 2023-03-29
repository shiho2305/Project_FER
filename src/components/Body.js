import { Link, Navigate, useParams } from "react-router-dom";
import React, {useContext,useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContent } from "../App";
import "./Body.css";

import "bootstrap/dist/css/bootstrap.min.css";
import movie from "./data.json";
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  TextField
} from "@mui/material";

const Body = () => {
  // view list movie
  const { user } = useContext(UserContent);
  const [Listmovie, setListMovie] = useState(movie);

  useEffect(() => {
		fetch("http://localhost:3000/movies",
			{ method: "GET" }
		)
			.then((res) => res.json())
			.then((res) => {
				setListMovie(res);
			});
	}, []);

  // search movie
  const [search, setSearch] = useState("");

  const [searchValue, setSearchValue] = useState("");

  // search movie
  const listMovieFilter = useMemo(() => {
    return [
      ...Listmovie.filter((movie) =>
        movie.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    ];
  }, [searchValue, Listmovie]);
  // -------------------------search ----------------------

  const {id} = useParams();


  // filter type
  const listMovieType = useMemo(() => 
  {
    if(id){
      return [
        ...Listmovie.filter((movie) =>
        movie.typeID == id
      )];
    }
    else if(searchValue){
      return [
        ...Listmovie.filter((movie) =>
          movie.name.toLowerCase().includes(searchValue.toLowerCase())
        ),
      ];
    }
    else{
      return [...Listmovie]
    }
  }, [searchValue, Listmovie, id]);
  // -----------------------------------


  useEffect(() => (
    console.log(listMovieType)
 ), [listMovieType])

 function deleteMovie(index){
  // alert(index);
  if (window.confirm("Are you sure you want to delete this student")) {
    let newStudentDelete = [...Listmovie];
    newStudentDelete.filter((e) => e.id !== index);
    setListMovie(newStudentDelete);
  }
 }
 const navigate = useNavigate();
 function handleAdd(){
  navigate('/edit')
 }

 function update(index){
alert(index);
 }

  return (
    <div className="container-fluid d-flex row">
      <div className="wrap col-md-3">
        <h2>Thể loại</h2>
        <div class="list-group">
          <Link to={`/${1}`} className="list-group-item list-group-item-action ">
            Hành động
          </Link>
          <Link to={`/${2}`} className="list-group-item list-group-item-action">
            Tình cảm
          </Link>
          <Link to={`/${3}`} className="list-group-item list-group-item-action">
            Kinh dị
          </Link>
          <Link to={`/${4}`} className="list-group-item list-group-item-action">
            Hoạt Hình
          </Link>
          <Link to={`/${5}`} class="list-group-item list-group-item-action">
            Khoa học - Nghệ thuật
          </Link>
        </div>
      </div>
      <div className="col-md-9">
        <React.Fragment>
          {/* search form */}
          <Box className="search" style={{marginBottom:"2rem"}}>
            <Stack direction="row" spacing={1}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                sx={{ width:500}}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outlined" onClick={() => setSearchValue(search)}>
                Search
              </Button>
              {
                user?.role === 'Admin' ? 
                <Button variant="outlined" onClick={handleAdd}>
                Add new  
               </Button> : ""
              }
             
            </Stack>
          </Box>
        </React.Fragment>

        <Grid container>
          {
          listMovieType.map((movie,index) => (
            <Grid item sm={4} style={{ marginBottom: "2rem" }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 500 }} image={movie.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Năm: {movie.Year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Loại: {movie.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Điểm: {movie.score}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`movie-detail/${movie.id}`}>
                    <Button size="small" variant="contained">
                      Đánh giá
                    </Button>
                  </Link>
                
              {
                user?.role === 'Admin' ? 
                <Button size="small" variant="contained" onClick={() => update(index)}>
               Update
              </Button> : ""


              }

              {
                user?.role === 'Admin' ? 
                <Button size="small" variant="contained" onClick={() => deleteMovie(index)}>
              Delete
              </Button> : ""


              }
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Body;
