const filters = {
    searchText: ''
}

const getFilters = () => filters

const updateFilters = (searchText) => {
    if (typeof searchText === 'string') {
       filters.searchText = searchText
    }   
}

export { getFilters, updateFilters }