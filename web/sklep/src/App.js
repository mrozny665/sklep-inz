import logo from "./logo.svg";
import "./App.css";
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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<AppLayout />}>
			<Route path="" element={<Login />} />
			<Route path="employee/">
				<Route path="" element={<EmployeeMenu />} />
				<Route path="sales">
					<Route path="" element={<EmployeeSale />} />
					<Route path="newsale" element={<NewSale />} />
				</Route>
				<Route path="products" element={<Products />} />
			</Route>
		</Route>
	)
);

function AppLayout() {
	return <Outlet />;
}

const App = () => <RouterProvider router={router} />;

export default App;
