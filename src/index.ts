import app from './app';

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`El server corre bien en http://localhost:${PORT}`);
});