import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import useAlerta from "../hooks/useAlerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

import imagen from "../assets/undraw_online_calendar_re_wk3t.svg";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { alertaError, alertaExito } = useAlerta();

	const navigate = useNavigate();

	const { setAuth } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		//Comprobar que los campos no estan vacíos
		if ([email, password].includes("")) {
			toast.custom(alertaError("Todos los campos son obligatorios"));
			return;
		}

		try {
			// enviar la peticion al backend y esperar los datos
			const url = "/usuarios/login";
			const { data } = await clienteAxios.post(url, { email, password });

			console.log(data);
			//guardar al usuario en local storage para mantener la sesion
			localStorage.setItem("token", data.token);
			localStorage.setItem("role", data.role);
			//mantener el usuario en un context
			setAuth(data);
			toast.custom(alertaExito("Redirigiendo al perfil"));
			//redirigir al perfil
			navigate("/paciente/perfil");
		} catch (error) {
			toast.custom(alertaError(error.response.data.msg));
		}
	};

	return (
		<>
			<div>
				<h1 className='titulo-auth'>
					Inicia Sesión y Programa <span>tus Citas</span>
				</h1>
				<div className='div-img'>
					<img src={imagen} alt='Ilustración doctor' />
				</div>
			</div>

			<div className='div-formulario'>
				<form onSubmit={handleSubmit}>
					<div className='my-5'>
						<p className='label-form-sub-ast'></p>
						<label className='label-form' htmlFor='email'>
							Correo Electrónico
						</label>
						<input
							id='email'
							type='email'
							placeholder='Escribe tu correo'
							className='input-form'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='my-5'>
						<label className='label-form' htmlFor='password'>
							Contraseña
						</label>
						<input
							id='password'
							type='password'
							placeholder='Escribe tu contraseña'
							className='input-form'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<input type='submit' value='Iniciar Sesión' className='btn' />
				</form>

				<nav className='nav-enlace'>
					<Link to='/usuario/registrar' className='enlace'>
						¿No tienes cuenta? Regístrate
					</Link>
					<Link to='/' className='enlace'>
						Volver al inicio
					</Link>
				</nav>
			</div>
		</>
	);
};

export default Login;
