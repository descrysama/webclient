

export const getSingleSku = async(id) => {
  const response = await fetch(process.env.REACT_APP_API_URL+ '/sku/get/' + id)
  const result = await response.json()
  return result
}

export const updateSku = async(id, body) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sku/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: body.name , urls: body.urls})
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('Failed to update SKU');
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const fetchAllSku = async() => {
    const data = await fetch(process.env.REACT_APP_API_URL+ '/sku/get')
    const result = await data.json()
    return result
}

export const SearchSku = async(query) => {
  const data = await fetch(process.env.REACT_APP_API_URL+ '/sku/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: query })
  })
  const result = await data.json()
  return result
}

export const createSku = async (name) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sku/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('Failed to create SKU');
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteSku = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sku/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        return true;
      } else {
        throw new Error('Failed to delete SKU');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
};