import { useEffect, useRef, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ match }) => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef(null);

    const { sendMessage } = useMessageStore();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(match._id, message);
            setMessage("");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target)
            ) {
                // close when clicked outside
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <form
            onSubmit={handleSendMessage}
            className="relative flex items-center rounded-2xl shadow-lg bg-white/10 backdrop-blur-xl p-2 border border-white/20"
        >
            <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-white cursor-pointer hover:text-pink-400 transition-all px-3"
            >
                <Smile size={24} />
            </button>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow bg-transparent placeholder-white/60 text-white px-3 py-2 focus:outline-none"
                placeholder="Send a sweet message..."
            />

            <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-xl transition-all shadow-md"
            >
                <Send size={20} />
            </button>

            {showEmojiPicker && (
                <div
                    ref={emojiPickerRef}
                    className="absolute bottom-16 left-4 z-50 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden"
                >
                    <EmojiPicker
                        theme="dark"
                        onEmojiClick={(emojiObject) =>
                            setMessage((prev) => prev + emojiObject.emoji)
                        }
                    />
                </div>
            )}
        </form>
    );
};

export default MessageInput;
