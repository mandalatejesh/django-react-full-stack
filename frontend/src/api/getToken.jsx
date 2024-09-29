export const login = async (creds) => {
    const formData = new FormData();
    formData.append("email", creds.email);
    formData.append("password", creds.password);
    const response = await fetch('http://localhost:8000/api/token/', {
        method : 'POST',
        body : formData
    })
    return response;
}