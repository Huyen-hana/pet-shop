import { Routes } from "@angular/router";

export const CHECKOUT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../checkout/checkout-layout/checkout-layout').then(m => m.CheckoutLayout),
        children: [
            {
                path: '',
                redirectTo: 'confirmation',
                pathMatch: 'full'
            },
            {
                path: 'confirmation',
                loadComponent: () => import('../checkout/pages/confirmation/confirmation').then(m => m.Confirmation)
            }
        ]
    }
]