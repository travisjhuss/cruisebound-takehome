import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
    count: number;
    activePage: number;
    handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({count, activePage, handleChange}) => {
    return (
        <div className="bg-gray-100 p-1 rounded-sm size-fit">
            <Stack spacing={1}>
                <Pagination
                    count={count}
                    siblingCount={1}
                    page={activePage}
                    onChange={handleChange}
                    size="medium"
                    sx={{
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: 'white',
                            '&:hover': {
                            backgroundColor: 'white',
                            },
                        },
                        '& .MuiPaginationItem-root': {
                            '&:hover': {
                            backgroundColor: 'white',
                            fontWeight: 'bold',
                            },
                        },
                        '& .MuiPaginationItem-icon': {
                            color: '#0065FE',
                        },
                    }}
                />
            </Stack>
        </div>
    );
};

export default PaginationComponent;