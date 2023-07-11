import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
//Proveedores
import { AlertaProvider } from "./context/AlertaProvider";
import { AuthProvider } from "./context/AuthProvider";

// Rutas Públicas
import AuthLayout from "./layout/AuthLayout";

import Inicio from "./pages/Inicio";

//Usuario/Paciente
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import RutaProtegida from "./layout/RutaProtegida";
import Perfil from "./pages/Paciente/Perfil";
import ProgramarCita from "./pages/Paciente/ProgramarCita";

// Doctor
import LoginDoctor from "./pages/Doctor/LoginDoctor";
import RutaProtegidaDr from "./layout/RutaProtegidaDr";
import PerfilDoctor from "./pages/Doctor/PerfilDoctor";
import RegistrarDoctor from "./pages/Doctor/RegistrarDoctor";
import EditarPerfilDoctor from "./pages/Doctor/EditarPerfilDoctor";

// Admin
import LoginAdmin from "./pages/Admin/LoginAdmin";
import RutaProtegidaAdmin from "./layout/RutaProtegidaAdmin";
import PerfilAdmin from "./pages/Admin/PerfilAdmin";
import Notificaciones from "./components/Notificaciones";
import ListaDoctores from "./pages/Admin/ListaDoctores";
import ListaPacientes from "./pages/Admin/ListaPacientes";
import VerCitas from "./pages/Paciente/VerCitas";
import SolicitudCitas from "./pages/Doctor/SolicitudCitas";
import CitasProgramadas from "./pages/Doctor/CitasProgramadas";
import HistorialDoctor from "./pages/Doctor/HistorialDoctor";
import HistorialPaciente from "./pages/Paciente/HistorialPaciente";
import EditarPerfilPaciente from "./pages/Paciente/EditarPerfilPaciente";
import HistorialAdmin from "./pages/Admin/HistorialAdmin";

// import OlvidePassword from "../not_used/OlvidePassword";

// Rutas Privadas

function App() {
	return (
		<>
			<BrowserRouter>
				<Toaster />
				<AlertaProvider>
					<AuthProvider>
						<Routes>
							{/* Ruta de Inicio */}
							{/* <Route path='/' element={<RutaProtegida />}>
								<Route index element={<Inicio />} />
							</Route> */}
							<Route path='/' element={<Inicio />} />

							{/* Rutas Públicas Paciente*/}
							<Route path='/usuario' element={<AuthLayout />}>
								<Route index element={<Login />} />
								<Route path='registrar' element={<Registrar />} />
							</Route>

							{/* Ruta Publica Doctores */}
							<Route path='/doctor' element={<AuthLayout />}>
								<Route index element={<LoginDoctor />} />
								<Route path='registrar' element={<RegistrarDoctor />} />
							</Route>

							{/* Ruta Publica Admin */}
							<Route path='/admin' element={<AuthLayout />}>
								<Route index element={<LoginAdmin />} />
								{/* <Route path='registrar' element={<RegistrarDoctor />} /> */}
							</Route>

							{/* Rutas Privadas Paciente*/}
							<Route path='/paciente/perfil/' element={<RutaProtegida />}>
								<Route index element={<Perfil />} />
								<Route path='notificacion' element={<Notificaciones />} />
								<Route path='editar' element={<EditarPerfilPaciente />} />
								<Route path='programar-cita/:id' element={<ProgramarCita />} />
								<Route path='ver-citas' element={<VerCitas />} />
								<Route path='historial-citas' element={<HistorialPaciente />} />
							</Route>

							{/* Rutas Privadas Paciente*/}
							<Route path='/doctor/perfil/' element={<RutaProtegidaDr />}>
								<Route index element={<PerfilDoctor />} />
								<Route path='notificacion' element={<Notificaciones />} />
								<Route path='editar' element={<EditarPerfilDoctor />} />
								<Route path='solicitud-citas' element={<SolicitudCitas />} />
								<Route path='citas-programadas' element={<CitasProgramadas />} />
								<Route path='historial-citas' element={<HistorialDoctor />} />
							</Route>

							{/* Rutas Privadas Paciente*/}
							<Route path='/admin/perfil/' element={<RutaProtegidaAdmin />}>
								<Route index element={<PerfilAdmin />} />
								<Route path='notificacion' element={<Notificaciones />} />
								<Route path='lista-doctores' element={<ListaDoctores />} />
								<Route path='lista-pacientes' element={<ListaPacientes />} />
								<Route path='historial-citas' element={<HistorialAdmin />} />
							</Route>

							<Route path='*' element={<Navigate to='/' />} />
						</Routes>
					</AuthProvider>
				</AlertaProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
