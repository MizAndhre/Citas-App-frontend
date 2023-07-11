import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { toast } from "react-hot-toast";
import useAlerta from "../../hooks/useAlerta";

const PerfilDoctor = () => {
	const { alertaError, alertaExito } = useAlerta();

	const [citasSolicitadas, setCitasSolicitadas] = useState([]);
	const [citasAprobadas, setCitasAprobadas] = useState([]);
	const [citasHoy, setCitasHoy] = useState([]);
	const [citasSemana, setCitasSemana] = useState([]);
	const [citasMes, setCitasMes] = useState([]);
	// const { alertaError, alertaExito } = useAlerta();

	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const obtenerCitas = async () => {
		try {
			const url = "/doctores/obtener-citas-solicitadas";
			const { data } = await clienteAxios.get(url, config);

			setCitasSolicitadas(data);
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

	const obtenerCitasAprobadas = async () => {
		try {
			const url = "/doctores/obtener-citas-aprobadas";
			const { data } = await clienteAxios.get(url, config);

			setCitasAprobadas(data.citas);
			setCitasHoy(data.citasHoy);
			setCitasSemana(data.citasSemana);
			setCitasMes(data.citasMes);
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

	const cambiarEstadoCitaAprobada = async (_id, estado) => {
		try {
			//url y enviar datos al backend
			const url = "/doctores/cambiar-estado-citas-aprobadas";
			const { data } = await clienteAxios.post(
				url,
				{
					_id,
					estado,
				},
				config
			);

			toast.custom(alertaExito(data.msg));
			obtenerCitasAprobadas();
		} catch (error) {
			toast.custom(alertaError(error.response.data.msg));
			console.log(error.response.data);
		}
	};

	useEffect(() => {
		obtenerCitas();
		obtenerCitasAprobadas();
	}, []);

	return (
		<>
			<h1 className='titulo'>Dashboard | Citas</h1>
			<div className='flex flex-wrap justify-around gap-4 mt-6'>
				<div className='card-dash'>
					<h3 className='card-dash-titulo'>Hoy</h3>
					<p className='card-dash-numero'>{citasHoy.length}</p>
				</div>
				<div className='card-dash'>
					<h3 className='card-dash-titulo'>Semana</h3>
					<p className='card-dash-numero'>{citasSemana.length}</p>
				</div>
				<div className='card-dash'>
					<h3 className='card-dash-titulo'>Mes</h3>
					<p className='card-dash-numero'>{citasMes.length}</p>
				</div>
				<div className='card-dash'>
					<h3 className='card-dash-titulo'>Solicitadas</h3>
					<p className='card-dash-numero'>{citasSolicitadas.length}</p>
				</div>
				<div className='card-dash'>
					<h3 className='card-dash-titulo'>Programadas</h3>
					<p className='card-dash-numero'>{citasAprobadas.length}</p>
				</div>
			</div>
			<h2 className='subtitulo mb-0 mt-10 uppercase'>Citas Hoy</h2>
			<div className='overflow-x-auto'>
				<table className='tabla'>
					<thead className='tabla-head'>
						<tr>
							<th className='columna'>#</th>
							<th className='columna'>Paciente</th>
							<th className='columna'>Hora</th>
							<th className='columna'>Motivo</th>
							<th className='columna'>Acción</th>
						</tr>
					</thead>

					<tbody className='tabla-body'>
						{citasHoy.map((cita, i) => {
							const horaFormateada = new Date(cita.hora).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							});

							return (
								<tr key={cita._id}>
									<td className='tabla-celda'>{i + 1}</td>
									<td className='tabla-celda'>{cita.usuarioInfo.nombre}</td>
									<td className='tabla-celda'>{horaFormateada}</td>
									<td className='tabla-celda capitalize'>{cita.motivo}</td>
									<td className='tabla-celda'>
										<span
											className='enlace-tabla btn-green'
											onClick={() => cambiarEstadoCitaAprobada(cita._id, "completada")}>
											Completada
										</span>

										<span
											className='enlace-tabla btn-red'
											onClick={() => cambiarEstadoCitaAprobada(cita._id, "cancelada")}>
											Cancelada
										</span>
										<span
											className='enlace-tabla btn-yellow'
											onClick={() => cambiarEstadoCitaAprobada(cita._id, "falto")}>
											Faltó
										</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default PerfilDoctor;
