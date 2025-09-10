# DeepFake Detection - Deployment Guide

## 🚀 Current Deployment Status

### Backend (Render)
- **URL**: https://deepfake-detection-sxos.onrender.com
- **Status**: ✅ Live and operational
- **Port**: 10000
- **Model**: VGG-Face (optimized for production)

### Frontend (Vercel)
- **URL**: https://deepfake-detection-seven.vercel.app
- **Status**: ✅ Connected to backend
- **Framework**: React + Vite

## 📋 Deployment Checklist

### Backend Changes Made:
- ✅ Updated frontend to use production backend URL
- ✅ Added health check endpoint (`/health`)
- ✅ Optimized for production with VGG-Face model
- ✅ Proper CORS configuration
- ✅ File cleanup after processing
- ✅ Comprehensive error handling

### To Deploy Changes:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Update frontend to use production backend URL and add health endpoint"
   git push origin main
   ```

2. **Backend will auto-deploy** on Render (already configured)

3. **Frontend will auto-deploy** on Vercel (already configured)

## 🔧 API Endpoints

### Health Check
```
GET https://deepfake-detection-sxos.onrender.com/health
```

### Detection
```
POST https://deepfake-detection-sxos.onrender.com/detect
Content-Type: multipart/form-data

Form data:
- realMedia: (file) Original image
- fakeMedia: (file) Suspected deepfake image
```

## 📊 Response Format

```json
{
  "message": "Analysis completed successfully",
  "similarity_score": 0.85,
  "is_likely_deepfake": false
}
```

## 🛠️ Monitoring

- **Render Dashboard**: Monitor backend performance
- **Vercel Dashboard**: Monitor frontend deployments
- **Health Endpoint**: Check API status programmatically

## 🔒 Security Notes

- CORS configured for production domains
- File uploads are automatically cleaned up
- Input validation for file types
- Secure filename handling

## 📈 Performance Optimizations

- Using VGG-Face model (faster than Facenet512)
- Automatic file cleanup
- Optimized image processing
- 30-second timeout for requests
- Threaded Flask server

## 🚨 Troubleshooting

If you encounter issues:

1. Check Render logs: https://dashboard.render.com
2. Check Vercel logs: https://vercel.com/dashboard
3. Test health endpoint: `curl https://deepfake-detection-sxos.onrender.com/health`
4. Verify CORS settings if frontend can't connect

## 📝 Next Steps

Your deployment is ready! The frontend will now connect to your production backend automatically.
