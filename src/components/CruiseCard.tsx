import React, { FC } from 'react';
import Image from "next/image";
import { formatDateRange } from '@/utils/dateRangeFormatter';

type CruiseData = {
    departureDate: string;
    duration: number;
    itinerary: [string];
    name: string;
    region: string;
    returnDate: string;
    price: number;
    ship: {
        line: {
            name: string;
            logo: string;
        },
        image: string;
        rating: number;
        reviews: number;
        name: string;
    }
}

interface CruiseCardProps {
    cruiseData: CruiseData;
}

const CruiseCard: FC<CruiseCardProps> = ({cruiseData}) => {
    const { departureDate, returnDate, name, region, duration, ship, price, itinerary } = cruiseData;
    const formattedDateRange = formatDateRange(departureDate, returnDate);
    const placeholderImage = "https://res.cloudinary.com/cruisebound/image/upload/f_auto/v1656397931/production/small_msc_vi_item_76c6c4b53c.png";

    return (
        <div className="flex flex-col max-w-4xl shadow-[5px_5px_10px_0_rgba(0,0,0,0.1)] rounded-xl w-full md:flex-row">
            <div className="static w-full md:max-h-full md:max-w-[250px]">
                <div className="flex absolute text-white bg-black/75 mt-3 ml-3 px-2 py-1 rounded">
                    <span className="text-sm font-medium">
                        {formattedDateRange}
                    </span>
                </div>
                <Image
                    src={ship.image ? ship.image : placeholderImage}
                    alt="Cruise Ship"
                    width={500}
                    height={550}
                    className="w-full h-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none object-cover"
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between px-4 basis-2/3">
                    <div className="py-3">
                        <h2 className="text-xl font-semibold pb-1">{name}</h2>
                        <div className="flex flex-row space-x-4 pb-3">
                            <p className="text-sm font-medium text-gray-500">{region}</p>
                            <p className="text-sm font-medium text-gray-500">{duration} nights</p>
                            <div className="flex flex-row items-center">
                                <Image src="/star.svg" alt="Star" width={18} height={18} className="flex self-start" />
                                <p className="text-sm pr-[4px]">{ship.rating}</p>
                                <p className="text-xs text-gray-400">{ship.reviews} reviews</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-wrap space-x-1">
                            {itinerary.map((port, i) => {
                                const city = port.split(',')[0];
                                return (
                                <div key={i} className="flex flex-row items-center space-x-1">
                                    <p className="text-sm font-medium">{city}</p>
                                    {i < itinerary.length - 1 &&
                                        <Image src="/arrowright.svg" alt="right-arrow" width={12} height={12} />
                                    }
                                </div>
                            )})}
                        </div>
                    </div>
                    <div className="flex flex-col items-end mt-4 mb-4 min-w-[100px] space-y-1">
                        {ship.line.logo && 
                            <Image 
                                src={ship.line.logo}
                                alt="Cruise Logo"
                                width={100}
                                height={100} 
                                className="rounded-l-xl"
                            />
                        }
                        <span className="text-xs align-right text-nowrap font-medium text-gray-500">{ship.name}</span>
                    </div>
                </div>
                <div className="flex flex-row justify-end py-3 px-5 space-x-4 basis-1/3 bg-gray-50">
                    <div className="flex flex-col items-end">
                        <p className="text-xs font-medium text-gray-400">Interior from</p>
                        <p className="text-lg font-medium">${price.toLocaleString()}</p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 h-[44px] rounded">
                        See sailings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CruiseCard;