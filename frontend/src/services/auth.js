/* newket EMarket Auth Manager */

const AuthManager = {
    role: null,
    status: null, // NewKet: Added status for KYC (pending, approved, rejected)
    _authChecking: true, // Prevents redirect loops while checking auth

    async init() {
        this._authChecking = true;
        if (window.supabaseClient) {
            window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
                console.log('Auth State Change:', event);

                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    const user = session.user;
                    const role = user.user_metadata.role || 'customer';
                    const email = user.email;

                    this.role = role;
                    localStorage.setItem('newketRole', role);
                    localStorage.setItem('newketUserEmail', email);
                    localStorage.setItem('newketUserId', user.id);

                    const avatarUrl = user.user_metadata.avatar_url || user.user_metadata.picture || null;
                    if (avatarUrl) localStorage.setItem('newketUserAvatar', avatarUrl);

                    const status = await this.fetchUserStatus(email);
                    this.status = status;
                    localStorage.setItem('newketUserStatus', status);

                    this.enforcePermissions();

                    if (window.CartManager) CartManager.syncFromSupabase();
                    if (window.FavoritesManager) FavoritesManager.syncFromSupabase();
                } else if (event === 'SIGNED_OUT') {
                    this.role = null;
                    this.status = null;
                    this.clearSession();
                    this.enforcePermissions();
                    if (window.location.pathname.includes('/admin/') || window.location.pathname.includes('customer-dashboard')) {
                        window.location.href = '/index.html';
                    }
                }
            });

            const { data } = await window.supabaseClient.auth.getSession();
            if (data.session) {
                const user = data.session.user;
                this.role = user.user_metadata.role || 'customer';
                this.status = await this.fetchUserStatus(user.email);

                localStorage.setItem('newketRole', this.role);
                localStorage.setItem('newketUserStatus', this.status);
                localStorage.setItem('newketUserId', user.id);
            } else {
                this.role = null;
                this.status = null;
                this.clearSession();
            }
        }

        this._authChecking = false;
        this.enforcePermissions();
        this.updateAccountLink();
        this.checkWelcomeBonus();
    },

    clearSession() {
        localStorage.removeItem('newketRole');
        localStorage.removeItem('newketUserEmail');
        localStorage.removeItem('newketUserId');
        localStorage.removeItem('newketUserAvatar');
        localStorage.removeItem('newketUserStatus');
        sessionStorage.removeItem('adminAuth');
    },

    checkWelcomeBonus() {
        if (localStorage.getItem('newketWelcomeBonus') === 'true') {
            if (typeof showToast === 'function') {
                showToast('Bienvenue ! Profitez de -5% avec le code BIENVENUE', 'success');
            }
            localStorage.removeItem('newketWelcomeBonus');
        }
        if (localStorage.getItem('newketSupplierBonus') === 'true') {
            if (typeof showToast === 'function') {
                showToast('Bienvenue ! 0% de commission sur votre première vente', 'success');
            }
            localStorage.removeItem('newketSupplierBonus');
        }
    },

    getRole() {
        return this.role;
    },

    async fetchUserStatus(email) {
        if (!window.supabaseClient) return 'pending';
        try {
            const { data, error } = await window.supabaseClient
                .from('users')
                .select('status')
                .eq('email', email)
                .maybeSingle();
            if (error) throw error;
            return data?.status || 'pending';
        } catch (err) {
            console.error('Error fetching user status:', err);
            return 'pending';
        }
    },

    setRole(role) {
        this.role = role;
        localStorage.setItem('newketRole', role);
        this.enforcePermissions();
        this.updateAccountLink();

        // Dispatch event
        window.dispatchEvent(new CustomEvent('roleChanged', { detail: { role } }));
    },

    async logout() {
        if (window.supabaseClient) {
            await window.supabaseClient.auth.signOut();
        }
        this.role = null;
        this.status = null;
        this.clearSession();
        window.location.href = '/index.html';
    },

    async adminLogin(email, password) {
        if (!window.supabaseClient) return { error: 'Système non initialisé' };

        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) return { error: error.message };

        const user = data.user;
        const role = user.user_metadata.role || 'customer';

        if (role !== 'admin') {
            await window.supabaseClient.auth.signOut();
            return { error: 'Accès non autorisé. Identité admin requise.' };
        }

        return { success: true };
    },

    enforcePermissions() {
        if (this._authChecking) return;

        const body = document.body;
        body.classList.add(`role-${this.role}`);
        if (this.status) body.classList.add(`status-${this.status}`);

        // Mobile Nav Visibility
        if (this.role === 'supplier' || this.role === 'admin') {
            document.querySelectorAll('.vendor-nav').forEach(el => el.style.display = 'flex');
            document.querySelectorAll('.customer-nav').forEach(el => el.style.display = 'none');
        } else {
            document.querySelectorAll('.vendor-nav').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.customer-nav').forEach(el => el.style.display = 'flex');
        }

        if (this.role === 'supplier' || this.role === 'admin') {
            const isAdmin = this.role === 'admin';

            document.querySelectorAll('.sidebar-link').forEach(link => {
                const text = link.textContent.trim();
                if (isAdmin) {
                    if (text.includes('Mes Produits')) link.innerHTML = '<iconify-icon icon="solar:box-bold" width="20"></iconify-icon> Gestion Produits';
                    if (text.includes('Commandes') && text === 'Commandes') link.innerHTML = '<iconify-icon icon="solar:cart-large-bold" width="20"></iconify-icon> Gestion Commandes';
                    if (text.includes('Mes Clients')) link.innerHTML = '<iconify-icon icon="solar:users-group-rounded-bold" width="20"></iconify-icon> Clients Plateforme';
                    if (text.includes('Calcul des Profits')) link.innerHTML = '<iconify-icon icon="solar:wad-of-money-bold" width="20"></iconify-icon> Profits Plateforme';
                    if (text === 'Utilisateurs') link.innerHTML = '<iconify-icon icon="solar:user-bold" width="20"></iconify-icon> Fournisseurs Plateforme';
                }
            });

            document.querySelectorAll('.admin-only').forEach(el => {
                el.style.display = isAdmin ? '' : 'none';
            });
        }

        if (this.role === 'admin') {
            // Admin has access to everything
            document.querySelectorAll('.publish-btn, .supplier-only, .admin-only, #headerDashboardLink').forEach(el => {
                el.style.display = '';
            });
            return;
        }

        if (this.role === 'supplier') {
            document.querySelectorAll('.cart-trigger, .add-to-cart-btn, #cart-count').forEach(el => {
                el.style.display = '';
            });

            // KYC Enforcement
            const isApproved = this.status === 'approved';
            const isPending = this.status === 'pending' || !this.status;

            if (isPending) {
                this.showPendingNotice();

                // Hide publish links for unverified suppliers (but keep dashboard accessible)
                document.querySelectorAll('.publish-btn, .supplier-only').forEach(el => {
                    el.style.display = 'none';
                });

                const path = window.location.pathname;
                if (path.includes('publish.html')) {
                    window.location.href = '/index.html';
                }
            } else if (this.status === 'rejected') {
                this.showRejectedNotice();
            }

            if (window.location.pathname.includes('/admin/')) {
                window.location.href = '/pages/vendor-dashboard.html';
            }
        }

        if (this.role === 'customer') {
            document.querySelectorAll('.cart-trigger, .add-to-cart-btn, #cart-count').forEach(el => {
                el.style.display = '';
            });
            document.querySelectorAll('.publish-btn, .supplier-only, #headerDashboardLink').forEach(el => {
                el.style.display = 'none';
            });

            if (window.location.pathname.includes('/admin/')) {
                window.location.href = '/pages/customer-dashboard.html';
            }

            if (window.location.pathname.includes('publish.html') || window.location.pathname.includes('vendor-dashboard.html')) {
                window.location.href = '/index.html';
            }
        }

        if (this.role === null) {
            const path = window.location.pathname;
            const isAdminFolder = path.includes('/admin/');
            const isLoginPage = path.endsWith('/admin/') || path.endsWith('index.html');

            if (isAdminFolder && !isLoginPage) {
                window.location.href = '/index.html';
            }
        }
    },

    updateAccountLink() {
        const accountLinks = document.querySelectorAll('#accountLink, #mobileBottomAccountCustomer, #mobileBottomAccountVendor');
        if (accountLinks.length === 0) return;

        const avatarUrl = localStorage.getItem('newketUserAvatar');

        accountLinks.forEach(accountLink => {
            const icon = accountLink.querySelector('iconify-icon');

            if (avatarUrl) {
                if (icon) icon.style.display = 'none';
                let img = accountLink.querySelector('.nav-user-avatar');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'nav-user-avatar w-6 h-6 sm:w-full sm:h-full object-cover rounded-full';
                    accountLink.appendChild(img);
                }
                img.src = avatarUrl;
                img.style.display = 'block';
            } else {
                if (icon) icon.style.display = 'block';
                const img = accountLink.querySelector('.nav-user-avatar');
                if (img) img.style.display = 'none';
            }

            if (this.role === 'admin') {
                accountLink.href = 'settings.html';
                accountLink.title = 'Paramètres';
                if (icon) {
                    icon.setAttribute('icon', 'solar:user-bold');
                    icon.className = 'text-white';
                }
                accountLink.classList.add('bg-gray-900', 'text-white');
                accountLink.classList.remove('hover:bg-gray-50');

                let badge = accountLink.querySelector('.role-badge');
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'role-badge absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white';
                    badge.title = 'Admin';
                    accountLink.appendChild(badge);
                }
                badge.style.display = 'block';

                if (accountLink.id.includes('mobileBottomAccount')) {
                    accountLink.classList.add('text-gray-900');
                    accountLink.classList.remove('text-gray-400');
                    if (accountLink.querySelector('iconify-icon')) {
                        accountLink.querySelector('iconify-icon').setAttribute('icon', 'solar:user-bold');
                    }
                }

            } else if (this.role === 'supplier') {
                accountLink.href = 'settings.html';
                accountLink.title = 'Paramètres';
                if (icon) {
                    icon.setAttribute('icon', 'solar:user-bold');
                    icon.className = 'text-gray-900';
                }
                accountLink.classList.add('bg-gray-100');
                accountLink.classList.remove('hover:bg-gray-50');
                let badge = accountLink.querySelector('.role-badge');
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'role-badge absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white';
                    badge.title = 'Vendeur';
                    accountLink.appendChild(badge);
                }
                badge.style.display = 'block';

            } else if (this.role === 'customer') {
                accountLink.href = 'settings.html';
                accountLink.title = 'Paramètres';
                if (icon) {
                    icon.setAttribute('icon', 'solar:user-bold');
                    icon.className = 'text-gray-900';
                }
                accountLink.classList.add('bg-gray-100');
                accountLink.classList.remove('hover:bg-gray-50');
                let badge = accountLink.querySelector('.role-badge');
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'role-badge absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white';
                    badge.title = 'Connecté';
                    accountLink.appendChild(badge);
                }
                badge.style.display = 'block';

                if (accountLink.id.includes('mobileBottomAccount')) {
                    accountLink.classList.add('text-gray-900');
                    accountLink.classList.remove('text-gray-400');
                    if (accountLink.querySelector('iconify-icon')) {
                        accountLink.querySelector('iconify-icon').setAttribute('icon', 'solar:user-bold');
                    }
                }

            } else {
                accountLink.href = 'login.html';
                accountLink.title = 'Se connecter';
                if (icon) {
                    icon.setAttribute('icon', 'solar:user-linear');
                    icon.className = 'text-gray-600';
                }
                accountLink.classList.remove('bg-gray-900', 'bg-gray-100', 'text-white');
                accountLink.classList.add('hover:bg-gray-50');
                const badge = accountLink.querySelector('.role-badge');
                if (badge) badge.style.display = 'none';
            }
        });
    },

    showPendingNotice() {
        if (document.getElementById('kyc-notice')) return;
        const notice = document.createElement('div');
        notice.id = 'kyc-notice';
        notice.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[100] bg-yellow-50 border border-yellow-200 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-slide-up';
        notice.innerHTML = `
            <div class="w-12 h-12 bg-yellow-400/20 text-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <iconify-icon icon="solar:clock-circle-bold" width="24"></iconify-icon>
            </div>
            <div class="flex-1">
                <div class="text-sm font-black text-gray-900 leading-tight">Profil vendeur en attente</div>
                <div class="text-[10px] text-gray-500 font-medium mb-2">Veuillez finaliser votre dossier pour vendre.</div>
                <a href="/pages/seller-onboarding.html" class="text-[11px] font-bold text-yellow-600 underline">Compléter mon profil</a>
            </div>
            <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-gray-900">
                <iconify-icon icon="solar:close-circle-bold"></iconify-icon>
            </button>
        `;
        document.body.appendChild(notice);
    },

    showRejectedNotice() {
        if (document.getElementById('kyc-notice')) return;
        const notice = document.createElement('div');
        notice.id = 'kyc-notice';
        notice.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[100] bg-red-50 border border-red-200 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-slide-up';
        notice.innerHTML = `
            <div class="w-12 h-12 bg-red-400/20 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <iconify-icon icon="solar:danger-bold" width="24"></iconify-icon>
            </div>
            <div class="flex-1">
                <div class="text-sm font-black text-gray-900 leading-tight">Profil vendeur rejeté</div>
                <div class="text-[10px] text-gray-500 font-medium mb-2">Veuillez contacter le support pour plus d'infos.</div>
                <a href="/pages/seller-onboarding.html" class="text-[11px] font-bold text-red-600 underline">Soumettre à nouveau</a>
            </div>
            <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-gray-900">
                <iconify-icon icon="solar:close-circle-bold"></iconify-icon>
            </button>
        `;
        document.body.appendChild(notice);
    }
};

window.AuthManager = AuthManager;
