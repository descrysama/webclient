

export const getSingleSku = async(id) => {
  const response = await fetch(process.env.REACT_APP_API_URL+ '/sku/get/' + id, {
    credentials: 'include',
  })
  const result = await response.json()
  return result
}

export const updateSku = async(id, body) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sku/update/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: body.name , prix_fournisseur: body.prix_fournisseur, urls: body.urls})
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
    const data = await fetch(process.env.REACT_APP_API_URL+ '/sku/get', {
      credentials: 'include',
    })
    const result = await data.json()
    return result
}

export const SearchSku = async(query) => {
  const data = await fetch(process.env.REACT_APP_API_URL+ '/sku/search', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: query })
  })
  const result = await data.json()
  return result
}

export const createSku = async (body) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sku/create/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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
        credentials: 'include',
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