const express = require('express');
const router = express.Router();
const axios = require('axios');

// 新增代理路由
router.get('/metadata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const apiUrl = `https://api.make-name.msu.io/api/v1/metadata/${id}`;
    
    // 添加缓存控制（可选）
    res.set('Cache-Control', 'public, max-age=3600');

    // 转发请求到目标API
    const response = await axios.get(apiUrl, {
      headers: {
        // 如果需要授权头可以在这里添加
        // 'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });

    // 返回原始API的响应数据
    res.json(response.data);
    
  } catch (error) {
    // 增强错误处理
    console.error('Proxy error:', error);
    
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Internal Server Error';
    
    res.status(status).json({
      success: false,
      error: message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 保持你原有的NFT相关路由
router.get('/some-existing-route', (req, res) => {
  // ...原有逻辑
});

module.exports = router;