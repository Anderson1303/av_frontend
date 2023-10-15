import { useState, useEffect } from 'react';

import { userService } from '../services';

export default Home;

function Home() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        setUsers(userService.userValue);
    }, []);

    return (
        <div className="card mt-4">
            {users != null && <h4 className="card-header">Usuário logado {users.firstName} {users.lastName}</h4>}
            <div className="card-body">
            </div>
        </div>
    );
}
