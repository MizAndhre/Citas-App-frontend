import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
	const { auth, cerrarSesion } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const obtenerIcono = () => {
		if (auth.role === "usuario") {
			return "fa-solid fa-user ";
		} else if (auth.role === "doctor") {
			return "fa-solid fa-user-doctor";
		} else if (auth.role === "admin") {
			return "fa-solid fa-user-tie";
		} else {
			return "";
		}
	};

	const redirigirNotif = () => {
		if (auth.role === "usuario") {
			return "/paciente/perfil/notificacion";
		} else if (auth.role === "doctor") {
			return "/doctor/perfil/notificacion";
		} else if (auth.role === "admin") {
			return "/admin/perfil/notificacion";
		} else {
			return "";
		}
	};

	const notificacion = auth.unseenNotif.length;
	const iconoObtenido = obtenerIcono();

	const handleClick = () => {
		navigate(redirigirNotif());
	};

	return (
		<>
			<header className='border-2 border-teal-800 h-[10vh] rounded-md my-5 mx-8 p-5 bg-slate-50 flex justify-between items-center'>
				<div
					className={`relative cursor-pointer
					
				
				`}
					onClick={handleClick}>
					{notificacion > 0 && (
						<div className='absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-3/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-600 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white'>
							{notificacion}
						</div>
					)}

					<i
						className={`fa-regular fa-bell text-3xl text-gray-700 cursor-pointer
					${location.pathname.includes("notificacion") && "bg-teal-800 text-white px-3 py-2 rounded-3xl"}
					
					`}></i>
				</div>

				<div className='flex'>
					<i className={`${iconoObtenido}  text-3xl text-teal-700`}></i>
					<h2 className='text-3xl font-semibold mx-2 text-gray-700'> {auth.nombre}</h2>
				</div>

				<div className='group relative'>
					<p
						className='absolute right-10 bottom-0 z-10 inline-block px-3 py-2 text-sm font-semibold whitespace-pre
					text-white bg-teal-700 transition-opacity duration-300 shadow-sm rounded-lg text-center opacity-0 group-hover:opacity-100 group-hover:w-fit
					'>
						Cerrar Sesión
					</p>

					<i
						className='fa-solid fa-right-from-bracket text-teal-700 text-3xl cursor-pointer'
						onClick={cerrarSesion}></i>
				</div>
			</header>
		</>
	);
};

export default Header;
