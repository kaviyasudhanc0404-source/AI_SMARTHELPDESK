# Environment Setup Guide

## Groq API Key Configuration

The chatbot requires a Groq API key to function. For security reasons, this key is stored in the **backend** environment file and **not committed to the repository**.

### Setup Instructions:

1. **Navigate to the backend directory**:
   ```bash
   cd thinkauto_backend
   ```

2. **Add your Groq API key** to the existing `.env` file (or create it if missing):
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   NODE_ENV=development
   FRONTEND_URL=http://localhost:8081
   GROQ_API_KEY=your_actual_groq_api_key_here
   
   # Admin Credentials
   ADMIN_EMAIL=sudhanadmin@gmail.com
   ADMIN_PASSWORD=sudhan@123
   ```

3. **Get your API key** from [Groq Cloud Console](https://console.groq.com/)

4. **Restart the backend server**:
   ```bash
   npm start
   ```

### Architecture:

- **Frontend** → Calls backend API endpoint `/api/chat/message`
- **Backend** → Uses Groq API key from `.env` to call Groq API
- **Groq API** → Returns AI-generated response

This approach ensures:
- ✅ API key never exposed to the browser
- ✅ No CORS issues with Groq API
- ✅ Centralized API key management
- ✅ Better security and control

### Security Notes:

✅ Backend `.env` is in `.gitignore` and **will not be committed**  
✅ Never commit API keys to version control  
✅ Each developer should configure their own `.env` on the backend  
✅ GitHub push protection is enabled to prevent accidental key exposure

### Verification:

To verify the chatbot is working:
1. Ensure backend is running: http://localhost:5000
2. Open the application at http://localhost:8081
3. Click the chatbot button (bottom-right)
4. Send a test message like "How do I reset my password?"
5. You should receive an AI-powered response

If you see errors, check:
- Backend `.env` file has `GROQ_API_KEY`
- Backend server was restarted after adding the key
- Frontend can reach backend at http://localhost:5000
- Check browser console and backend logs for error details

---

**Note**: The actual API key should be added to `thinkauto_backend/.env` on your local machine only.
