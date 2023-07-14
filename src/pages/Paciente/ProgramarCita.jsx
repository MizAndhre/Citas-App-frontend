import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorSVG from "../../assets/Doctor_Outline.svg";
import Calendar from "../../assets/Calendar_Monochromatic.svg";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAlerta from "../../hooks/useAlerta";

const ProgramarCita = () => {
	const { auth } = useAuth();
	const params = useParams();
	const { alertaExito, alertaError } = useAlerta();
	const navigate = useNavigate();

	const [doctor, setDoctor] = useState([]);
	const [hora, setHora] = useState("");
	const [fecha, setFecha] = useState("");
	const [motivo, setMotivo] = useState("");
	const [disponible, setDisponible] = useState(false);

	// Setear hora
	const fechaHora = `${fecha} ${hora}`;
	const nuevaFechaHora = new Date(fechaHora);

	const token = localStorage.getItem("token");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const obtenerDoctorId = async () => {
		try {
			const url = `/usuarios/obtener-doctor-id/${params.id}`;
			const { data } = await clienteAxios.get(url, config);

			// const doctorObtenido = doctor[0];
			setDoctor(data[0]);
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

	const comprobarCita = async () => {
		// comprobar que los campos no estén vacíos
		if ([fecha, hora, motivo].includes("")) {
			toast.custom(alertaError("Todos los campos son obligatorios"));
			return;
		}

		if (hora < doctor.horaInicio || hora >= doctor.horaFinal) {
			toast.custom(alertaError("Hora elegida no disponible"));
			return;
		}

		const partesHora = hora.split(":");
		const minutos = partesHora[1];
		if (minutos !== "00" && minutos !== "30") {
			toast.custom(alertaError("Hora elegida no es correcta"));
			return;
		}

		try {
			const url = `/usuarios/comprobar-cita`;
			const { data } = await clienteAxios.post(
				url,
				{
					doctorId: doctor._id,
					fecha,
					hora: nuevaFechaHora,
				},
				config
			);

			// const doctorObtenido = doctor[0];
			toast.custom(alertaExito(data.msg));
			setDisponible(true);
		} catch (error) {
			toast.custom(alertaError(error.response.data.msg));
		}
	};

	const programarCita = async () => {
		// comprobar que los campos no estén vacíos
		if ([fecha, hora, motivo].includes("")) {
			toast.custom(alertaError("Todos los campos son obligatorios"));
			return;
		}

		console.log(fecha);

		try {
			const url = `/usuarios/programar-cita`;

			await clienteAxios.post(
				url,
				{
					usuarioId: auth._id,
					doctorId: doctor._id,
					usuarioInfo: auth,
					doctorInfo: doctor,
					fecha,
					hora: nuevaFechaHora,
					motivo,
					estado: "pendiente",
				},
				config
			);

			// const doctorObtenido = doctor[0];
			toast.custom(alertaExito("Cita Programada Correctamente"));
			// redirigir a ver citas
			navigate("/paciente/perfil/ver-citas");
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

	useEffect(() => {
		obtenerDoctorId();
	}, []);

	return (
		<>
			<div>
				<h1 className='titulo'>Programar Cita</h1>

				<div className='grid  lg:grid-cols-2 gap-4 mt-5 '>
					{/* Condicional por si no existe un doctor */}
					<div className='order-2 lg:order-1'>
						<h2 className='subtitulo'>{doctor.nombre}</h2>

						<form>
							<div>
								<p className='font-semibold text-gray-700 my-3'>
									Especialidad: <span className='font-normal'>{doctor.especialidad}</span>
								</p>
								<p className='font-semibold text-gray-700 my-3'>
									Disponibilidad:{" "}
									<span className='font-normal'>
										{doctor.horaInicio} - {doctor.horaFinal}
									</span>
								</p>
							</div>
							<div>
								<p className='font-thin text-sm'>
									Las citas deben ser eligidas con los minutos en 00 o 30. Ejemplo: 8:30 |
									13:00
								</p>
							</div>
							<div className='mt-5'>
								<label className='label-form-sub' htmlFor='fecha'>
									Fecha
								</label>

								<input
									id='fecha'
									type='date'
									placeholder='Escribe tus horas disponibles'
									className='input-form'
									value={fecha}
									onChange={(e) => setFecha(e.target.value)}
								/>
							</div>

							<div>
								<label className='label-form-sub' htmlFor='hora'>
									Hora
								</label>

								<input
									id='hora'
									type='time'
									className='input-form'
									value={hora}
									onChange={(e) => setHora(e.target.value)}
								/>
							</div>
							<div className='mb-5'>
								<label htmlFor='motivo' className='label-form-sub'>
									Motivo
								</label>
								<textarea
									id='motivo'
									placeholder='Describe los síntomas o motivo'
									className='input-form'
									value={motivo}
									onChange={(e) => setMotivo(e.target.value)}
								/>
							</div>
						</form>

						<input
							type='submit'
							value='Comprobar disponibilidad'
							className='btn'
							onClick={comprobarCita}
						/>
						{disponible && (
							<input
								type='submit'
								value='Programar Cita'
								className=' btn '
								onClick={programarCita}
							/>
						)}
					</div>

					<div className='flex justify-center items-center order-1 lg:order-2'>
						<img src={Calendar} alt='Ilustración doctor' />
					</div>
				</div>
			</div>
		</>
	);
};

export default ProgramarCita;
