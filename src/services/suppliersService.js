
export const getUtopyaLinks = async() => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/utopya/get', {
      credentials: 'include',
    })
    const result = await response.json()
    return result
}

export const getMobilaxLinks = async() => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/mobilax/get', {
      credentials: 'include',
    })
    const result = await response.json()
    return result
}

export const deleteMobilaxLink = async(id) => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/mobilax/delete/'+ id, {
      credentials: 'include',
      method: 'DELETE'
    })
    const result = await response.json()
    return result
}

export const deleteUtopyaLink = async(id) => {
    const response = await fetch(process.env.REACT_APP_API_URL+ '/utopya/delete/'+ id, {
      credentials: 'include',
      method: 'DELETE'
    })
    const result = await response.json()
    return result
}


export const createUtopyaLink = async(body) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/utopya/create/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: body.url, title: body.title })
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

export const createMobilaxLink = async(body) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/mobilax/create/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: body.url, title: body.title })
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