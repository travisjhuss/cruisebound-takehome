export const fetchCruises = async () => {
    const res = await fetch('https://sandbox.cruisebound-qa.com/sailings');
    const data = await res.json();
  
    return data;
};
