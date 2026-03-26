import { defineConfig } from 'vite';

export default defineConfig({
  // Vite va résoudre le build à la racine par défaut
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Root pages
        main: './index.html',
        catalog: './pages/catalog.html',
        product: './pages/product.html',
        publish: './pages/publish.html',
        cart: './pages/cart.html',
        login: './pages/login.html',
        dashboard: './pages/vendor-dashboard.html',
        customer: './pages/customer-dashboard.html',
        settings: './pages/settings.html',
        shops: './pages/shops.html',
        shop: './pages/shop.html',
        notifications: './pages/notifications.html',
        favorites: './pages/favorites.html',
        forum: './pages/forum.html',
        about: './pages/about.html',
        privacy: './pages/privacy.html',
        terms: './pages/terms.html',
        error404: './pages/404.html',
        
        // Admin pages
        admin_dashboard: './admin/dashboard.html',
        admin_clients: './admin/clients.html',
        admin_client_details: './admin/client-details.html',
        admin_diagnostics: './admin/diagnostics.html',
        admin_livraisons: './admin/livraisons.html',
        admin_notifications: './admin/notifications-admin.html',
        admin_orders: './admin/orders.html',
        admin_products: './admin/products.html',
        admin_profits: './admin/profits.html',
        admin_promos: './admin/promos.html',
        admin_rapports: './admin/rapports.html',
        admin_reviews: './admin/reviews.html',
        admin_settings: './admin/settings.html',
        admin_support: './admin/support.html',
        admin_user_details: './admin/user-details.html',
        admin_user_stats: './admin/user-stats.html',
        admin_user: './admin/user.html'
      }
    }
  }
});
