// Authentication check for presentation access
(function() {
    'use strict';
    
    // Check if user is authenticated
    function checkAuth() {
        const isAuthenticated = localStorage.getItem('njspirit-auth') === 'authenticated';
        const accessTime = localStorage.getItem('njspirit-access-time');
        
        if (!isAuthenticated) {
            redirectToLogin();
            return false;
        }
        
        // Check session timeout (24 hours)
        if (accessTime) {
            const now = new Date();
            const access = new Date(accessTime);
            const diffHours = (now - access) / (1000 * 60 * 60);
            
            if (diffHours > 24) {
                // Session expired
                localStorage.removeItem('njspirit-auth');
                localStorage.removeItem('njspirit-user');
                localStorage.removeItem('njspirit-access-time');
                redirectToLogin();
                return false;
            }
        }
        
        return true;
    }
    
    function redirectToLogin() {
        window.location.href = 'index.html';
    }
    
    // Add logout functionality
    function addLogoutButton() {
        const logoutBtn = document.createElement('button');
        logoutBtn.innerHTML = '🚪 Logout';
        logoutBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        `;
        
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('njspirit-auth');
                localStorage.removeItem('njspirit-user');
                localStorage.removeItem('njspirit-access-time');
                window.location.href = 'index.html';
            }
        });
        
        logoutBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.2)';
        });
        
        logoutBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
        
        document.body.appendChild(logoutBtn);
    }
    
    // Add user info display
    function addUserInfo() {
        const user = localStorage.getItem('njspirit-user');
        const accessTime = localStorage.getItem('njspirit-access-time');
        
        if (user) {
            const userInfo = document.createElement('div');
            userInfo.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                z-index: 10000;
                backdrop-filter: blur(10px);
            `;
            
            const accessDate = new Date(accessTime).toLocaleString();
            userInfo.innerHTML = `
                <strong>👤 ${user}</strong><br>
                <small>Access: ${accessDate}</small>
            `;
            
            document.body.appendChild(userInfo);
        }
    }
    
    // Security measures for presentation
    function addSecurityMeasures() {
        // Disable right-click context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
        
        // Disable common developer tools shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                (e.ctrlKey && e.key === 'U') ||
                (e.ctrlKey && e.key === 'S')) {
                e.preventDefault();
            }
        });
        
        // Disable text selection for sensitive content
        document.addEventListener('selectstart', function(e) {
            if (e.target.classList.contains('no-select')) {
                e.preventDefault();
            }
        });
        
        // Clear console periodically
        setInterval(() => {
            console.clear();
        }, 10000);
        
        // Add watermark
        const watermark = document.createElement('div');
        watermark.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            color: rgba(255, 255, 255, 0.3);
            font-size: 0.75rem;
            z-index: 9999;
            pointer-events: none;
            user-select: none;
        `;
        watermark.textContent = 'North Highland Confidential';
        document.body.appendChild(watermark);
    }
    
    // Activity monitoring
    function monitorActivity() {
        let lastActivity = Date.now();
        let warningShown = false;
        
        // Track user activity
        const activities = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        activities.forEach(activity => {
            document.addEventListener(activity, function() {
                lastActivity = Date.now();
                warningShown = false;
            });
        });
        
        // Check for inactivity (30 minutes)
        setInterval(() => {
            const inactiveTime = Date.now() - lastActivity;
            const thirtyMinutes = 30 * 60 * 1000;
            const twentyFiveMinutes = 25 * 60 * 1000;
            
            if (inactiveTime > thirtyMinutes) {
                // Auto-logout after 30 minutes of inactivity
                localStorage.removeItem('njspirit-auth');
                localStorage.removeItem('njspirit-user');
                localStorage.removeItem('njspirit-access-time');
                alert('Session expired due to inactivity. Please log in again.');
                window.location.href = 'index.html';
            } else if (inactiveTime > twentyFiveMinutes && !warningShown) {
                // Warning at 25 minutes
                warningShown = true;
                if (confirm('Your session will expire in 5 minutes due to inactivity. Click OK to stay logged in.')) {
                    lastActivity = Date.now();
                    warningShown = false;
                }
            }
        }, 60000); // Check every minute
    }
    
    // Initialize security when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (checkAuth()) {
                addLogoutButton();
                addUserInfo();
                addSecurityMeasures();
                monitorActivity();
            }
        });
    } else {
        if (checkAuth()) {
            addLogoutButton();
            addUserInfo();
            addSecurityMeasures();
            monitorActivity();
        }
    }
})();