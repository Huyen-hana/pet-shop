import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        loadChildren: () => import('../app/features/main/main.routes').then(m => m.MAIN_ROUTES)
    },
    {
        path: 'checkout',
        loadChildren: () => import('./features/checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: 'error',
        children: [
            {
                path: '404',
                loadComponent: () => import('./shared/pages/not-found/not-found').then(m => m.NotFound),
                data: { preload: true }

            },
            {
                path: '500',
                loadComponent: () => import('./shared/pages/server-error/server-error').then(m => m.ServerError)
            },
            {
                path: 'no-connection',
                loadComponent: () => import('./shared/pages/no-connection/no-connection').then(m => m.NoConnection)
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./shared/pages/not-found/not-found').then(m => m.NotFound)
    }

];
