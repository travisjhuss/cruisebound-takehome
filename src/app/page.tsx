'use client'
import { useEffect, useState } from "react";
import CruiseCard from "@/components/CruiseCard";

export default function Home() {
    const [cruiseData, setCruiseData] = useState([])
    console.log("🚀 ~ Home ~ cruiseData:", cruiseData)

    useEffect(() => {
        async function fetchData() {
        const response = await fetch('https://sandbox.cruisebound-qa.com/sailings')
        const result = await response.json()
        setCruiseData(result.results)
        }
        
        fetchData()
    }, [])

  return (
    <div className="flex flex-col space-y-5 justify-center items-center p-4">
        {cruiseData.map((cruise, i) => (
            <CruiseCard cruiseData={cruise} key={i} />
        ))}
    </div>
  );
}
