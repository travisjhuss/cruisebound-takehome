import React from 'react';
import Image from 'next/image';

interface DrawerProps {
    open: boolean;
    filterDepartureBy: string;
    filterCruiselineBy: string;
    handleDepartureFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCruiselineFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    toggleDrawer: (open: boolean) => void;
}

const Drawer: React.FC<DrawerProps> = ({
    open, filterDepartureBy, filterCruiselineBy, handleDepartureFilterChange, handleCruiselineFilterChange, toggleDrawer
}) => {
    return (
        <div className="md:sticky md:top-0 md:h-screen md:w-64 bg-[#0F1829] pt-5 pb-2 md:pb-7 px-4 flex flex-col-reverse md:flex-col justify-between items-center">
            <div className="flex flex-col-reverse md:flex-col space-y-5">
                <div className="flex justify-end mt-2">
                    <button onClick={() => toggleDrawer(false)} className="bg-[#32394A] hover:bg-blue-700 rounded-sm p-1 rotate-90 md:rotate-0">
                        <Image src="/arrowleft.svg" alt="close" width={20} height={20} />
                    </button>
                </div>
                <div>
                    <label className="text-white text-md font-normal">Departure port</label>
                    <input
                        type="text"
                        placeholder="Any port"
                        value={filterDepartureBy}
                        onChange={(event) => handleDepartureFilterChange(event)}
                        className="w-full bg-white text-black p-1 rounded-sm mt-1"
                    />
                </div>
                <div>
                    <label className="text-white text-md font-normal">Cruiseline</label>
                    <input
                        type="text"
                        placeholder="Any ship"
                        value={filterCruiselineBy}
                        onChange={(event) => handleCruiselineFilterChange(event)}
                        className="w-full bg-white text-black p-1 rounded-sm mt-1"
                    />
                </div>
            </div>
            <Image 
                src="/cruisebound.png"
                alt="Cruise Logo"
                width={130}
                height={150} 
                className="rounded-l-xl"
            />
        </div>
    );
};

export default Drawer;