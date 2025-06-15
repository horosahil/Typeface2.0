import React from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import { AppBar, Toolbar, Typography, Container, Box, Paper } from '@mui/material';

function App() {
    const [refresh, setRefresh] = React.useState(false);

    const triggerRefresh = () => setRefresh(prev => !prev);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Typeface Dropbox
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ my: 4 }}>
                <Box display="flex" flexDirection="column" gap={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Upload a File
                        </Typography>
                        <FileUpload onUpload={triggerRefresh} />
                    </Paper>

                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Your Files
                        </Typography>
                        <FileList key={refresh} />
                    </Paper>
                </Box>
            </Container>
        </>
    );
}

export default App;
