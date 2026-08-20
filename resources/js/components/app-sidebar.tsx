import { Link, usePage } from '@inertiajs/react';
import {
    Box,
    CreditCard,
    LayoutGrid,
    ShoppingCart,
    Tags,
    Users,
    BarChart3,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props;

    const isAdmin = auth.user?.role === 'admin';

    const dashboardUrl = isAdmin
        ? '/admin/dashboard'
        : '/dashboard';

    /**
     * Menu utama untuk admin
     */
    const adminNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Produk',
            href: '/admin/products',
            icon: Box,
        },
        {
            title: 'Kategori',
            href: '/admin/categories',
            icon: Tags,
        },
        {
            title: 'Pesanan',
            href: '/admin/orders',
            icon: ShoppingCart,
        },
        {
            title: 'Pembayaran',
            href: '/admin/payments',
            icon: CreditCard,
        },
        {
            title: 'User',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Penjualan',
            href: '/admin/reports/sales',
            icon: BarChart3,
        },
    ];

    /**
     * Menu untuk user biasa
     */
    const userNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    const mainNavItems = isAdmin
        ? adminNavItems
        : userNavItems;

    const footerNavItems: NavItem[] = [
        
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                        >
                            <Link
                                href={dashboardUrl}
                                prefetch
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter
                    items={footerNavItems}
                    className="mt-auto"
                />

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}