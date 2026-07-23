import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { PageLoader } from '../components/ui/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

// ─── Lazy-loaded Public Pages ─────────────────────────────────────────
const Home              = lazy(() => import('../pages/Home'))

// About
const Legacy            = lazy(() => import('../pages/about/Legacy'))
const Leadership        = lazy(() => import('../pages/about/Leadership'))
const Milestones        = lazy(() => import('../pages/about/Milestones'))
const VisionMission     = lazy(() => import('../pages/about/VisionMission'))
const CompanyProfile    = lazy(() => import('../pages/about/CompanyProfile'))

// Projects
const AllProjects       = lazy(() => import('../pages/projects/AllProjects'))
const OngoingProjects   = lazy(() => import('../pages/projects/Ongoing'))
const CompletedProjects = lazy(() => import('../pages/projects/Completed'))
const ProjectDetail     = lazy(() => import('../pages/projects/ProjectDetail'))

// Media
const PressEvents       = lazy(() => import('../pages/media/PressEvents'))
const PressCoverageDetail = lazy(() => import('../pages/media/PressCoverageDetail'))
const Announcements     = lazy(() => import('../pages/media/Announcements'))
const Events            = lazy(() => import('../pages/media/Events'))
const EventDetail       = lazy(() => import('../pages/media/EventDetail'))
const Blogs             = lazy(() => import('../pages/media/Blogs'))
const BlogDetail        = lazy(() => import('../pages/media/BlogDetail'))
const Awards            = lazy(() => import('../pages/media/Awards'))
const AwardDetail       = lazy(() => import('../pages/media/AwardDetail'))
const Testimonials      = lazy(() => import('../pages/media/Testimonials'))
const Newsletter        = lazy(() => import('../pages/media/Newsletter'))
const News              = lazy(() => import('../pages/media/News'))
const NewsDetail        = lazy(() => import('../pages/media/NewsDetail'))

// Other public
const Careers           = lazy(() => import('../pages/Careers'))
const JobDetail         = lazy(() => import('../pages/JobDetail'))
const Contact           = lazy(() => import('../pages/Contact'))
const PrivacyPolicy     = lazy(() => import('../pages/PrivacyPolicy'))
const Terms             = lazy(() => import('../pages/Terms'))
const NotFound          = lazy(() => import('../pages/NotFound'))

// ─── Lazy-loaded Admin Pages ──────────────────────────────────────────
const AdminLogin      = lazy(() => import('../admin/AdminLogin'))
const AdminDashboard  = lazy(() => import('../admin/AdminDashboard'))
const AdminLayout     = lazy(() => import('../admin/AdminLayout'))
const ProjectList     = lazy(() => import('../admin/projects/ProjectList'))
const ProjectForm     = lazy(() => import('../admin/projects/ProjectForm'))
const ProjectImages   = lazy(() => import('../admin/projects/ProjectImages'))
const NewsList        = lazy(() => import('../admin/media/NewsList'))
const NewsForm        = lazy(() => import('../admin/media/NewsForm'))
const EventList       = lazy(() => import('../admin/media/EventList'))
const EventForm       = lazy(() => import('../admin/media/EventForm'))
const JobList         = lazy(() => import('../admin/careers/JobList'))
const JobForm         = lazy(() => import('../admin/careers/JobForm'))
const EnquiryList     = lazy(() => import('../admin/enquiries/EnquiryList'))
const LocationList    = lazy(() => import('../admin/locations/LocationList'))

// ─── Protected Route Wrapper ──────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <PageLoader />
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return children
}

// ─── Suspense Wrapper ─────────────────────────────────────────────────
const withSuspense = (component) => (
  <Suspense fallback={<PageLoader />}>{component}</Suspense>
)

const router = createBrowserRouter([
  // ── Home ──────────────────────────────────────────────────────────
  {
    element: <Layout><Suspense fallback={<PageLoader />}><Home /></Suspense></Layout>,
    path: '/',
  },

  // ── About ─────────────────────────────────────────────────────────
  {
    element: withSuspense(<Layout><Legacy /></Layout>),
    path: '/about/legacy',
  },
  {
    element: withSuspense(<Layout><Leadership /></Layout>),
    path: '/about/leadership',
  },
  {
    element: withSuspense(<Layout><Milestones /></Layout>),
    path: '/about/milestones',
  },
  {
    element: withSuspense(<Layout><VisionMission /></Layout>),
    path: '/about/vision-mission',
  },
  // Legacy redirect
  {
    element: withSuspense(<Layout><CompanyProfile /></Layout>),
    path: '/about/company-profile',
  },

  // ── Projects ──────────────────────────────────────────────────────
  {
    element: withSuspense(<Layout><AllProjects /></Layout>),
    path: '/projects',
  },
  {
    element: withSuspense(<Layout><OngoingProjects /></Layout>),
    path: '/projects/ongoing',
  },
  {
    element: withSuspense(<Layout><CompletedProjects /></Layout>),
    path: '/projects/completed',
  },
  {
    element: withSuspense(<Layout><ProjectDetail /></Layout>),
    path: '/projects/:slug',
  },

  // ── Media ─────────────────────────────────────────────────────────
  {
    element: withSuspense(<Layout><PressEvents /></Layout>),
    path: '/media/press-coverage',
  },
  {
    element: withSuspense(<Layout><PressCoverageDetail /></Layout>),
    path: '/media/press-coverage/:slug',
  },
  {
    element: withSuspense(<Layout><Announcements /></Layout>),
    path: '/media/announcements',
  },
  {
    element: withSuspense(<Layout><Events /></Layout>),
    path: '/media/events',
  },
  {
    element: withSuspense(<Layout><EventDetail /></Layout>),
    path: '/media/events/:slug',
  },
  {
    element: withSuspense(<Layout><Blogs /></Layout>),
    path: '/media/blogs',
  },
  {
    element: withSuspense(<Layout><BlogDetail /></Layout>),
    path: '/media/blogs/:slug',
  },
  {
    element: withSuspense(<Layout><Awards /></Layout>),
    path: '/media/awards',
  },
  {
    element: withSuspense(<Layout><AwardDetail /></Layout>),
    path: '/media/awards/:slug',
  },
  {
    element: withSuspense(<Layout><Testimonials /></Layout>),
    path: '/media/testimonials',
  },
  {
    element: withSuspense(<Layout><Newsletter /></Layout>),
    path: '/media/newsletter',
  },
  // Legacy news routes
  {
    element: withSuspense(<Layout><News /></Layout>),
    path: '/media/news',
  },
  {
    element: withSuspense(<Layout><NewsDetail /></Layout>),
    path: '/media/news/:slug',
  },

  // ── Careers & Contact ─────────────────────────────────────────────
  {
    element: withSuspense(<Layout><Careers /></Layout>),
    path: '/careers',
  },
  {
    element: withSuspense(<Layout><JobDetail /></Layout>),
    path: '/careers/:id',
  },
  {
    element: withSuspense(<Layout><Contact /></Layout>),
    path: '/contact',
  },

  // ── Legal ─────────────────────────────────────────────────────────
  {
    element: withSuspense(<Layout><PrivacyPolicy /></Layout>),
    path: '/privacy-policy',
  },
  {
    element: withSuspense(<Layout><Terms /></Layout>),
    path: '/terms',
  },

  // ── Admin ─────────────────────────────────────────────────────────
  {
    element: withSuspense(<AdminLogin />),
    path: '/admin/login',
  },
  {
    element: (
      <ProtectedRoute>
        {withSuspense(<AdminLayout />)}
      </ProtectedRoute>
    ),
    path: '/admin',
    children: [
      { index: true, element: withSuspense(<AdminDashboard />) },
      { path: 'projects', element: withSuspense(<ProjectList />) },
      { path: 'projects/new', element: withSuspense(<ProjectForm />) },
      { path: 'projects/:id/edit', element: withSuspense(<ProjectForm />) },
      { path: 'projects/:id/images', element: withSuspense(<ProjectImages />) },
      { path: 'news', element: withSuspense(<NewsList />) },
      { path: 'news/new', element: withSuspense(<NewsForm />) },
      { path: 'news/:id/edit', element: withSuspense(<NewsForm />) },
      { path: 'events', element: withSuspense(<EventList />) },
      { path: 'events/new', element: withSuspense(<EventForm />) },
      { path: 'events/:id/edit', element: withSuspense(<EventForm />) },
      { path: 'careers', element: withSuspense(<JobList />) },
      { path: 'careers/new', element: withSuspense(<JobForm />) },
      { path: 'careers/:id/edit', element: withSuspense(<JobForm />) },
      { path: 'locations', element: withSuspense(<LocationList />) },
      { path: 'enquiries', element: withSuspense(<EnquiryList />) },
    ],
  },

  // ── 404 ───────────────────────────────────────────────────────────
  {
    element: withSuspense(<Layout><NotFound /></Layout>),
    path: '*',
  },
])

export default router
