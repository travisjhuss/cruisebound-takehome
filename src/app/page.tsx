'use client'
import { useEffect, useState } from "react";
import CruiseCard from "@/components/CruiseCard";
import { paginateResults } from "@/utils/paginateResults";
import PaginationComponent from "@/components/Pagination";

export default function Home() {
    const [cruiseData, setCruiseData] = useState([]);
    const [page, setPage] = useState(0);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };
    
    useEffect(() => {
        async function fetchData() {
        const response = await fetch('https://sandbox.cruisebound-qa.com/sailings')
        const result = await response.json()
        setCruiseData(result.results)
        }
        
        fetchData()
    }, [])

    const paginatedData = paginateResults(cruiseData, 10);
    console.log("🚀 ~ Home ~ paginatedData:", paginatedData)
    const pageToDisplay = 0;


    return (
        <div className="flex flex-col space-y-5 w-full justify-center items-center p-6">
            <div className="w-full max-w-4xl text-right">
                <span>Sort by: [    ]</span>
            </div>
            <div className="w-full max-w-4xl text-left">
                <span>{cruiseData.length} trips found [reset]</span>
            </div>
            {paginatedData[page]?.map((cruise, i) => (
                <CruiseCard cruiseData={cruise} key={i} />
            ))}
            <div className="w-full max-w-4xl text-left">
                <PaginationComponent count={paginatedData.length} activePage={page + 1} handleChange={handleChange} />
            </div>
        </div>
    );
}
