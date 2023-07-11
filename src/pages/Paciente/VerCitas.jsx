import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import useAlerta from "../../hooks/useAlerta";
import { toast } from "react-hot-toast";

const VerCitas = () => {
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
			const { data } = await clienteAxios.get("/usuarios/obtener-citas", config);
			console.log(data);
			setCitas(data);
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};
	useEffect(() => {
		obtenerCitas();
	}, []);

	const eliminarCita = async (_id) => {
		console.log(_id);

		try {
			//url y enviar datos al backend
			const url = "/usuarios/eliminar-cita";
			const { data } = await clienteAxios.post(
				url,
				{
					_id,
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

	const cancelarCitaAprobada = async (_id, estado) => {
		try {
			//url y enviar datos al backend
			const url = "/usuarios/cancelar-cita-aprobada";
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

	return (
		<>
			<h1 className='titulo'>Ver Citas</h1>

			<div className='overflow-x-auto'>
				<table className='tabla'>
					<thead className='tabla-head'>
						<tr>
							<th className='columna'>#</th>
							<th className='columna'>Doctor</th>
							<th className='columna'>Fecha</th>
							<th className='columna'>Hora</th>
							<th className='columna'>Estado</th>
							<th className='columna'>Acción</th>
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
									<td className='tabla-celda'>{cita.doctorInfo.nombre}</td>
									<td className='tabla-celda'>{fechaFormateada}</td>
									<td className='tabla-celda'>{horaFormateada}</td>
									<td
										className={`'tabla-celda'
									`}>
										<span
											className={` capitalize
									${
										cita.estado === "aceptada"
											? "pill-green"
											: cita.estado === "pendiente"
											? "pill-yellow"
											: "pill-red"
									}
									`}>
											{cita.estado}
										</span>
									</td>
									<td className='tabla-celda'>
										{cita.estado === "aceptada" && (
											<span
												className='enlace-tabla btn-red'
												onClick={() => cancelarCitaAprobada(cita._id, "cancelada")}>
												Cancelar
											</span>
										)}

										{cita.estado === "rechazada" && (
											<span
												className='enlace-tabla btn-gray'
												onClick={() => eliminarCita(cita._id)}>
												Eliminar
											</span>
										)}

										{cita.estado === "pendiente" && (
											<span
												className='enlace-tabla btn-gray'
												onClick={() => eliminarCita(cita._id)}>
												Eliminar
											</span>
										)}
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

export default VerCitas;
