
export const getUtopyaLinks = async() => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/utopya/get')
    const result = await response.json()
    return result
}

export const getMobilaxLinks = async() => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/mobilax/get')
    const result = await response.json()
    return result
}