import { Routes } from "@angular/router";
import { loggedInGuard } from "../../shared/guards/logged-in-guard";

export const MAIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../main/main-layout/main-layout').then(m => m.MainLayout),
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('../main/pages/home/home').then(m => m.Home)
            },
            {
                path: 'auth/register',
                loadComponent: () => import('../main/pages/auth/register/register').then(m => m.Register),
                canActivate: [loggedInGuard]
            },
            {
                path: 'auth/forgot-password',
                loadComponent: () => import('../main/pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword),
                canActivate: [loggedInGuard]
            },
            {
                path: 'collections/:name',
                loadComponent: () => import('../main/pages/product-list/product-list').then(m => m.ProductList)
            },
            {
                path: 'products/:id',
                loadComponent: () => import('../main/pages/product-detail/product-detail').then(m => m.ProductDetail)
            }
        ]

    }
]