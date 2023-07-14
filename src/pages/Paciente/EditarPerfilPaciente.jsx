import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAlerta from "../../hooks/useAlerta";
import { toast } from "react-hot-toast";

const EditarPerfilPaciente = () => {
	const { auth, actualizarPerfil, autenticarUsuario } = useAuth();
	const [perfil, setPerfil] = useState({});
	const { alertaError } = useAlerta();

	useEffect(() => {
		setPerfil(auth);
	}, [auth]);

	console.log(perfil);
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(perfil);

		const { nombre, email } = perfil;
		if ([nombre, email].includes("")) {
			toast.custom(alertaError("Todos los campos son obligatorios"));
			return;
		}

		const resultado = await actualizarPerfil(perfil);
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
							<label htmlFor='genero' className='label-form-no'>
								Genero
							</label>
							<select
								id='genero'
								name='genero'
								className='input-form'
								value={perfil.genero || ""}
								onChange={(e) =>
									setPerfil({
										...perfil,
										[e.target.name]: e.target.value,
									})
								}>
								<option value=''>--Género--</option>
								<option value='femenino'>Femenino</option>
								<option value='masculino'>Masculino</option>
								<option value='no binario'>No binario</option>
								<option value='otro'>Otro</option>
							</select>
						</div>

						<div className='my-5'>
							<label className='label-form-no'>Teléfono</label>
							<input
								type='text'
								name='telefono'
								className='input-form'
								value={perfil.telefono || ""}
								onChange={(e) =>
									setPerfil({
										...perfil,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>

						<input type='submit' value='Guardar Cambios' className='btn' />
					</form>
				</div>
			</div>
		</>
	);
};

export default EditarPerfilPaciente;
