const express = require('express');
const path = require('path');const app = express();
const PORT = process.env.PORT || 3000;app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'DramaPix' });
});app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
  });
});app.listen(PORT, () => {
  console.log(DramaPix rodando na porta ${PORT});
});
