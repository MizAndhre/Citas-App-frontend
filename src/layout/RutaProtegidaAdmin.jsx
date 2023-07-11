/* eslint-disable react/prop-types */

import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegidaAdmin = () => {
	const { auth, cargando } = useAuth();

	console.log(auth);

	//Poner un spínner aquí
	if (cargando) return "cargando...";

	return (
		<>
			{auth?._id && auth.role === "admin" ? (
				<div className='flex h-screen'>
					<Sidebar />

					<div className='main-container'>
						<Header />

						<main className='main'>
							<Outlet />
						</main>
					</div>
				</div>
			) : (
				<Navigate to='/' />
			)}
		</>
	);
};

export default RutaProtegidaAdmin;
