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
    const { departureDate, returnDate, name, region, duration, ship } = cruiseData;
    const formattedDateRange = formatDateRange(departureDate, returnDate);

    return (
        <div className="flex flex-col max-w-4xl shadow-[5px_5px_10px_0_rgba(0,0,0,0.1)] rounded-xl w-full md:flex-row">
            <div className="static">
                <div className="flex absolute text-white bg-black/75 mt-3 ml-3 px-2 py-1 rounded">
                    <span className="text-sm font-medium">
                        {formattedDateRange}
                    </span>
                </div>
                <Image
                    src="https://res.cloudinary.com/cruisebound/image/upload/f_auto/v1656397931/production/small_msc_vi_item_76c6c4b53c.png"
                    alt="Cruise Ship"
                    width={300}
                    height={350} 
                    className="rounded-l-xl"
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
                                <Image src="/star.svg" alt="Star" width={16} height={16} />
                                <p className="text-sm">{ship.rating}</p>
                                <p className="text-xs text-gray-400">{ship.reviews} reviews</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <p className="text-sm font-medium">Departure</p>
                            <Image src="/arrowright.svg" alt="Star" width={16} height={16} />
                        </div>
                    </div>
                    <div>
                        <Image 
                            src="https://res.cloudinary.com/cruisebound/image/upload/f_auto/v1649242239/production/line_logo_6_4bbd4246_eded_4690_bd5e_b184f4a64e82_0f9ac3171a.jpg"
                            alt="Cruise Logo"
                            width={100}
                            height={100} 
                            className="rounded-l-xl"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-end py-3 px-5 space-x-4 basis-1/3 bg-gray-50">
                    <div className="flex flex-col items-end">
                        <p className="text-xs font-medium text-gray-400">Interior from</p>
                        <p className="text-lg font-medium">$1000</p>
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