import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import ClientLayout from './layout/client'
import AdminLayout from './layout/admin'
import { ThemeProvider } from './providers/theme-provider'
import { Toaster } from "@/components/ui/sonner"

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        let page = pages[`./Pages/${name}.tsx`]
        page.default.layout = (page) => {
            if (name.startsWith('Client/')) {
                return <ClientLayout children={page} />
            }
            else if (name.startsWith('Admin/')) {
                return <AdminLayout children={page} />
            }
            return page
        }
        return page
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <>
                    <App {...props} />
                    <Toaster />
                </>
            </ThemeProvider>
        )
    },
})