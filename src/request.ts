
const url = 'https://swapi.dev/api/people'

interface AsyncState<T> {
    results: T | null;
}

export interface Dismissable<T> {
    results: T
    dismiss: (retry?: any) => unknown
}

const fetchJson = async <T>(url: string, id?: string): Promise<T> => {
    const urls = url.concat(id ?? '')
    try {
        const response = await fetch(urls);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


const getAllPeople = <T>(): Promise<T> => fetchJson(url)

const getPeopleId = <T>(id: string): Promise<T> => fetchJson(url, id)


export { getAllPeople, getPeopleId, type AsyncState }