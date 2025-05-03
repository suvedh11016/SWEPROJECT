import React, { useState } from 'react';

function UploadDigital() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '', // Changed from 'condition' to 'category'
        upload_date: '', // Changed from 'from_date' to 'upload_date'
        upload_item: ''  // This will store the Google Drive link
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMessage('');
    };

    // Handle upload form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // Basic validation
        if (!form.title || !form.upload_date || !form.upload_item) {
            setMessage('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('authToken');
        console.log("Token:", token); 
        if(!token) {
            console.log("No token found");
        }

        try {
            const response = await fetch('http://localhost:5000/api/upload-digital', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    condition: form.condition,
                    upload_date: form.upload_date,
                    upload_item: form.upload_item  // Send the Google Drive link
                })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Upload successful!');
                setForm({
                    title: '',
                    description: '',
                    category: '',
                    upload_date: '',
                    upload_item: ''
                });
            } else {
                setMessage(data.error || 'Upload failed.');
            }
        } catch (err) {
            setMessage('Network error. Is the backend running?');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
            <h2>Upload Digital Resource</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Condition</label>
                    <input
                        type="text"
                        name="condition"
                        value={form.condition}
                        onChange={handleChange}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                        placeholder="e.g., New, Used, Refurbished"
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Upload Date</label>
                    <input
                        type="date"
                        name="upload_date"
                        value={form.upload_date}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Google Drive Link</label>
                    <input
                        type="url"
                        name="upload_item"
                        value={form.upload_item}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                        placeholder="Paste the Google Drive link here"
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: 10,
                        background: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4
                    }}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                {message && (
                    <div style={{ marginTop: 16, color: message.startsWith('Upload successful') ? 'green' : 'red' }}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

export default UploadDigital;
