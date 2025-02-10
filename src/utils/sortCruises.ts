export const sortCruises = (cruises: any[], sortKey: string) => {
    switch (sortKey) {
        case 'price-asc':
            return cruises.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return cruises.sort((a, b) => b.price - a.price);
        case 'date-asc':
            return cruises.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
        case 'date-desc':
            return cruises.sort((a, b) => new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime());
        case 'duration-asc':
            return cruises.sort((a, b) => a.duration - b.duration);
        case 'duration-desc':
            return cruises.sort((a, b) => b.duration - a.duration);
        default:
            return cruises;
    }
};