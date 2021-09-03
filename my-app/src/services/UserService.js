export async function getAllUsers() {

    const response = await fetch('/api/users');
    return await response.json();
}
export async function generateFastTest(data) {
    const response = await fetch(`/api/fast`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
      console.log(response);
    return await response.blob();
}
export async function generatePcrTest(data) {
    const response = await fetch(`/api/pcr`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
      console.log(response);
    return await response.blob();
}
