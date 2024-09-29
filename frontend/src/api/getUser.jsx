export const getUsername = async ({email}) => {
    let url = 'http://localhost:8000/user/'
    if(email){
        url = `http://localhost:8000/user/?user=${encodeURIComponent(email)}`;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch username for :', response.text);
      }
      const res = await response.json();
      return res.name;  
}