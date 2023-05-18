
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


export const createUtopyaLink = async(url) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/utopya/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: url })
        });
    
        if (response.ok) {
          return true;
        } else {
          throw new Error('Failed to create Utopya link');
        }
      } catch (error) {
        console.error(error);
        return false;
      }
}

export const createMobilaxLink = async(url) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/mobilax/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: url })
        });
    
        if (response.ok) {
          return true;
        } else {
          throw new Error('Failed to create Mobilax link');
        }
      } catch (error) {
        console.error(error);
        return false;
      }
}