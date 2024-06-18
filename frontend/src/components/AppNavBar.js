import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserIcon from "../images/user.png";
import { useNavigate } from "react-router-dom";
import CashFlowIcon from "../images/cashflow.png"
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const AppNavBar = () => {
    let navigate = useNavigate();
   
    const { isLoggedIn, user, Logout } = useAuth();

    const handleLogout = () => {
        Logout();
        toast.success("Logout Successfully!");
        navigate("/");
    };

    return (
        <Navbar fluid style={{ backgroundColor: "#99cccc" }}>
            <Navbar.Brand>
                <img
                    src={CashFlowIcon}
                    className="mr-4 h-4 sm:h-20"
                    alt="CashFlow Logo"
                />
                <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">CashFlow</span>
            </Navbar.Brand>
            {isLoggedIn && (
                <div className="flex md:order-2">
                    <Dropdown arrowIcon={false} inline
                        label={<Avatar alt="User settings" img={UserIcon} rounded />}>
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name}</span>
                            <span className="block truncate text-sm font-medium">{user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Your Orders</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                    </Dropdown>
                    {/* <Navbar.Toggle /> */}
                </div>
            )}
            <Navbar.Collapse style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
                <div className="flex space-x-4 ml-auto">
                    <Navbar.Link href="/" className="text-lg">Home</Navbar.Link>
                    <Navbar.Link href="#" className="text-lg">About</Navbar.Link>
                    <Navbar.Link href="#" className="text-lg">Services</Navbar.Link>
                    {!isLoggedIn && (
                        <Navbar.Link href="/login" className="text-lg">Login</Navbar.Link>
                    )}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavBar;