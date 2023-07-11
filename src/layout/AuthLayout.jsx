import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<>
			<div className=' bg-gray-300 w-screen min-h-screen flex'>
				<main className='container mx-auto lg:grid lg:grid-cols-2 px-6 gap-24 items-center my-12 md:my-10'>
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default AuthLayout;
