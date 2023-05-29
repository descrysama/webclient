
export const runSupplierScript = async(id) => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/script/get', {
        credentials: 'include',
    })
    const result = await response.json()
    return result
}

export const runCompetitorScript = async(id) => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/script/runmain', {
        credentials: 'include',
    })
    const result = await response.json()
    return result
}