import { useEffect } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../components/MessageInput";

const ChatPage = () => {
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
  const { messages, getMessages, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
  const { authUser } = useAuthStore();

  const { id } = useParams();

  // SAME message both sides
  const match = matches.find((m) => m?._id === id);

  useEffect(() => {
    if (authUser && id) {
      getMyMatches();
      getMessages(id);
      // work in real time 
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [getMyMatches, authUser, getMessages, subscribeToMessages, unsubscribeFromMessages, id]);

  if (isLoadingMyMatches) return <LoadingMessagesUI />;
  if (!match) return <MatchNotFound />;

  return (
    <div className='flex flex-col h-screen bg-gradient-to-br from-black to-gray-900 text-white'>
      <Header />
      <div className='flex-grow flex flex-col p-6 md:p-8 lg:p-10 overflow-hidden max-w-4xl mx-auto w-full'>
        <div className='flex items-center mb-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-4 border border-pink-500'>
          <img
            src={match.image || "/avatar.png"}
            className='w-14 h-14 object-cover rounded-full border-4 border-pink-500 shadow-lg mr-4'
          />
          <h2 className='text-2xl font-bold text-pink-400'>{match.name}</h2>
        </div>

        <div className='flex-grow overflow-y-auto mb-4 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-4 border border-pink-500'>
          {messages.length === 0 ? (
            <p className='text-center text-gray-300 py-8 italic'>Start your conversation with {match.name} ❤️</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`mb-3 flex ${msg.sender === authUser._id ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`p-3 rounded-xl max-w-xs lg:max-w-md shadow-lg transform transition-all duration-300 hover:scale-105 ${msg.sender === authUser._id
                    ? "bg-pink-500 text-white"
                    : "bg-gray-700 text-gray-100"
                    }`}
                >
                  {msg.content}
                </span>
              </div>
            ))
          )}
        </div>
        <MessageInput match={match} />
      </div>
    </div>
  );
};
export default ChatPage;

const MatchNotFound = () => (
  <div className='h-screen flex flex-col items-center justify-center bg-black text-white'>
    <div className='bg-white/10 p-8 rounded-xl shadow-lg border border-pink-500 text-center'>
      <UserX size={64} className='mx-auto text-pink-400 mb-4' />
      <h2 className='text-3xl font-bold mb-2'>Match Not Found</h2>
      <p className='text-gray-300'>Oops! This match doesn&apos;t exist or has been removed.</p>
      <Link
        to='/'
        className='mt-6 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform'
      >
        Go Back To Home
      </Link>
    </div>
  </div>
);

const LoadingMessagesUI = () => (
  <div className='h-screen flex flex-col items-center justify-center bg-black text-white'>
    <div className='bg-white/10 p-8 rounded-xl shadow-lg border border-pink-500 text-center'>
      <Loader size={48} className='mx-auto text-pink-400 animate-spin mb-4' />
      <h2 className='text-3xl font-bold mb-2'>Loading Chat...</h2>
      <p className='text-gray-300'>Fetching your conversation, please wait...</p>
      <div className='mt-6 flex justify-center space-x-2'>
        <div className='w-3 h-3 bg-pink-500 rounded-full animate-bounce' style={{ animationDelay: "0s" }}></div>
        <div className='w-3 h-3 bg-pink-500 rounded-full animate-bounce' style={{ animationDelay: "0.2s" }}></div>
        <div className='w-3 h-3 bg-pink-500 rounded-full animate-bounce' style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  </div>
);
