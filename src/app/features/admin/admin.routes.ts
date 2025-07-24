import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../admin/admin-layout/admin-layout').then(m => m.AdminLayout),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('../admin/pages/dashboard/dashboard').then(m => m.Dashboard)
            }
        ]
    }
]