import { Routes } from "@angular/router";
import { adminGuardGuard } from "../../shared/guards/admin-guard-guard";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../admin/admin-layout/admin-layout').then(m => m.AdminLayout),
        canActivate: [adminGuardGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('../admin/pages/dashboard/dashboard').then(m => m.Dashboard)
            },
            {
                path: 'ui-kid/table/tbProducts',
                loadComponent: () => import('../admin/pages/products-management/products-management').then(m => m.ProductsManagement)
            },
            {
                path: 'ui-kid/table/tbUsers',
                loadComponent: () => import('../admin/pages/users-management/users-management').then(m => m.UsersManagement)
            }
        ]
    }
]