import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserIcon from "../images/user.png";
import { useNavigate } from "react-router-dom";
import CashFlowIcon from "../images/cashflow.png"
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { usePro } from "../contexts/ProfileContext";

const AppNavBar = () => {
    let navigate = useNavigate();

    const { isLoggedIn, user, Logout } = useAuth();
    const { profile } = usePro();

    const handleLogout = () => {
        Logout();
        toast.success("Logout Successfully!");
        navigate("/");
    };

    return (
        <Navbar fluid className="bg-[#99cccc] dark:bg-[#333333] dark:border-gray-600" rounded>
            <Navbar.Brand>
                <img
                    src={CashFlowIcon}
                    className="mr-4 h-8 sm:h-20"
                    alt="CashFlow Logo"
                />
                <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">CashFlow</span>
            </Navbar.Brand>
            <div className="flex md:order-2 ml-5">
                {isLoggedIn && (
                    <>
                        <Dropdown arrowIcon={false} inline
                            label={<Avatar alt="User settings" img={profile?.profile_picture} rounded size="lg" />}
                            backgroundColor=""
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{profile?.name}</span>
                                <span className="block truncate text-sm font-medium">{profile?.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item href="/setting">Settings</Dropdown.Item>
                            {/* <Dropdown.Item>Your Orders</Dropdown.Item> */}
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                        </Dropdown>
                        {/* <Navbar.Toggle /> */}
                    </>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="ml-auto">
                {/* style={{ display: 'block', visibility: 'visible', opacity: 1 }}> */}
                {/* <div className="flex space-x-4 ml-auto"> */}
                <>
                    {!isLoggedIn && (
                        <Navbar.Link href="/" className="text-lg">Home</Navbar.Link>
                    )}
                    <Navbar.Link href="/about" className="text-lg">About</Navbar.Link>
                    {isLoggedIn && (
                        <Navbar.Link href="/dashboard" className="text-lg">Dashboard</Navbar.Link>
                    )}
                    {isLoggedIn && (
                        <Navbar.Link href="/wallet" className="text-lg">Wallet</Navbar.Link>
                    )}
                    {isLoggedIn && (
                        <Navbar.Link href="/transactions" className="text-lg">Transactions</Navbar.Link>
                    )}
                    {isLoggedIn && (
                        <Navbar.Link href="/watchlist" className="text-lg">Watchlist</Navbar.Link>
                    )}
                    {isLoggedIn && (
                        <Navbar.Link href="/resources" className="text-lg">Resources</Navbar.Link>
                    )}
                    {!isLoggedIn && (
                        <Navbar.Link href="/login" className="text-lg">Login</Navbar.Link>
                    )}
                    {/* </div> */}
                </>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavBar;