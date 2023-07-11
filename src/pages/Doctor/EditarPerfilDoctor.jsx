import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAlerta from "../../hooks/useAlerta";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditarPerfilDoctor = () => {
	const { auth, actualizarPerfil, autenticarUsuario } = useAuth();
	const [perfil, setPerfil] = useState({});
	const navigate = useNavigate();
	const { alertaExito, alertaError } = useAlerta();

	useEffect(() => {
		setPerfil(auth);
	}, [auth]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { nombre, email, especialidad, horaFinal, horaInicio } = perfil;
		if ([nombre, email, especialidad, horaFinal, horaInicio].includes("")) {
			toast.custom(alertaError("Todos los campos son obligatorios"));
			return;
		}

		const resultado = await actualizarPerfil(perfil);
		toast.custom(alertaExito("Perfil Actualizado"));
		navigate("/doctor/perfil");
		autenticarUsuario();
	};

	return (
		<>
			<h1 className='titulo'>Editar Perfil</h1>

			<div className='div-form-editar'>
				{/* Formulario */}
				<div>
					<form onSubmit={handleSubmit}>
						<div className='my-5'>
							<label className='label-form' htmlFor='nombre'>
								Nombre
							</label>
							<input
								id='nombre'
								name='nombre'
								type='text'
								placeholder='Escribe tu nombre'
								className='input-form'
								value={perfil.nombre || ""}
								onChange={(e) =>
									setPerfil({
										...perfil,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className='my-5'>
							<label className='label-form' htmlFor='email'>
								Correo Electrónico
							</label>
							<input
								id='email'
								name='email'
								type='email'
								placeholder='Escribe tu correo'
								className='input-form'
								value={perfil.email || ""}
								onChange={(e) =>
									setPerfil({
										...perfil,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>

						<div className='my-5'>
							<label className='label-form' htmlFor='especialidad'>
								Especialidad
							</label>
							<input
								id='especialidad'
								name='especialidad'
								type='text'
								placeholder='Escribe tu especialidad'
								className='input-form'
								value={perfil.especialidad || ""}
								onChange={(e) =>
									setPerfil({
										...perfil,
										[e.target.name]: e.target.value,
									})
								}
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
										name='horaInicio'
										type='time'
										placeholder='Escribe tus horas disponibles'
										className='input-form'
										value={perfil.horaInicio || ""}
										onChange={(e) =>
											setPerfil({
												...perfil,
												[e.target.name]: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<label className='label-form-sub' htmlFor='horaFinal'>
										Hora Final
									</label>

									<input
										id='horaFinal'
										name='horaFinal'
										type='time'
										placeholder='Escribe tus horas disponibles'
										className='input-form'
										value={perfil.horaFinal || ""}
										onChange={(e) =>
											setPerfil({
												...perfil,
												[e.target.name]: e.target.value,
											})
										}
									/>
								</div>
							</div>
						</div>

						<input type='submit' value='Guardar Cambios' className='btn' />
					</form>
				</div>
			</div>
		</>
	);
};

export default EditarPerfilDoctor;
