const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// In-memory furniture state
let furnitureState = {};

// Move furniture
app.post('/api/furniture/move', (req, res) => {
  const { id, x, y } = req.body;
  if (!id || x == null || y == null) {
    return res.status(400).json({ error: 'Missing id, x, or y' });
  }
  furnitureState[id] = furnitureState[id] || {};
  furnitureState[id].x = x;
  furnitureState[id].y = y;
  res.json({ success: true, state: furnitureState[id] });
});

// Rotate furniture
app.post('/api/furniture/rotate', (req, res) => {
  const { id, angle } = req.body;
  if (!id || angle == null) {
    return res.status(400).json({ error: 'Missing id or angle' });
  }
  furnitureState[id] = furnitureState[id] || {};
  furnitureState[id].angle = angle;
  res.json({ success: true, state: furnitureState[id] });
});

// Change furniture color
app.post('/api/furniture/color', (req, res) => {
  const { id, color } = req.body;
  if (!id || !color) {
    return res.status(400).json({ error: 'Missing id or color' });
  }
  furnitureState[id] = furnitureState[id] || {};
  furnitureState[id].color = color;
  res.json({ success: true, state: furnitureState[id] });
});

// Get all furniture state (for debugging)
app.get('/api/furniture', (req, res) => {
  res.json(furnitureState);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 