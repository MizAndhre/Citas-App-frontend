import { Link } from "react-router-dom";

const Inicio = () => {

	


	return (
		<>
			<div className='bg-black bg-opacity-60 w-screen min-h-screen flex relative'>
				<div className='absolute inset-0 -z-10 bg-[url(https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80)] bg-cover bg-center bg-opacity-60'></div>

				<main className='contenedor-cards'>
					<div className='card'>
						<div className='circulo-icono'>
							<i className='fa-solid fa-user icono'></i>
						</div>

						<h2 className='card-titulo'>Paciente</h2>
						<Link to='/usuario/' className='card-btn'>
							Iniciar Sesión
						</Link>
						<Link to='/usuario/registrar' className='card-btn'>
							Registrar
						</Link>
					</div>

					<div className='card'>
						<div className='circulo-icono'>
							<i className='fa-solid fa-user-doctor icono'></i>
						</div>

						<h2 className='card-titulo'>Doctor</h2>
						<Link to='/doctor/' className='card-btn'>
							Iniciar Sesión
						</Link>
						<Link to='/doctor/registrar' className='card-btn'>
							Registrar
						</Link>
					</div>

					<div className='card md:col-span-2 md:mx-56 lg:col-auto lg:mx-10'>
						<div className='circulo-icono'>
							<i className='fa-solid fa-user-tie icono '></i>
						</div>

						<h2 className='card-titulo'>Admin</h2>
						<Link to='/admin/' className='card-btn'>
							Iniciar Sesión
						</Link>
						<Link to='/usuario/registrar' className='card-btn invisible'>
							Registrar
						</Link>
					</div>
				</main>
			</div>
		</>
	);
};

export default Inicio;
