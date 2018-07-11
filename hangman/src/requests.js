// Puzzle Default, Async version
// const getPuzzle = (wordCount, callback) => {
//     const request = new XMLHttpRequest()

//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse
//             (e.target.responseText)
//             callback(undefined, data.puzzle)
//         } else if (e.target.readyState === 4) {
//             callback('An error has taken place!',undefined)
//         }
//     })

//     request.open('GET', `//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
//     request.send();
// }

// Puzzle Sync version
// const getPuzzleSync = () => {
//     const request = new XMLHttpRequest()
//     request.open('GET', '//puzzle.mead.io/puzzle?wordCount=3', false)
//     request.send();


//     if (request.readyState === 4 && request.status === 200) {
//         const data = JSON.parse
//         (request.responseText)
//         return data.puzzle
//     } else if (request.target.readyState === 4) {
//         throw new Error('Things did not go well')
//     }
// }

// Puzzle Promise version
// const getPuzzlePromise = (wordCount) => new Promise((resolve, reject) => {    const request = new XMLHttpRequest()

//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse
//             (e.target.responseText)
//             resolve(data.puzzle)
//         } else if (e.target.readyState === 4) {
//             reject('An error has taken place!')
//         }
//     })

//     request.open('GET', `//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
//     request.send();
// })

// Puzzle Fetch version
// const getPuzzleFetch = (wordCount) => {
//     return fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`, {}).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch puzzle')
//         }
//     }).then((data) => data.puzzle)
// }

// Puzzle Async await Fetch version
// const getPuzzleAwait = async (wordCount) => {
//     const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`, {})

//     if (response.status === 200) {
//         const data = await response.json()
//         return data.puzzle
//     } else {
//         throw new Error('Unable to fetch puzzle')
//     }
// }

// Country Callback version
// const getCountryDetails = (countryCode, callback) => {
//     const request = new XMLHttpRequest

//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse(e.target.responseText)
//             const country = data.find(country => country.alpha2Code === countryCode)
//             callback(undefined, country)
//         } else if (e.target.readyState === 4) {
//             callback('Something went wrong!', undefined)
//         }
//     })

//     request.open('GET', '//restcountries.eu/rest/v2/all')
//     request.send()
// }

// Country Promise version
// const getCountryDetailsPromise = (countryCode) => new Promise( (resolve, reject) => {
//     const request = new XMLHttpRequest()

//     request.addEventListener('readystatechange', (e) => {
//         if(e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse(e.target.responseText)
//             const country = data.find(country =>  country.alpha2Code === countryCode)
//             resolve(country)
//         } else if (e.target.readyState === 4) {
//             reject('Unable to fetch data')
//         }
//     })

//     request.open('GET', '//restcountries.eu/rest/v2/all')
//     request.send()
// })

// Country Fetch version
// const getCountryDetailsFetch = (countryCode) => {
//     return fetch('//restcountries.eu/rest/v2/all', {}).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch country')
//         }
//     }).then((response) => {
//         const country = response.find((country) => country.alpha2Code === countryCode)
//         // return country.name
//         return country
//     })
// }


// Promise challange
// const getLocationFetch = () => {
//     return fetch('//ipinfo.io/json?token=92016689728bf0', {}).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch ip info')
//         }
//     }).then((data) => {
//         // console.log(`${data.city} ${data.region} ${data.country}`)
//         return data
//     })
// }

// const getLocationPromise = () => new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest()

//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse(e.target.responseText)
//             resolve(console.log(`${data.city} ${data.region} ${data.country}`))
//         } else if (e.target.readyState === 4) {
//             reject(console.log('Unable to Get ip info'))
//         }
//     })
    
//     request.open('GET', '//ipinfo.io/json?token=92016689728bf0')
//     request.send()
// }, (reject) => {
//     console.log('Unable to get the data.')
// })

// Promise Chaining Challange
// const getLocationChain = () => {
//     return fetch('//ipinfo.io/json?token=92016689728bf0', {}).then( (response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch ip info')
//         }
//     }).then((location) => {   
//         return getCountryDetailsFetch(location.country)
//     }).then((country) => {
//         console.log(`You are currently in ${country}`)
//     }).catch((err) => {
//         console.log(`Error: ${err}`)
//     })
// }

// Async - Await Challange
// const getLocationAwait = async () => {
//     const response = await fetch('//ipinfo.io/json?token=92016689728bf0', 
//     {})
//     if (response.status === 200) {
//         return response.json()
//     } else {
//         throw new Error('Unable to fetch location')
//     }
// }

// const getCountryDetailsAwait = async (countryCode) => {
//     const response = await fetch('//restcountries.eu/rest/v2/all', {})

//     if (response.status === 200) {
//         const data = await response.json()
//         return data.find((country) => country.alpha2Code === countryCode)
//     } else {
//         throw new Error('Unable to fetch data')
//     }
// }

// Longer version (I've chosen it to practice the structure even more)
// const getLocationChainAwait = async () => {
//     const location = await fetch('http://ipinfo.io/json?token=92016689728bf0', {})
    
//     if (location.status === 200) {
//         const data = await location.json()
//         const countryCode = await data.country

//         const countriesResp = await fetch('http://restcountries.eu/rest/v2/all', {})

//         if (countriesResp.status === 200) {
//             const countries = await countriesResp.json()
//             return countries.find( (country) => country.alpha2Code === countryCode)
//         } else {
//             throw new Error('Unable to fetch country data')
//         }

//     } else {
//         throw new Error('Unable to fetch up info')
//     }
// }

// Shorter version --> we are using the already made functions to chain them together using async-await
// const getLocationChainAwait = async () => {
//     const location = await getLocationFetch()
//     const country = await getCountryDetailsFetch(location.country)
//     return country
// }




// const getLocationFetch = () => {
//     return fetch('//ipinfo.io/json?token=92016689728bf0', {}).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch ip info')
//         }
//     }).then((data) => {
//         return data
//     })
// }


// const getCountryDetailsFetch = (countryCode) => {
//     return fetch('//restcountries.eu/rest/v2/all', {}).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch country')
//         }
//     }).then((response) => {
//         const country = response.find((country) => country.alpha2Code === countryCode)
//         return country
//     })
// }

// const getLocationChainAwait = async () => {
//     const location = await getLocationFetch()
//     const country = await getCountryDetailsFetch(location.country)
//     return country
// }

const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`, {})

    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to fetch puzzle')
    }
}

export { getPuzzle as default }