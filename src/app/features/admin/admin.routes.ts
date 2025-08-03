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
            }
        ]
    }
]