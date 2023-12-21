import { BookingData } from "../types/meeting";

interface MapViewToggleProps {
    meetings: BookingData[];
}

export default function MapView2D({ meetings }: MapViewToggleProps) {
    // Function to determine the color of a circle based on meeting data
    const getCircleColor = (location: number) => {
        const meeting = meetings.find(meeting => meeting.location === location);
        if (meeting) {
            if (meeting.allDay) {
                return 'bg-red-500'; // Red for all-day booking
            } else {
                return 'bg-orange-500'; // Orange for part-day booking
            }
        }
        return 'bg-gray-700'; // Default dark color if empty
    };

    return (
        <>
            <div className="flex justify-center items-center pt-36">
                <div className="relative" style={{ width: '350px', height: '400px' }}>
                    {/* Top circle */}
                    <div className="absolute" style={{ top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 ${getCircleColor(1)} rounded-full text-2xl`}>1</div>
                    </div>
                    {/* Middle left circle */}
                    <div className="absolute" style={{ top: '30%', left: '15%', transform: 'translate(-50%, -50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 ${getCircleColor(2)} rounded-full text-2xl`}>2</div>
                    </div>
                    {/* Middle right circle */}
                    <div className="absolute" style={{ top: '30%', right: '15%', transform: 'translate(50%, -50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 ${getCircleColor(3)} rounded-full text-2xl`}>3</div>
                    </div>
                    {/* Bottom left circle */}
                    <div className="absolute" style={{ top: '40%', left: '15%', transform: 'translate(-50%, 50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 ${getCircleColor(4)} rounded-full text-2xl`}>4</div>
                    </div>
                    {/* Bottom right circle */}
                    <div className="absolute" style={{ top: '40%', right: '15%', transform: 'translate(50%, 50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 ${getCircleColor(5)} rounded-full text-2xl`}>5</div>
                    </div>
                    {/* Bottom circle */}
                    <div className="absolute" style={{ bottom: '0%', left: '50%', transform: 'translate(-50%, 50%)' }}>
                        <div className={`flex items-center justify-center w-32 h-32 border-2 border-gray-400 ${getCircleColor(6)} rounded-full text-2xl`}>6</div>
                    </div>
                </div>
            </div>
        </>
    );
}
