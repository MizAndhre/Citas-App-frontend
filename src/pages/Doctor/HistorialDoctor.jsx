import clienteAxios from "../../config/axios";
import { useEffect, useState } from "react";

const HistorialDoctor = () => {
	const [citas, setCitas] = useState([]);

	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const obtenerCitasAprobadas = async () => {
		try {
			const url = "/doctores/obtener-citas-terminadas";
			const { data } = await clienteAxios.get(url, config);

			setCitas(data);
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

	useEffect(() => {
		obtenerCitasAprobadas();
	}, []);

	return (
		<>
			<h1 className='titulo'>Historial de Citas</h1>

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
						</tr>
					</thead>

					<tbody className='tabla-body'>
						{citas.map((cita, i) => {
							const fechaFormateada = new Date(cita.fecha).toLocaleDateString();
							const horaFormateada = new Date(cita.hora).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							});

							return (
								<tr key={cita._id}>
									<td className='tabla-celda'>{i + 1}</td>
									<td className='tabla-celda'>{cita.usuarioInfo.nombre}</td>
									<td className='tabla-celda'>{fechaFormateada}</td>
									<td className='tabla-celda'>{horaFormateada}</td>
									<td className='tabla-celda'>{cita.motivo}</td>
									<td className='tabla-celda capitalize'>
										<span
											className={`
									${
										cita.estado === "completada"
											? "pill-green"
											: cita.estado === "falto"
											? "pill-yellow"
											: "pill-red"
									}
									`}>
											{cita.estado}
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

export default HistorialDoctor;
