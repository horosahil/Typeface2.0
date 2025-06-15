import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';

function FileUpload({ onUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) return alert('No file selected');
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8000/upload', formData);
            alert('Upload successful');
            onUpload();  // Refresh file list
        } catch (err) {
            alert('Upload failed: ' + err.response?.data?.detail || err.message);
        }
    };

    return (
        <Box sx={{ my: 2 }}>
            <Typography variant="h6">Upload File</Typography>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} variant="contained" sx={{ ml: 2 }}>Upload</Button>
        </Box>
    );
}

export default FileUpload;
