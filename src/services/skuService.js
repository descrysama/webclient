

export const fetchAllSku = async() => {
    const data = await fetch(process.env.REACT_APP_API_URL+ '/sku/get')
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