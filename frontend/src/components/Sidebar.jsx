import { useEffect, useState } from "react";
import { Heart, Loader, MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

    useEffect(() => {
        getMyMatches();
    }, [getMyMatches]);

    return (
        <>
            <div
                className={`
				fixed inset-y-0 left-0 z-20 w-72 bg-white/30 backdrop-blur-lg shadow-2xl border-r border-pink-200 transition-transform duration-300 ease-in-out
				${isOpen ? "translate-x-0" : "-translate-x-full"}
				lg:translate-x-0 lg:static lg:w-1/4
			`}
            >
                <div className='flex flex-col h-full'>
                    <div className='p-5 border-b border-pink-300 flex justify-between items-center bg-white/40 backdrop-blur-md'>
                        <h2 className='text-2xl font-extrabold text-pink-600 tracking-tight'>Your Matches</h2>
                        <button
                            className='lg:hidden text-gray-500 hover:text-pink-500 transition'
                            onClick={toggleSidebar}
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className='flex-grow overflow-y-auto px-5 py-6 space-y-4'>
                        {isLoadingMyMatches ? (
                            <LoadingState />
                        ) : matches.length === 0 ? (
                            <NoMatchesFound />
                        ) : (
                            matches.map((match) => (
                                <Link key={match._id} to={`/chat/${match._id}`}>
                                    <div className='flex items-center gap-4 p-3 rounded-xl bg-white/70 backdrop-blur-md shadow-lg border border-pink-100 hover:shadow-pink-200 hover:bg-pink-50 transition-all duration-300 cursor-pointer'>
                                        <img
                                            src={match.image || "/avatar.png"}
                                            alt='User avatar'
                                            className='w-14 h-14 object-cover rounded-full border-4 border-pink-400 shadow-md'
                                        />
                                        <div>
                                            <h3 className='text-lg font-semibold text-gray-800'>{match.name}</h3>
                                            <p className='text-sm text-gray-500'>Tap to chat ❤️</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <button
                className='lg:hidden fixed top-4 left-4 p-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full z-50 shadow-lg transition-all'
                onClick={toggleSidebar}
            >
                <MessageCircle size={24} />
            </button>
        </>
    );
};
export default Sidebar;

const NoMatchesFound = () => (
    <div className='flex flex-col items-center justify-center h-full text-center px-4'>
        <Heart className='text-pink-400 mb-5 animate-bounce' size={50} />
        <h3 className='text-2xl font-bold text-gray-700 mb-2'>No Matches Yet</h3>
        <p className='text-gray-800 font-semibold text-md'>
            Don&apos;t worry, your perfect match is just around the corner. Keep exploring and stay positive!
        </p>
    </div>
);

const LoadingState = () => (
    <div className='flex flex-col items-center justify-center h-full text-center px-4'>
        <Loader className='text-pink-500 mb-5 animate-spin' size={50} />
        <h3 className='text-2xl font-bold text-gray-700 mb-2'>Loading Matches</h3>
        <p className='text-gray-500 text-sm'>Hang tight while we find your next great connection...</p>
    </div>
);
