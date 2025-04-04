import { useMatchStore } from "../store/useMatchStore";
import { useState, useEffect } from "react";

const getFeedbackStyle = (swipeFeedback) => {
    if (swipeFeedback === "liked") return "text-green-400 shadow-green-400";
    if (swipeFeedback === "passed") return "text-red-400 shadow-red-400";
    if (swipeFeedback === "matched") return "text-pink-400 shadow-pink-400";
    return "";
};

const getFeedbackText = (swipeFeedback) => {
    if (swipeFeedback === "liked") return "👍 Liked!";
    if (swipeFeedback === "passed") return "👎 Passed";
    if (swipeFeedback === "matched") return "💖 It's a Match!";
    return "";
};

const SwipeFeedback = () => {
    const { swipeFeedback } = useMatchStore();
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        if (swipeFeedback) {
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 1000); // Hide after 1 sec
        }
    }, [swipeFeedback]);

    return (
        <div
            className={`
                absolute top-16 left-1/2 transform -translate-x-1/2 text-center text-4xl font-bold 
                neon-text transition-all duration-500 ease-in-out
                ${getFeedbackStyle(swipeFeedback)} 
                ${showFeedback ? "opacity-100 scale-125 fadeInUp" : "opacity-0 scale-90 fadeOutDown"}
            `}
        >
            {getFeedbackText(swipeFeedback)}
        </div>
    );
};

export default SwipeFeedback;
