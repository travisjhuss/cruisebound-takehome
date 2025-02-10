import { CruiseData } from "@/components/CruiseCard";

export const paginateResults = (results: CruiseData[], pageSize: number) => {
    const paginatedResults = [];
    for (let i = 0; i < results.length; i += pageSize) {
        const chunk = results.slice(i, i + pageSize);
        paginatedResults.push(chunk);
    }
  
    return paginatedResults;
  }