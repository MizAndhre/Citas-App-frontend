import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import useAlerta from "../../hooks/useAlerta";
import { toast } from "react-hot-toast";

const CitasProgramadas = () => {
	const [citas, setCitas] = useState([]);
	const { alertaError, alertaExito } = useAlerta();

	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const obtenerCitasAprobadas = async () => {
		try {
			const url = "/doctores/obtener-citas-aprobadas";
			const { data } = await clienteAxios.get(url, config);

			setCitas(data.citas);
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

	useEffect(() => {
		obtenerCitasAprobadas();
	}, []);

	const cambiarEstadoCitaAprobada = async (_id, estado) => {
		console.log(_id, estado);

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
			console.log(data);
			toast.custom(alertaExito(data.msg));
			obtenerCitasAprobadas();
		} catch (error) {
			toast.custom(alertaError(error.response.data.msg));
			console.log(error.response.data);
		}
	};

	// console.log(citas);

	return (
		<>
			<h1 className='titulo'>Citas Programadas</h1>

			<div className='overflow-x-auto'>
				<table className='tabla'>
					<thead className='tabla-head'>
						<tr>
							<th className='columna'>#</th>
							<th className='columna'>Paciente</th>
							<th className='columna'>Fecha</th>
							<th className='columna'>Hora</th>
							<th className='columna'>Motivo</th>
							<th className='columna'>Estado</th>
							<th className='columna'>Acción</th>
						</tr>
					</thead>

					<tbody className='tabla-body'>
						{citas.map((cita, i) => {
							const fechaFormateada = new Date(cita.fecha);
							const dia = fechaFormateada.getUTCDate();
							const mes = fechaFormateada.getUTCMonth() + 1;
							const year = fechaFormateada.getUTCFullYear();
							const horaFormateada = new Date(cita.hora).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							});

							return (
								<tr key={cita._id}>
									<td className='tabla-celda'>{i + 1}</td>
									<td className='tabla-celda'>{cita.usuarioInfo.nombre}</td>
									<td className='tabla-celda'>{`${dia}/${mes}/${year}`}</td>
									<td className='tabla-celda'>{horaFormateada}</td>
									<td className='tabla-celda'>{cita.motivo}</td>
									<td className='tabla-celda capitalize'>
										<span className='pill-green'>{cita.estado}</span>
									</td>
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

export default CitasProgramadas;
