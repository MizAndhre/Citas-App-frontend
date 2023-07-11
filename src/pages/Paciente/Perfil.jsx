import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
	const navigate = useNavigate();
	const [doctoresAprobados, setDoctoresAprobados] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		const obtenerDoctoresAprobados = async () => {
			try {
				const { data } = await clienteAxios.get("/usuarios/obtener-doctores-aprobados", config);

				setDoctoresAprobados(data);
			} catch (error) {
				console.log(error.response.data.msg);
			}
		};

		obtenerDoctoresAprobados();
	}, []);

	return (
		<>
			<h1 className='titulo'>Inicio</h1>
			<h2 className='subtitulo'>Lista de doctores disponibles</h2>

			<div className='flex gap-2 flex-wrap justify-around items-center'>
				{doctoresAprobados.map((doctor) => (
					<div className='div-card' key={doctor._id}>
						<h5 className='div-card-titulo'>
							<i className='fa-solid fa-user-doctor div-card-icono'></i>
							{doctor.nombre}
						</h5>

						<p className='div-card-atributo '>
							Especialidad:
							<span className='font-normal'> {doctor.especialidad} </span>
						</p>

						<p className='div-card-atributo '>
							Email:
							<span className='font-normal'> {doctor.email} </span>
						</p>

						<p className='div-card-atributo '>
							Horario:{" "}
							<span className='font-normal'>
								{doctor.horaInicio} - {doctor.horaFinal}
							</span>
						</p>

						<div
							className='div-card-btn'
							onClick={() => navigate(`/paciente/perfil/programar-cita/${doctor._id}`)}>
							<p> Programa cita </p>
							<i className='fa-solid fa-arrow-right-long'></i>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Perfil;
