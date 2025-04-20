import React, { useState } from 'react';
import axios from 'axios';

const SearchAndUpdateForm = () => {
    const [admNo, setAdmNo] = useState('');
    const [record, setRecord] = useState(null);
    const [updatedData, setUpdatedData] = useState({ name: '', email: '', phone: '' });

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://hsbackendpkm.vercel.app/search/${admNo}`); // Use /search instead of /record
            setRecord(response.data);
        } catch (error) {
            console.error('Error fetching record:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`https://hsbackendpkm.vercel.app/update/${admNo}`, updatedData);
            alert('Record updated successfully');
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter Adm No" 
                value={admNo} 
                onChange={(e) => setAdmNo(e.target.value)} 
            />
            <button onClick={handleSearch}>Fetch Record</button>

            {record && (
                <div>
                    <h3>Record Found</h3>
                    <p>Name: {record.name}</p>
                    <p>Email: {record.email}</p>
                    <p>Phone: {record.phone}</p>
                    <input 
                        type="text" 
                        placeholder="New Name" 
                        onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })} 
                    />
                    <input 
                        type="email" 
                        placeholder="New Email" 
                        onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })} 
                    />
                    <input 
                        type="tel" 
                        placeholder="New Phone" 
                        onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })} 
                    />
                    <button onClick={handleUpdate}>Update Record</button>
                </div>
            )}
        </div>
    );
};

export default SearchAndUpdateForm;
