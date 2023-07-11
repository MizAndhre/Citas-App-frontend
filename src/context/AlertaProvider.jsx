/* eslint-disable react/prop-types */
import { createContext } from "react";

const AlertaContext = createContext();

export const AlertaProvider = ({ children }) => {
	const alertaError = (mensaje) => {
		return (
			<>
				<div
					className='from-red-400 to-red-600
		bg-gradient-to-r py-3 px-28 rounded-lg text-center text-white uppercase font-bold text-sm'>
					{mensaje}
				</div>
			</>
		);
	};

	const alertaExito = (mensaje) => {
		return (
			<>
				<div
					className='from-emerald-400 to-teal-500
		bg-gradient-to-r py-3 px-28 rounded-lg text-center text-white uppercase font-bold text-sm'>
					{mensaje}
				</div>
			</>
		);
	};

	return (
		<AlertaContext.Provider
			value={{
				alertaError,
				alertaExito,
			}}>
			{children}
		</AlertaContext.Provider>
	);
};

export default AlertaContext;
