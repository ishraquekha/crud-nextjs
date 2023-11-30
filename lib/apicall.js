export default async function getUsers(){
    const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(`http://localhost:3000/api/`, postData);
      const response = await res.json();
      return response;
}
export async function addUsers(data){
    const postData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(`http://localhost:3000/api/`, postData);
      const response = await res.json();
      return response;
}
export async function editUsers(data){
    const postData = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(`http://localhost:3000/api/`, postData);
      const response = await res.json();
      return response;
}

export async function deleteUsers(data){
    const postData = {
        method: "DELETE",
        body: JSON.stringify({ "id": data }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(`http://localhost:3000/api/`, postData);
      const response = await res.json();
      return response;
}