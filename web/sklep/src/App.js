import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/login";
import EmployeeMenu from "./Pages/employeeMenu";
import ManagerHub from "./Pages/managerHub";
import ManagerMenu from "./Pages/managerMenu";
import EmployeeSale from "./Pages/employeeSale";
import NewSale from "./Pages/newSale";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
	RouterProvider,
	Route,
} from "react-router-dom";
import Products from "./Pages/products";
import Supplies from "./Pages/supplies";
import Employees from "./Pages/employees";
import { useState } from "react";

function AppLayout() {
	return <Outlet />;
}

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isManager, setIsManager] = useState(false);
	const [id, setId] = useState();

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<AppLayout />}>
				<Route
					path=""
					element={
						<Login
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							isManager={isManager}
							setIsManager={setIsManager}
							id={id}
							setId={setId}
						/>
					}
				/>
				<Route path="employee/">
					<Route
						path=""
						element={
							<EmployeeMenu
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
								isManager={isManager}
							/>
						}
					/>
					<Route path="sales">
						<Route path="" element={<EmployeeSale id={id} />} />
						<Route path="newsale" element={<NewSale id={id} />} />
					</Route>
					<Route path="products" element={<Products />} />
					<Route path="supplies" element={<Supplies id={id} />} />
				</Route>
				<Route
					path="hub"
					element={
						<ManagerHub
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							isManager={isManager}
						/>
					}
				/>
				<Route path="manager/">
					<Route path="" element={<ManagerMenu />} />
					<Route path="employees" element={<Employees />} />
				</Route>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
