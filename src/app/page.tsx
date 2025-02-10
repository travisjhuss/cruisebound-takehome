'use client'
import { use, useEffect, useMemo, useState } from "react";
import CruiseCard from "@/components/CruiseCard";
import { paginateResults } from "@/utils/paginateResults";
import PaginationComponent from "@/components/Pagination";
import SortBy from "@/components/SortBy";
import { SelectChangeEvent } from "@mui/material";
import { sortCruises } from "@/utils/sortCruises";

export default function Home() {
    const [cruiseData, setCruiseData] = useState([]);
    const [page, setPage] = useState(0);
    const [sortValue, setSortValue] = useState('price-desc');
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://sandbox.cruisebound-qa.com/sailings')
            const result = await response.json()
            setCruiseData(result.results)
        }
        
        fetchData()
    }, [])

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
    };
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    const sortedData = useMemo(() => {
        setPage(0);
        return sortCruises(cruiseData, sortValue);
    }, [cruiseData, sortValue]);

    const paginatedData = useMemo(() => paginateResults(sortedData, 10), [sortedData, page, sortValue]);
    console.log("🚀 ~ Home ~ paginatedData:", paginatedData)


    return (
        <div className="flex flex-col space-y-5 w-full justify-center items-center p-6">
            <div className="w-full max-w-4xl text-right">
                <SortBy value={sortValue} handleChange={handleSortChange} />
            </div>
            <div className="w-full max-w-4xl text-left">
                <span>{cruiseData.length} trips found [reset]</span>
            </div>
            {paginatedData[page]?.map((cruise, i) => (
                <CruiseCard cruiseData={cruise} key={i} />
            ))}
            <div className="w-full max-w-4xl text-left">
                <PaginationComponent count={paginatedData.length} activePage={page + 1} handleChange={handlePageChange} />
            </div>
        </div>
    );
}
