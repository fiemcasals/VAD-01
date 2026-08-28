const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 80;

app.use(express.json({ limit: '10mb' }));
// Servir todos los archivos estáticos desde la carpeta actual
app.use(express.static(__dirname));

const dataDir = path.join(__dirname, 'data');
const dbFile = path.join(dataDir, 'database.json');

// Asegurar que exista la carpeta de datos
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// API para OBTENER el presupuesto actual
app.get('/api/budget', (req, res) => {
    if (fs.existsSync(dbFile)) {
        res.sendFile(dbFile);
    } else {
        res.status(404).json({ error: "Base de datos vacía. Se usarán valores de fábrica." });
    }
});

// API para GUARDAR el presupuesto editado
app.post('/api/budget', (req, res) => {
    try {
        fs.writeFileSync(dbFile, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Fallo al guardar en la base de datos" });
    }
});

app.listen(port, () => {
    console.log(`Backend de Presupuesto VAD corriendo en el puerto ${port}`);
});
