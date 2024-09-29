
export const postQuestion = async (props) => {
    const formData = new FormData();
    formData.append("title", props.title);
    formData.append("description", props.content);
    const response = await fetch('http://localhost:8000/api/question/', {
        method : 'POST',
        body : formData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response;
}