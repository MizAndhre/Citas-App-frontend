import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Notificaciones = () => {
	const [activeTab, setActiveTab] = useState(1);
	const { auth, marcarLeidos, eliminarNotificaciones } = useAuth();

	const navigate = useNavigate();

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
	};

	return (
		<>
			<div>
				<h1 className='titulo'>Notificaciones</h1>
				<nav className='flex '>
					<div
						className={`tab-texto-base ${
							activeTab === 1 ? " tab-texto-activo" : " tab-texto-desactivo"
						}`}
						onClick={() => handleTabClick(1)}>
						Pendientes
					</div>

					<div
						className={`tab-texto-base ${
							activeTab === 2 ? " tab-texto-activo" : " tab-texto-desactivo "
						}`}
						onClick={() => handleTabClick(2)}>
						Vistas
					</div>
				</nav>
				<div>
					{activeTab === 1 && (
						<div>
							<div className='div-titulo'>
								<p
									className='enlace my-0'
									onClick={() => {
										marcarLeidos();
									}}>
									Marcar Leídos
								</p>
							</div>

							{auth.unseenNotif.map((notificacion, i) => (
								<div
									key={i}
									className='card-notif '
									onClick={() => navigate(notificacion.onClickPath)}>
									<div>{notificacion.msg}</div>
								</div>
							))}
						</div>
					)}
					{activeTab === 2 && (
						<div>
							<div className='div-titulo'>
								<p
									className='enlace my-0'
									onClick={() => {
										eliminarNotificaciones();
									}}>
									Eliminar Todos
								</p>
							</div>

							{auth.seenNotif.map((notificacion, i) => (
								<div
									key={i}
									className='card-notif '
									onClick={() => navigate(notificacion.onClickPath)}>
									<div>{notificacion.msg}</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Notificaciones;
