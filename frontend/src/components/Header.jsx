import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, LogOut, Menu, XCircle, Heart } from "lucide-react";

export const Header = () => {
    const { authUser, logout } = useAuthStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className='bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center py-4'>
                    <div className='flex items-center'>
                        <Link to='/' className='flex items-center space-x-2'>
                            <Heart className='w-8 h-8 text-white' fill="red" />
                            <span className='text-2xl font-bold text-white hidden sm:inline'>SmashMeMaybe</span>
                        </Link>
                    </div>

                    <div className='hidden md:flex items-center space-x-4'>
                        {authUser ? (
                            <div className='relative' ref={dropdownRef}>
                                <button onClick={() => setDropdownOpen(!dropdownOpen)} className='flex items-center space-x-2 focus:outline-none'>
                                    {authUser.image ? (
                                        <img src={authUser.image} className='h-10 w-10 cursor-pointer object-cover rounded-full border-2 border-white' alt='User image' />
                                    ) : (
                                        <User className='w-10 h-10 text-white bg-gray-700 p-2 rounded-full' />
                                    )}
                                    <span className='text-white font-bold cursor-pointer'>{authUser.name}  </span>
                                </button>
                                {dropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
                                        <Link to='/profile' className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center' onClick={() => setDropdownOpen(false)}>
                                            <User className='mr-2' size={16} /> Profile
                                        </Link>
                                        <button onClick={() => setShowLogoutModal(true)} className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'>
                                            <LogOut className='mr-2' size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to='/auth' className='text-white hover:text-pink-200 transition duration-150 ease-in-out'>Login</Link>
                                <Link to='/auth' className='bg-white text-pink-600 px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out'>Sign Up</Link>
                            </>
                        )}
                    </div>

                    <div className='md:hidden'>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='text-white focus:outline-none'>
                            <Menu className='size-6' />
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className='md:hidden bg-pink-600'>
                    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                        {authUser ? (
                            <>
                                <Link to='/profile' className='block px-3 py-2 rounded-md text-base font-medium text-white cursor-pointer hover:bg-pink-700' onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                                <button onClick={() => setShowLogoutModal(true)} className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white  cursor-pointer hover:bg-pink-700'>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to='/auth' className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700' onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                <Link to='/auth' className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700' onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {showLogoutModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center'>
                        <XCircle className='text-red-500 mx-auto mb-3' size={48} />
                        <h3 className='text-lg text-black font-semibold'>Are you sure you want to logout?</h3>
                        <div className='mt-4 flex justify-center space-x-4'>
                            <button onClick={() => setShowLogoutModal(false)} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 cursor-pointer'>Cancel</button>
                            <button onClick={() => { logout(); setShowLogoutModal(false); }} className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600'>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
