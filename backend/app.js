const express = require('express');
const cors = require('cors');
const nftRoutes = require('./routes/nftRoutes');
require('dotenv').config(); // 加载环境变量

const app = express();

// 增强CORS配置
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API路由
app.use('/api/nft', nftRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Proxy target: ${process.env.API_BASE_URL}`);
});