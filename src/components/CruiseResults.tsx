import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import CruiseCard, { CruiseData } from './CruiseCard';
import NoResults from './NoResults';

interface CruiseResultsProps {
    cruiseResults: CruiseData[][];
    page: number;
    isLoading: boolean;
}

const CruiseResults: React.FC<CruiseResultsProps> = ({cruiseResults, page, isLoading}) => {

    if (isLoading) {
        return (<Skeleton variant="rounded" animation="wave" width="100%" height={200} />);
    }

    return (
        <div>
            {cruiseResults.length !== 0 ? cruiseResults[page]?.map((cruise, i) => (
                    <CruiseCard cruiseData={cruise} key={i} />
                )) : <NoResults />
            }
        </div>
    );
};

export default CruiseResults;
