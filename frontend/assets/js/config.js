// Centralized API configuration for CYPR frontend.
// Automatically switches between Localhost and Production AWS Backend!

(function() {
    const hostname = window.location.hostname;
    
    // Clean and optimized check using regex for local development environments
    const isLocalDev = [
        'localhost', '127.0.0.1', ''
    ].includes(hostname) || 
    /^192\.168\./.test(hostname) || 
    /^10\./.test(hostname) || 
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) || // Matches 172.16.x.x to 172.31.x.x completely
    hostname.endsWith('.local');
    
    // 🔥 Tumhara valid AWS Production API URL
    const AWS_PRODUCTION_API = window.BACKEND_BASE_URL || 'https://cypr-api.duckdns.org'; 
    
    // 🛠️ Dynamic local API for mobile/LAN testing!
    let LOCAL_API = window.BACKEND_BASE_URL || 'http://localhost:8080';
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '') {
        LOCAL_API = `http://${hostname}:8080`;
    }
    
    // 🔗 Dynamically set base URL based on environment so requests go to the right server!
    window.CYPR_TECH_API_BASE = isLocalDev ? LOCAL_API : AWS_PRODUCTION_API;

    // CENTRALIZED AUTHENTICATION & SESSION SECURITY MANAGER
    window.CYPR_AUTH = {
        isRedirecting: false,
        SESSION_KEYS: [
            'cm_session_token', 'userId', 'cypr_user_id', 'userName', 'userEmail',
            'cm_user_name', 'cm_user_email', 'cm_user_initials', 'cm_user_avatar',
            'cm_user_credits', 'cm_user_subscription', 'cm_user_score', 'cypr_notifications',
            'cm_session_created_at', 'cm_last_activity', 'cm_remember_me'
        ],

        getToken: function() {
            return sessionStorage.getItem('cm_session_token') || localStorage.getItem('cm_session_token');
        },

        decodeJwtPayload: function(token) {
            if (!token || typeof token !== 'string') return null;
            try {
                const parts = token.split('.');
                if (parts.length !== 3) return null;
                let base64Url = parts[1];
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                while (base64.length % 4 !== 0) {
                    base64 += '=';
                }
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            } catch (e) {
                return null;
            }
        },

        isTokenExpired: function(token) {
            const payload = this.decodeJwtPayload(token);
            if (!payload || !payload.exp) return true;
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp <= currentTime;
        },

        updateActivity: function() {
            const now = Date.now().toString();
            if (localStorage.getItem('cm_session_token')) {
                localStorage.setItem('cm_last_activity', now);
            }
            if (sessionStorage.getItem('cm_session_token')) {
                sessionStorage.setItem('cm_last_activity', now);
            }
        },

        clearSession: function() {
            const keys = this.SESSION_KEYS;
            for (let i = 0; i < keys.length; i++) {
                localStorage.removeItem(keys[i]);
                sessionStorage.removeItem(keys[i]);
            }
        },

        validateSession: function() {
            const token = this.getToken();
            if (!token) return false;

            if (this.isTokenExpired(token)) {
                this.clearSession();
                return false;
            }

            const isRemember = (localStorage.getItem('cm_remember_me') === 'true') || !!localStorage.getItem('cm_session_token');
            const lastActivityStr = sessionStorage.getItem('cm_last_activity') || localStorage.getItem('cm_last_activity') || localStorage.getItem('cm_session_created_at');
            if (lastActivityStr) {
                const lastActivity = parseInt(lastActivityStr, 10);
                if (!isNaN(lastActivity)) {
                    const now = Date.now();
                    const inactivityLimit = isRemember ? (7 * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000);
                    if ((now - lastActivity) > inactivityLimit) {
                        this.clearSession();
                        return false;
                    }
                }
            }

            return true;
        },

        handleUnauthorized: function() {
            if (this.isRedirecting) return;
            this.isRedirecting = true;
            this.clearSession();

            const protectedPages = ['home.html', 'dashboard.html', 'profile.html', 'settings.html', 'activity-logs.html', 'admin.html', 'malwareanalysis.html', 'url-check.html', 'password-check.html'];
            const currentPath = window.location.pathname;
            const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

            if (protectedPages.includes(pageName)) {
                window.location.href = 'login.html?session_expired=true';
            } else {
                this.isRedirecting = false;
            }
        }
    };

    // GLOBAL FETCH INTERCEPTOR FOR SECURITY HARDENING
    const originalFetch = window.fetch;
    window.fetch = async function(resource, config = {}) {
        let resourceUrl = typeof resource === 'string' ? resource : (resource instanceof URL ? resource.toString() : '');
        
        if (resourceUrl.startsWith('/api/')) {
            resource = window.CYPR_TECH_API_BASE + resourceUrl;
            resourceUrl = resource;
        }
        
        if (resourceUrl.startsWith(window.CYPR_TECH_API_BASE)) {
            const token = window.CYPR_AUTH.getToken();
            if (token && window.CYPR_AUTH.validateSession()) {
                if (!config.headers) {
                    config.headers = {};
                }
                
                if (config.headers instanceof Headers) {
                    config.headers.set('Authorization', 'Bearer ' + token);
                } else if (Array.isArray(config.headers)) {
                    config.headers.push(['Authorization', 'Bearer ' + token]);
                } else {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
            }
        }

        const response = await originalFetch(resource, config);

        const isAuthEndpoint = resourceUrl.includes('/api/user/login') ||
                               resourceUrl.includes('/api/user/register') ||
                               resourceUrl.includes('/api/user/forgot-password') ||
                               resourceUrl.includes('/api/user/reset-password') ||
                               resourceUrl.includes('/api/user/verify') ||
                               resourceUrl.includes('/api/oauth/');

        if (resourceUrl.startsWith(window.CYPR_TECH_API_BASE) && !isAuthEndpoint) {
            if (response.status === 401) {
                window.CYPR_AUTH.handleUnauthorized();
            } else if (response.status !== 403 && response.ok) {
                window.CYPR_AUTH.updateActivity();
            }
        }

        return response;
    };
})();
