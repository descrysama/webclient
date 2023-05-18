
export const runSupplierScript = async(id) => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/script/get')
    const result = await response.json()
    return result
}