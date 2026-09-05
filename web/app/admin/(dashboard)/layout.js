import AdminGuard from '@/components/layout/AdminGuard'
import AdminShell from '@/admin/AdminLayout'

/* Auth gate + admin chrome. The login route sits outside this group so it
   renders without the sidebar and without the guard redirect loop. */
export default function DashboardLayout({ children }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  )
}
