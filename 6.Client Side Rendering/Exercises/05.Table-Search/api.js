export async function get(){
    const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
    const data = await response.json();
    return [...Object.values(data)];
}