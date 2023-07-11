import { Link } from "react-router-dom";

const OlvidePassword = () => {
	return (
		<>
			<div>
				<h1 className='titulo-auth'>
					Recupera el acceso y no Pierdas <span>tu Cuenta</span>
				</h1>
			</div>

			<div className='div-formulario'>
				{/* Lugar de la Alera => Exito o Error */}

				<form>
					<div className='my-5'>
						<label className='label-form' htmlFor='email'>
							Correo Electrónico
						</label>
						<input
							id='email'
							type='email'
							placeholder='Escribe tu correo'
							className='input-form'
							// value={email}
							// onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<input type='submit' value='Enviar Instrucciones' className='btn' />
				</form>

				<nav className='nav-enlace'>
					<Link to='/registrar' className='enlace'>
						¿No tienes cuenta? Regístrate
					</Link>
					<Link to='/' className='enlace'>
						¿Ya tienes cuenta? Inicia Sesión
					</Link>
				</nav>
			</div>
		</>
	);
};

export default OlvidePassword;
