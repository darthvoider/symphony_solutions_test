export const getData = async () => {
    const response = await fetch('./assets/data.json');
    return await response.json();
};
