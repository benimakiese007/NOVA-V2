import { defineConfig } from 'vite';

export default defineConfig({
  // Vite va résoudre le build à la racine par défaut
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Root pages
        main: './index.html',
        catalog: './src/pages/catalog.html',
        product: './src/pages/product.html',
        publish: './src/pages/publish.html',
        cart: './src/pages/cart.html',
        login: './src/pages/login.html',
        dashboard: './src/pages/vendor-dashboard.html',
        customer: './src/pages/customer-dashboard.html',
        settings: './src/pages/settings.html',
        shops: './src/pages/shops.html',
        shop: './src/pages/shop.html',
        notifications: './src/pages/notifications.html',
        favorites: './src/pages/favorites.html',
        forum: './src/pages/forum.html',
        about: './src/pages/about.html',
        privacy: './src/pages/privacy.html',
        terms: './src/pages/terms.html',
        error404: './src/pages/404.html',
        
        // Admin pages
        admin_dashboard: './src/pages/admin/dashboard.html',
        admin_clients: './src/pages/admin/clients.html',
        admin_client_details: './src/pages/admin/client-details.html',
        admin_diagnostics: './src/pages/admin/diagnostics.html',
        admin_livraisons: './src/pages/admin/livraisons.html',
        admin_notifications: './src/pages/admin/notifications-admin.html',
        admin_orders: './src/pages/admin/orders.html',
        admin_products: './src/pages/admin/products.html',
        admin_profits: './src/pages/admin/profits.html',
        admin_promos: './src/pages/admin/promos.html',
        admin_rapports: './src/pages/admin/rapports.html',
        admin_reviews: './src/pages/admin/reviews.html',
        admin_settings: './src/pages/admin/settings.html',
        admin_support: './src/pages/admin/support.html',
        admin_user_details: './src/pages/admin/user-details.html',
        admin_user_stats: './src/pages/admin/user-stats.html',
        admin_user: './src/pages/admin/user.html'
      }
    }
  }
});
