export const deleteLink = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/links/delete/${id}`, {
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