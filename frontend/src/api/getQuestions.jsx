export const getQuestions = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/question/?format=json', {
        method : 'GET',
        mode : 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
        
    })
    return response;
}

export default getQuestions;