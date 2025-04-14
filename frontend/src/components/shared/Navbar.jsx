import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const isActive = (path) => {
        return location.pathname === path ? "text-[#6A38C2] font-semibold" : "text-gray-600 hover:text-[#6A38C2] transition-colors";
    }

    const NavLinks = () => (
        <ul className='flex font-medium items-center gap-5'>
            {user && user.role === 'recruiter' ? (
                <>
                    <li><Link to="/admin/companies" className={isActive("/admin/companies")}>Companies</Link></li>
                    <li><Link to="/admin/jobs" className={isActive("/admin/jobs")}>Jobs</Link></li>
                </>
            ) : (
                <>
                    <li><Link to="/" className={isActive("/")}>Home</Link></li>
                    <li><Link to="/jobs" className={isActive("/jobs")}>Jobs</Link></li>
                    <li><Link to="/browse" className={isActive("/browse")}>Browse</Link></li>
                </>
            )}
        </ul>
    );

    return (
        <nav className='bg-white shadow-sm sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16'>
                <div className='flex items-center'>
                    <Link to="/" className='flex items-center'>
                        <h1 className='text-2xl font-bold'>Zob<span className='text-[#F83002]'>Search</span></h1>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-12'>
                    <NavLinks />
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <Button variant="outline" className="hover:bg-gray-50">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition-colors">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#6A38C2] transition-all">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4">
                                <div className='space-y-4'>
                                    <div className='flex gap-3 items-center'>
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-lg'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500'>{user?.email}</p>
                                            {user?.profile?.bio && (
                                                <p className='text-sm text-gray-600 mt-1'>{user?.profile?.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        {user && user.role === 'student' && (
                                            <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                                                <Link to="/profile">
                                                    <User2 className="h-4 w-4" />
                                                    View Profile
                                                </Link>
                                            </Button>
                                        )}
                                        <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logoutHandler}>
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className='md:hidden'>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className='md:hidden border-t'>
                    <div className='px-4 py-3 space-y-3'>
                        <NavLinks />
                        {!user ? (
                            <div className='flex flex-col gap-2 pt-4'>
                                <Link to="/login">
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='pt-4 space-y-2'>
                                <div className='flex items-center gap-3 pb-4 border-b'>
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className='font-semibold'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-500'>{user?.email}</p>
                                    </div>
                                </div>
                                {user && user.role === 'student' && (
                                    <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                                        <Link to="/profile">
                                            <User2 className="h-4 w-4" />
                                            View Profile
                                        </Link>
                                    </Button>
                                )}
                                <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logoutHandler}>
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar