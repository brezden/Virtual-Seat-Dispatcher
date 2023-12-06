import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
const meetings = [
  {
    id: 2,
    date: "December 6th, 2023",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Callum Brezden",
    location: "Desk 1",
    imageUrl:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Fr9zz5ruhpanxeq2p.public.blob.vercel-storage.com%2Fcallum.brezden%40verosoftdesign.com-profile-picture-HBLbGWsgkNkBnmRssbKGtWYmTVo8IW.jpeg&w=640&q=75",
  },
  {
    id: 1,
    date: "December 6th, 2023",
    time: "1:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Montek Kundan",
    location: "Desk 3",
    imageUrl:
      "https://r9zz5ruhpanxeq2p.public.blob.vercel-storage.com/montek.kundan@verosoftdesign.com-profile-picture-2rKHycJ6H1JZrwoFvGmFmMUizezxTN.jpeg",
  },
  {
    id: 3,
    date: "December 6th, 2023",
    time: "9:00 AM",
    datetime: "2022-01-10T17:00",
    name: "Alexandre Parent",
    location: "Desk 2",
    imageUrl:
      "https://r9zz5ruhpanxeq2p.public.blob.vercel-storage.com/alexandre.parent@verosoftdesign.com-profile-picture-FQQ9Igo2oXyFOkGRUSGO8twhd5WmwZ.jpeg",
  },
];

export default function BookedMembers() {
  return (
    <div>
      <h2 className="text-white-900 text-lg font-medium leading-6">
        Booked Members
      </h2>
      <ol className="divide-ytext-sm mt-4 leading-6 lg:col-span-7 xl:col-span-8">
        {meetings.map((meeting) => (
          <li
            key={meeting.id}
            className="relative flex space-x-6 py-6 xl:static"
          >
            <img
              src={meeting.imageUrl}
              alt=""
              className="h-14 w-14 flex-none rounded-full"
            />
            <div className="flex-auto">
              <h3 className="text-white-600 pr-10 font-semibold xl:pr-0">
                {meeting.name}
              </h3>
              <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                <div className="flex items-start space-x-3">
                  <dt className="mt-0.5">
                    <span className="sr-only">Date</span>
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <time dateTime={meeting.datetime}>
                      {meeting.date} at {meeting.time}
                    </time>
                  </dd>
                </div>
                <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                  <dt className="mt-0.5">
                    <span className="sr-only">Location</span>
                    <MapPinIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>{meeting.location}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
