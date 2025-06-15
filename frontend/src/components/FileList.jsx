import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

function FileList() {
    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
        const res = await axios.get('http://localhost:8000/files');
        setFiles(res.data);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleDownload = (filename) => {
        window.location.href = `http://localhost:8000/download/${filename}`;
    };

    const handleViewContent = (filename) => {
        const fileUrl = `http://localhost:8000/view/${filename}`;
        window.open(fileUrl, '_blank');
    };


    return (
        <div>
            <h3>Your Files</h3>
            <List>
                {files.map((file) => (
                    <ListItem key={file.id} divider
                        secondaryAction={
                            <>
                                <IconButton onClick={() => handleDownload(file.filename)}>
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton onClick={() => handleViewContent(file.filename)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText primary={file.filename} secondary={new Date(file.upload_time).toLocaleString()} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default FileList;
