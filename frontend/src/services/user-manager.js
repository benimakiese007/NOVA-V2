/**
 * NewKet User Manager
 * Handles user/vendor data for the Admin CMS and Platform.
 */
const UserManager = {
    data: [],
    _initialized: false,

    async init() {
        if (!window.SupabaseAdapter) {
            console.error('[UserManager] SupabaseAdapter not found.');
            return;
        }

        console.log('[UserManager] Fetching users...');
        try {
            // Fetch all users from the 'users' table
            const users = await SupabaseAdapter.fetch('users');
            this.data = users || [];
            this._initialized = true;
            console.log(`[UserManager] Loaded ${this.data.length} users.`);
        } catch (error) {
            console.error('[UserManager] Error initializing users:', error);
            this.data = [];
        }
    },

    getUsers() {
        return this.data;
    },

    getUser(id) {
        return this.data.find(u => u.id === id || u.email === id);
    },

    async updateStatus(userId, status) {
        const client = SupabaseAdapter.getClient();
        if (!client) return { error: 'Supabase not initialized' };

        console.log(`[UserManager] Updating status for ${userId} to ${status}`);
        const result = await SupabaseAdapter.update('users', userId, { status });
        
        if (result) {
            // Update local cache
            const index = this.data.findIndex(u => u.id === userId);
            if (index !== -1) this.data[index].status = status;
            return { success: true };
        }
        return { error: 'Update failed' };
    },

    async deleteUser(userId) {
        console.log(`[UserManager] Deleting user ${userId}`);
        const success = await SupabaseAdapter.delete('users', userId);
        if (success) {
            this.data = this.data.filter(u => u.id !== userId);
            return true;
        }
        return false;
    }
};

window.UserManager = UserManager;
