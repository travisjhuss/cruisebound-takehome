'use client'
import { useEffect, useMemo, useState } from "react";
import CruiseCard from "@/components/CruiseCard";
import { paginateResults } from "@/utils/paginateResults";
import PaginationComponent from "@/components/Pagination";
import SortBy from "@/components/SortBy";
import { SelectChangeEvent } from "@mui/material";
import { sortCruises } from "@/utils/sortCruises";
import Drawer from "@/components/Drawer";

export default function Home() {
    const [cruiseData, setCruiseData] = useState([]);
    const [page, setPage] = useState(0);
    const [sortValue, setSortValue] = useState('price-desc');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filterDepartureBy, setFilterDepartureBy] = useState('');
    const [filterCruiselineBy, setFilterCruiselineBy] = useState('');
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://sandbox.cruisebound-qa.com/sailings')
            const result = await response.json()
            setCruiseData(result.results)
        }
        
        fetchData()
    }, [])

    const handleDepartureFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDepartureBy(event.target.value);
    };

    const handleCruiselineFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("🚀 ~ inside handle cruilseine filter change")
        setFilterCruiselineBy(event.target.value);
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
    };
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    const filteredByDeparture = useMemo(() => {
        return cruiseData.filter((cruise: any) => {
            const departurePort = cruise?.itinerary[0] ?? '';
            const search = filterDepartureBy.toLowerCase();
            return departurePort?.toLowerCase().includes(search);
        });
    }, [cruiseData, filterDepartureBy]);

    const filteredByCruiseline = useMemo(() => {
        return filteredByDeparture.filter((cruise: any) => {
            const cruiseline = cruise?.ship.line.name ?? '';
            const search = filterCruiselineBy.toLowerCase();
            return cruiseline?.toLowerCase().includes(search);
        });
    }, [filteredByDeparture, filterCruiselineBy]);
    console.log("🚀 ~ filteredByCruiseline ~ filteredByCruiseline:", filteredByCruiseline)

    const sortedData = useMemo(() => {
        setPage(0);
        return sortCruises(filteredByCruiseline, sortValue);
    }, [filteredByCruiseline, sortValue]);

    const paginatedData = useMemo(() => paginateResults(sortedData, 10), [sortedData, page, sortValue]);
    console.log("🚀 ~ Home ~ paginatedData:", paginatedData)


    return (
        <div className="flex flex-row w-full h-full">
            <Drawer
                open={drawerOpen}
                toggleDrawer={setDrawerOpen}
                filterDepartureBy={filterDepartureBy}
                filterCruiselineBy={filterCruiselineBy}
                handleDepartureFilterChange={handleDepartureFilterChange}
                handleCruiselineFilterChange={handleCruiselineFilterChange}
            />
            <div className="flex flex-col space-y-5 w-full justify-center items-center p-6">
                <div className="w-full max-w-4xl text-right">
                    <SortBy value={sortValue} handleChange={handleSortChange} />
                </div>
                <div className="w-full max-w-4xl text-left">
                    <span>{sortedData.length} trips found [reset]</span>
                </div>
                {paginatedData[page]?.map((cruise, i) => (
                    <CruiseCard cruiseData={cruise} key={i} />
                ))}
                <div className="w-full max-w-4xl text-left">
                    <PaginationComponent count={paginatedData.length} activePage={page + 1} handleChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
}
