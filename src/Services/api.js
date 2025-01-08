const apiUrl = 'https://lionfish-app-wosuj.ondigitalocean.app'

export async function addCompany(data) {
    try {
        const res = await fetch(`${apiUrl}/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Post error: ${res.status} - ${errorText}`);
        }

        return await res.json();
    } catch (error) {
        console.error(error);
    }  
};

export async function getCompanies() {
    try {
        const res = await fetch(`${apiUrl}/companies`);

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Get error: ${res.status} - ${errorText}`);
        }

        return res.json();
    } catch (error) {
        console.error(error);
    }
}

export async function editCompany(data) {
    try {
        const res = await fetch(`${apiUrl}/companies/${data.ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                _method: 'PATCH'
            })
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Patch error: ${res.status} - ${errorText}`);
        }

        return true;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteCompany(id, idContact1 = undefined, idContact2 = undefined) {
    try {
        const res = await fetch(`${apiUrl}/companies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: id,
                contact_1_id: idContact1,
                contact_2_id: idContact2,
            })
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Delete error: ${res.status} - ${errorText}`);
        }

        return true;
    } catch (error) {
        console.error(error);
    }
}