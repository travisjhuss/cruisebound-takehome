'use client'
import { useEffect, useMemo, useState } from "react";
import { CruiseData } from "@/components/CruiseCard";
import { paginateResults } from "@/utils/paginateResults";
import PaginationComponent from "@/components/Pagination";
import SortBy from "@/components/SortBy";
import { SelectChangeEvent } from "@mui/material";
import { sortCruises } from "@/utils/sortCruises";
import Drawer from "@/components/Drawer";
import CruiseResults from "@/components/CruiseResults";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [cruiseData, setCruiseData] = useState([]);
    const [page, setPage] = useState(0);
    const [sortValue, setSortValue] = useState('price-desc');
    const [filterDepartureBy, setFilterDepartureBy] = useState('');
    const [filterCruiselineBy, setFilterCruiselineBy] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/proxy');
                const result = await response.json();
                setCruiseData(result.results);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [])

    const resetFilters = () => {
        setFilterDepartureBy('');
        setFilterCruiselineBy('');
    };

    const handleDepartureFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDepartureBy(event.target.value);
    };

    const handleCruiselineFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCruiselineBy(event.target.value);
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
    };
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    const filteredByDeparture = useMemo(() => {
        return cruiseData.filter((cruise: CruiseData) => {
            const departurePort = cruise?.itinerary[0] ?? '';
            const search = filterDepartureBy.toLowerCase();
            return departurePort?.toLowerCase().includes(search);
        });
    }, [cruiseData, filterDepartureBy]);

    const filteredByCruiseline = useMemo(() => {
        return filteredByDeparture.filter((cruise: CruiseData) => {
            const cruiseline = cruise?.ship.line.name ?? '';
            const search = filterCruiselineBy.toLowerCase();
            return cruiseline?.toLowerCase().includes(search);
        });
    }, [filteredByDeparture, filterCruiselineBy]);

    const sortedData = useMemo(() => {
        setPage(0);
        return sortCruises(filteredByCruiseline, sortValue);
    }, [filteredByCruiseline, sortValue]);

    const paginatedData: CruiseData[][] = useMemo(() => paginateResults(sortedData, 10), [sortedData, page, sortValue]);


    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            <Drawer
                filterDepartureBy={filterDepartureBy}
                filterCruiselineBy={filterCruiselineBy}
                handleDepartureFilterChange={handleDepartureFilterChange}
                handleCruiselineFilterChange={handleCruiselineFilterChange}
            />
            <div className="flex flex-col space-y-5 w-full h-full justify-center items-center p-6">
                <div className="w-full max-w-4xl text-right">
                    <SortBy value={sortValue} handleChange={handleSortChange} />
                </div>
                <div className="flex flex-row w-full h-[30px] items-center max-w-4xl text-left">
                    <span>{sortedData.length} trips found</span>
                    <button 
                        className="ms-3 p-1 border rounded-sm hover:border-blue-500 hover:border-2 hover:bg-gray-100 shadow-[2px_2px_5px_0_rgba(0,0,0,0.1)"
                        onClick={resetFilters}
                    >
                        <p className="text-xs">Reset filters</p>
                    </button>
                </div>
                <CruiseResults cruiseResults={paginatedData} page={page} isLoading={isLoading} />
                <div className="w-full max-w-4xl text-left">
                    <PaginationComponent count={paginatedData.length} activePage={page + 1} handleChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
}
