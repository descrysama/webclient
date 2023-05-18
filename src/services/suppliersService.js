
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

export const deleteMobilaxLink = async(id) => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/mobilax/delete/'+ id, {
        method: 'DELETE'
    })
    const result = await response.json()
    return result
}

export const deleteUtopyaLink = async(id) => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/utopya/delete/'+ id, {
        method: 'DELETE'
    })
    const result = await response.json()
    return result
}