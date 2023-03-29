
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContent } from "../App";
import "./style.css";
const Login = () => {
	const [account, setAccount] = useState([]); 

    // khi chạy đến đây và submit nó sẽ lấy dữ liệu rồi add vào
	const { setUser } = useContext(UserContent);
	const yearRef = useRef();

	const nameRef = useRef();
    const imgRef = useRef();
    const typeRef = useRef();
    const typeIdO = useRef();
	const navigate = useNavigate();
	useEffect(() => {
		fetch("http://localhost:3000/movies",
			{ method: "GET" }
		)
			.then((res) => res.json())
			.then((res) => {
				setAccount(res);
			});
	}, []);

	

	const handleLogin = (event) => {
        event.preventDefault();
		const nameMoviesO = nameRef.current.value;
		const imgMoviesO = imgRef.current.value;
		const yearRefO = yearRef.current.value;
		const typeRefO = typeRef.current.value;
		const typeIDO = typeIdO.current.value;
		let id = account.length + 1;
        let newStudent = {
            id: id,
           image: imgMoviesO,
           name: nameMoviesO,
           Year: yearRefO,
           type: typeRefO,
           score: 0,
           typeID: typeIDO
          };
          console.log(newStudent);
		// setAccount([...account, newStudent]);

        fetch("http://localhost:3000/movies", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newStudent),
            })
              .then((res) => res.json())
              .then((res) => {
                setUser(res); // set user ở đây sau khi lấy được thông tin từ server
                navigate("/:id");;
              })
              .catch((error) => {
                console.log(error);
                window.alert("Cannot create new account!");
              });
          };

		
	return (
		<div className="wrapper">
			<form className="form-signin">
				<h2 className="form-signin-heading">Add New Movies</h2>

                img,name, year, type, grade
				<input type="file" className="form-control" ref={imgRef}  required="" autofocus="" />
				<input type="text" className="form-control" ref={nameRef}  placeholder="Name" required="" autofocus="" />
				<input type="number" className="form-control" ref={yearRef}  placeholder="Year" required="" autofocus="" />
    				<input type="text" className="form-control" ref={typeRef}  placeholder="Type" required="" autofocus="" />
    				<input type="number" className="form-control" ref={typeIdO}  placeholder="Type" required="" autofocus="" />
				<button className="btn btn-lg btn-primary btn-block" onClick={handleLogin} type="submit">Add New</button>
			</form>
		</div>
	);
};

export default Login;
