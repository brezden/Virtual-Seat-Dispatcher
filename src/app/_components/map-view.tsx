import { BookingData } from "../types/meeting";

interface MapViewToggleProps {
    meetings: BookingData[];
}

export default function MapView2D({ meetings }: MapViewToggleProps) {
    // Function to determine the background style or color of a circle based on meeting data
    const getCircleStyle = (location: number) => {
        const meeting = meetings.find(meeting => meeting.location === location);
        if (meeting) {
            if (meeting.allDay) {
                // Use the image as a background for all-day bookings
                return { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${meeting.imageUrl})`, backgroundSize: 'cover' };
            } else {
                // Use RGBA for orange background with opacity
                return { backgroundColor: 'rgba(255, 167, 3, 0.5)' }; // 50% opacity
            }
        }
        // Default dark background with opacity
        return { backgroundColor: 'rgba(128, 128, 128, 0.5)' }; // 50% opacity
    };

    return (
        <>
            <div className="flex justify-center items-center pt-36">
                <div className="relative" style={{ width: '350px', height: '400px' }}>
                    {/* Top circle */}
                    <div className="absolute" style={{ top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 rounded-full text-2xl`} style={getCircleStyle(1)}>1</div>
                    </div>
                    {/* Middle left circle */}
                    <div className="absolute" style={{ top: '30%', left: '15%', transform: 'translate(-50%, -50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 rounded-full text-2xl`} style={getCircleStyle(2)}>2</div>
                    </div>
                    {/* Middle right circle */}
                    <div className="absolute" style={{ top: '30%', right: '15%', transform: 'translate(50%, -50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 rounded-full text-2xl`} style={getCircleStyle(3)}>3</div>
                    </div>
                    {/* Bottom left circle */}
                    <div className="absolute" style={{ top: '40%', left: '15%', transform: 'translate(-50%, 50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 rounded-full text-2xl`} style={getCircleStyle(4)}>4</div>
                    </div>
                    {/* Bottom right circle */}
                    <div className="absolute" style={{ top: '40%', right: '15%', transform: 'translate(50%, 50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 rounded-full text-2xl`} style={getCircleStyle(5)}>5</div>
                    </div>
                    {/* Bottom circle */}
                    <div className="absolute" style={{ bottom: '0%', left: '50%', transform: 'translate(-50%, 50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 rounded-full text-2xl`} style={getCircleStyle(6)}>6</div>
                    </div>
                </div>
            </div>
        </>
    );
}
