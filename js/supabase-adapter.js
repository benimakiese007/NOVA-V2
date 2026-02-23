/**
 * Supabase Adapter for NewKet
 * Bridges the gap between the existing managers and the Supabase database.
 */
window.SupabaseAdapter = {
    getClient() {
        if (!window.supabaseClient) {
            console.error('Supabase client not initialized.');
            return null;
        }
        return window.supabaseClient;
    },

    async fetch(table, select = '*') {
        const client = this.getClient();
        if (!client) return [];

        const { data, error } = await client
            .from(table)
            .select(select);

        if (error) {
            console.error(`Error fetching from ${table}:`, error);
            return [];
        }
        return data;
    },

    async insert(table, item) {
        const client = this.getClient();
        if (!client) return null;

        const { data, error } = await client
            .from(table)
            .insert(item)
            .select();

        if (error) {
            console.error(`Error inserting into ${table}:`, error);
            return null;
        }
        return data && data.length > 0 ? data[0] : null;
    },

    async update(table, id, updates, idColumn = 'id') {
        const client = this.getClient();
        if (!client) return null;

        const { data, error } = await client
            .from(table)
            .update(updates)
            .eq(idColumn, id)
            .select();

        if (error) {
            console.error(`Error updating items in ${table}:`, error);
            return null;
        }
        return data && data.length > 0 ? data[0] : null;
    },

    async delete(table, id, idColumn = 'id') {
        const client = this.getClient();
        if (!client) return false;

        const { error } = await client
            .from(table)
            .delete()
            .eq(idColumn, id);

        if (error) {
            console.error(`Error deleting from ${table}:`, error);
            return false;
        }
        return true;
    },

    async upsert(table, item, onConflict = 'id') {
        const client = this.getClient();
        if (!client) return null;

        const { data, error } = await client
            .from(table)
            .upsert(item, { onConflict })
            .select();

        if (error) {
            console.error(`Error upserting into ${table}:`, error);
            return null;
        }
        return data && data.length > 0 ? data[0] : null;
    }
};

