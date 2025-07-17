# NJ SPIRIT Presentation - GitHub Pages Setup

## Overview
This repository contains the secure GitHub Pages setup for the NJ SPIRIT Web Pages Upgrade presentation. The presentation is protected with basic authentication to ensure only authorized users can access the confidential North Highland client information.

## Files Structure
```
├── index.html          # Authentication login page
├── presentation.html   # Main presentation file
├── auth-check.js      # Authentication security script
└── README.md          # This file
```

## Authentication System

### Login Credentials
The following credentials are available for accessing the presentation:

| Username | Password | Purpose |
|----------|----------|---------|
| `demo` | `presentation2025` | General demo access |
| `client` | `njspirit2025` | Client stakeholder access |
| `team` | `northhighland` | North Highland team access |
| `admin` | `secure123` | Administrative access |
| `guest` | `view2025` | Guest/temporary access |

### Security Features

#### Authentication
- **Client-side validation** with credential verification
- **Session management** with 24-hour timeout
- **Persistent login** using localStorage
- **Automatic logout** after inactivity (30 minutes)
- **Session expiration** warnings at 25 minutes

#### Security Measures
- **Right-click disabled** to prevent context menu access
- **Developer tools shortcuts disabled** (F12, Ctrl+Shift+I, etc.)
- **Text selection disabled** for sensitive content
- **Console clearing** every 10 seconds
- **Watermark** showing "North Highland Confidential"
- **Activity monitoring** for session management

#### Access Control
- **Logout button** in top-right corner
- **User information display** showing current user and access time
- **Honeypot detection** for automated access attempts
- **Bot protection** measures

## Deployment Instructions

### 1. Create GitHub Repository
```bash
# Navigate to the setup directory
cd /Users/pr308098/Repos/nj-spirit-repo/github-pages-setup

# Initialize git repository
git init

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/nj-spirit-presentation.git

# Add all files
git add .

# Commit files
git commit -m "Initial deployment of secure NJ SPIRIT presentation"

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

### 3. Access the Presentation
- **URL**: `https://yourusername.github.io/nj-spirit-presentation/`
- **Login**: Use any of the credentials listed above
- **Direct presentation access**: `https://yourusername.github.io/nj-spirit-presentation/presentation.html` (redirects to login if not authenticated)

## Usage Instructions

### For Administrators
1. Share the GitHub Pages URL with authorized users
2. Provide appropriate credentials based on user role
3. Monitor access through GitHub Pages analytics (if enabled)
4. Update credentials in `index.html` as needed

### For Users
1. Navigate to the GitHub Pages URL
2. Enter your username and password
3. Click "Access Presentation"
4. Use the presentation navigation controls
5. Use the logout button when finished

## Security Considerations

### Client-Side Authentication
⚠️ **Important**: This implementation uses client-side authentication for demonstration purposes. The credentials are stored in the JavaScript code and can be viewed by determined users.

### For Production Use
For production deployment with sensitive information, consider:
- **Server-side authentication** with proper user management
- **HTTPS encryption** for all communications
- **Database-backed user management**
- **Session management** with secure tokens
- **Audit logging** for access tracking
- **IP whitelisting** for additional security

### Current Security Level
This implementation provides:
- ✅ **Basic access control** for casual users
- ✅ **Session management** with timeout
- ✅ **UI restrictions** to prevent easy access
- ✅ **Activity monitoring** and auto-logout
- ❌ **Not suitable for highly sensitive data**
- ❌ **Credentials visible in source code**

## Customization

### Adding/Removing Users
Edit the `validCredentials` object in `index.html`:
```javascript
const validCredentials = {
    'newuser': 'newpassword',
    'another': 'anotherpass'
};
```

### Changing Session Timeout
Modify the timeout values in `auth-check.js`:
```javascript
const thirtyMinutes = 30 * 60 * 1000; // 30 minutes
const twentyFiveMinutes = 25 * 60 * 1000; // 25 minutes
```

### Updating Presentation Content
Replace the content in `presentation.html` with your updated presentation while keeping the authentication script reference.

## Troubleshooting

### Common Issues
1. **"Invalid credentials"** - Check username/password spelling
2. **Session expires quickly** - Check system time settings
3. **Presentation not loading** - Verify authentication script is included
4. **GitHub Pages not updating** - Wait 5-10 minutes for deployment

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ❌ Internet Explorer (not supported)

## Support
For technical issues or questions about the presentation setup, contact the North Highland project team.

---

**© 2025 North Highland. All rights reserved. | Confidential and Proprietary**