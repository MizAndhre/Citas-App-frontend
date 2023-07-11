import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { toast } from "react-hot-toast";
import useAlerta from "../../hooks/useAlerta";

const SolicitudCitas = () => {
	const [citas, setCitas] = useState([]);
	const { alertaError, alertaExito } = useAlerta();

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

			setCitas(data);
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

	useEffect(() => {
		obtenerCitas();
	}, []);

	const cambiarEstadoCita = async (_id, estado) => {
		console.log(_id, estado);

		try {
			//url y enviar datos al backend
			const url = "/doctores/cambiar-estado-citas";
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
			obtenerCitas();
		} catch (error) {
			toast.custom(alertaError(error.response.data.msg));
			console.log(error.response.data);
		}
	};

	// console.log(citas);

	return (
		<>
			<h1 className='titulo'>Citas Solicitadas</h1>

			<div className='overflow-x-auto'>
				<table className='tabla'>
					<thead className='tabla-head'>
						<tr>
							<th className='columna'>#</th>
							<th className='columna'>Paciente</th>
							<th className='columna'>Fecha</th>
							<th className='columna'>Hora</th>
							<th className='columna'>Estado</th>
							<th className='columna'>Motivo</th>
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
									<td className='tabla-celda capitalize '>
										<span className='pill-yellow'>{cita.estado}</span>
									</td>
									<td className='tabla-celda'>
										<span
											className='enlace-tabla btn-green'
											onClick={() => cambiarEstadoCita(cita._id, "aceptada")}>
											Aceptar
										</span>
										<span
											className='enlace-tabla btn-red'
											onClick={() => cambiarEstadoCita(cita._id, "rechazada")}>
											Rechazar{" "}
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

export default SolicitudCitas;
