export const profilePicture = async ({email}) => {
    let url = `http://localhost:8000/profilepic/`;
    if(email){
        url = `http://localhost:8000/profilepic/?user=${encodeURIComponent(email)}`;
    }
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile picture');
    }
    const blob = await response.blob();
  
    return blob;  
  };