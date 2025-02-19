import { Link } from "react-router-dom";
import {useState} from 'react';
import Axios from 'axios';

function Search () {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ users: [], groups: []});

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = {query}

        if (!query) return;

        try {
            const response = Axios.post('http://localhost:8800/Search', userData);
            /*const data = await response.json();*/
            console.log(response.data);
            
            /*setResults({
                users: data.users || [],
                groups: data.groups || []
            });*/
        } catch(error) {
            console.error("Search error:", error);
            setResults({ users: [], groups: [] });
        }
    };

    return (
        <div>
            <div className="search-bar">
                <input type="text"
                placeholder="Type to search..."
                 value={query} 
                 onChange={(e) => setQuery(e.target.value)}/>
                 <button onClick={handleSubmit}>Search</button>
            </div>
            <div>
                <h3>Users</h3>
                <ul>
                    {results.users.length > 0 ? (
                        results.users.map((user) => <li key={user.id}>{user.username}</li>)
                    ) : (
                        <li>No users found</li>
                    )}
                </ul>

                <h3>Groups</h3>
                <ul>
                    {results.groups.length > 0 ? (
                        results.groups.map((group) => <li key={group.id}>{group.group_name}</li>)
                    ) : (
                        <li>No groups found</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Search;