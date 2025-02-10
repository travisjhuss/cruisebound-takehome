import React from 'react';

const NoResults: React.FC = () => {
    return (
        <div className="flex flex-col h-[200px] md:h-[400px] items-center justify-center space-y-2">
            <h2>No Results Found</h2>
            <p>Try adjusting your search or filter to find what you are looking for.</p>
        </div>
    );
};

export default NoResults;