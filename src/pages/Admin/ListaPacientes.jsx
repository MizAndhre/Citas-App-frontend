import { useState } from "react";
import clienteAxios from "../../config/axios";

import { useEffect } from "react";

const ListaPacientes = () => {
	const [pacientes, setPacientes] = useState([]);

	useEffect(() => {
		const obtenerPacientes = async () => {
			const token = localStorage.getItem("token");

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const { data } = await clienteAxios.get("/admins/obtener-pacientes", config);
				// console.log(data);
				setPacientes(data);
				// toast.custom(alertaExito(data.msg));
			} catch (error) {
				console.log(error.response.data.msg);
			}
		};

		obtenerPacientes();
	}, []);

	return (
		<>
			<h1 className='titulo'> Lista de Pacientes</h1>

			<div className='overflow-x-auto'>
				<table className='tabla'>
					<thead className='tabla-head'>
						<tr>
							<th className='columna'>#</th>
							<th className='columna'>Nombre</th>
							<th className='columna'>Género</th>
							<th className='columna'>Telefono</th>

							<th className='columna'>Email</th>
							<th className='columna'>Creado</th>
							<th className='columna'>Acción</th>
						</tr>
					</thead>

					<tbody className='tabla-body'>
						{pacientes.map((paciente, i) => {
							const fechaFormateada = new Date(paciente.createdAt).toLocaleDateString();

							return (
								<tr key={paciente._id}>
									<td className='tabla-celda'>{i + 1}</td>
									<td className='tabla-celda'>{paciente.nombre}</td>
									<td className='tabla-celda capitalize'>{paciente.genero}</td>
									<td className='tabla-celda'>{paciente.telefono}</td>
									<td className='tabla-celda'>{paciente.email}</td>
									<td className='tabla-celda'>{fechaFormateada}</td>
									<td className='tabla-celda enlace-tabla '>
										<span className='btn-red'>Bloquear</span>
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

export default ListaPacientes;
