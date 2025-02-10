import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SortByProps {
    value: string;
    handleChange: (event: SelectChangeEvent) => void;
}

const SortBy: React.FC<SortByProps> = ({value, handleChange}) => {

    return (
        <div className="flex flex-row justify-end space-x-1">
            <label id="sort" className="text-md font-medium">Sort by</label>
            <div>
                <Select
                    labelId="sort"
                    id="sort"
                    value={value}
                    onChange={handleChange}
                    autoWidth
                    sx={{ 
                        '& .MuiSelect-select': {
                            padding: '6px',
                            paddingLeft: 1,
                        },
                    }}
                    className="shadow-[2px_2px_5px_0_rgba(0,0,0,0.1)]"
                >
                    <MenuItem value={'price-asc'}>
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-medium leading-none">Price</p>
                            <p className="text-xs text-gray-500 leading-none">Lowest first</p>
                        </div>
                    </MenuItem>
                    <MenuItem value={'price-desc'}>
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-medium">Price</p>
                            <p className="text-xs text-gray-500">Highest first</p>
                        </div>
                    </MenuItem>
                    <MenuItem value={'date-asc'}>
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-medium">Departure date</p>
                            <p className="text-xs text-gray-500">Earliest</p>
                        </div>
                    </MenuItem>
                    <MenuItem value={'date-desc'}>
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-medium">Departure date</p>
                            <p className="text-xs text-gray-500">Latest</p>
                        </div>
                    </MenuItem>
                    <MenuItem value={'duration-asc'}>
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-xs text-gray-500">Shortest</p>
                        </div>
                    </MenuItem>
                    <MenuItem value={'duration-desc'}>
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-xs text-gray-500">Longest</p>
                        </div>
                    </MenuItem>
                </Select>
            </div>
        </div>
    );
};

export default SortBy;