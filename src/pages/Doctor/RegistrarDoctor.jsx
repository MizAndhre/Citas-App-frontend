import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAlerta from "../../hooks/useAlerta";
import clienteAxios from "../../config/axios";

import svgDoctor from "../../assets/undraw_medical_research_qg4d.svg";

const RegistrarDoctor = () => {
	const [nombre, setNombre] = useState("");
	const [email, setEmail] = useState("");
	const [especialidad, setEspecialidad] = useState("");
	const [horaInicio, setHoraInicio] = useState("");
	const [horaFinal, setHoraFinal] = useState("");
	const [password, setPassword] = useState("");
	const [repetirPassword, setRepetirPassword] = useState("");

	const { alertaError, alertaExito } = useAlerta();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(nombre, email, especialidad, horaInicio, horaFinal, password);
		// Comprobar que los campos no esten vacios
		if (
			[nombre, email, especialidad, horaInicio, horaFinal, password, repetirPassword].includes(
				""
			)
		) {
			toast.custom(alertaError("Todos los campos son obligatorios"));
			return;
		}

		//Comprobar que las contraseñas coincidan
		if (password !== repetirPassword) {
			toast.custom(alertaError("Las contraseñas no coinciden"));
			return;
		}
		//Comprobar que la contraseña tenga más de 6 caracteres
		if (password.length < 6) {
			toast.custom(alertaError("La contraseña es muy corta. Utiliza mínimo 6 caracteres"));
			return;
		}

		//Crear el usuario
		try {
			//url y enviar datos al backend
			const url = "/doctores";
			await clienteAxios.post(url, {
				nombre,
				email,
				especialidad,
				horaInicio,
				horaFinal,
				password,
			});
			toast.custom(alertaExito("Cuenta creada correctamente. Inicia Sesión"));
			navigate("/doctor");
		} catch (error) {
			toast.custom(alertaError(error.response.data.msg));
			console.log(error.response.data);
		}
	};

	return (
		<>
			{/* Titulo de La Pagina */}
			<div>
				<h1 className='titulo-auth'>
					{" "}
					Crea una cuenta y Administra <span>tus Citas y Pacientes</span>
				</h1>
				<div className='div-img'>
					<img src={svgDoctor} alt='Ilustración doctor' />
				</div>
			</div>

			{/* Formulario */}
			<div className='div-formulario-doctor'>
				<form onSubmit={handleSubmit}>
					<p className='label-form-sub-ast'></p>
					<div className='my-5'>
						<label className='label-form' htmlFor='nombre'>
							Nombre
						</label>
						<input
							id='nombre'
							type='text'
							placeholder='Escribe tu nombre'
							className='input-form'
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
						/>
					</div>
					<div className='my-5'>
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
						<label className='label-form' htmlFor='especialidad'>
							Especialidad
						</label>
						<input
							id='especialidad'
							type='text'
							placeholder='Escribe tu especialidad'
							className='input-form'
							value={especialidad}
							onChange={(e) => setEspecialidad(e.target.value)}
						/>
					</div>

					<div className='my-5 '>
						<h3 className='label-disponibilidad'>Disponibilidad</h3>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='label-form-sub' htmlFor='horaInicio'>
									Hora Inicio
								</label>
								<input
									id='horaInicio'
									type='time'
									className='input-form'
									value={horaInicio}
									onChange={(e) => setHoraInicio(e.target.value)}
								/>
							</div>
							<div>
								<label className='label-form-sub' htmlFor='horaFinal'>
									Hora Final
								</label>

								<input
									id='horaFinal'
									type='time'
									className='input-form'
									value={horaFinal}
									onChange={(e) => setHoraFinal(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div className='my-5'>
						<label className='label-form label-password' htmlFor='password'>
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
					<div className='my-5'>
						<label className='label-form ' htmlFor='confi-pass'>
							Confirmar Contraseña
						</label>
						<input
							id='confi-pass'
							type='password'
							placeholder='Confirma tu contraseña'
							className='input-form'
							value={repetirPassword}
							onChange={(e) => setRepetirPassword(e.target.value)}
						/>
					</div>

					<input type='submit' value='Crear Cuenta' className='btn' />
				</form>

				<nav className='nav-enlace'>
					<Link to='/doctor' className='enlace'>
						¿Ya tienes cuenta? Inicia Sesión
					</Link>
					<Link to='/' className='enlace'>
						Volver al inicio
					</Link>
				</nav>
			</div>
		</>
	);
};

export default RegistrarDoctor;

{
	/* <Link to='/olvide-password' className='enlace'>
						Olvidé mi contraseña
					</Link> */
}
