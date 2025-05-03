import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import CompanyDescription from './components/CompanyDescription'
import AllCompanies from './components/AllCompanies'
import ResumeTips from './components/ResumeTips'
import InterviewTips from './components/InterviewTips'
import GDTipsAndMocks from './components/GDTipsAndMocks'
import AboutUs from './components/AboutUs'
import ForgetPassword from './components/auth/ForgetPassword'
import ResetPassword from './components/auth/ResetPassword'
import JobSetup from './components/admin/JobSetup'
import DeleteJob from './components/admin/DeleteJob'
import DeleteCompany from './components/admin/DeleteCompany'
import ScrollToTop from './components/shared/ScrollToTop'

const AppLayout = ({ children }) => {
  return (
    <>
      
      <ScrollToTop />
      {children}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout><Home /></AppLayout>
  },
  {
    path:"/login",
    element:<AppLayout><Login /></AppLayout>
  },
  {
    path:"/signup",
    element:<AppLayout><Signup /></AppLayout>
  },
  {
    path:"/forget-password",
    element:<AppLayout><ForgetPassword/></AppLayout>
  },
  {
    path:"/reset-password/:token",
    element:<AppLayout><ResetPassword/></AppLayout>
  },
  {
    path: "/jobs",
    element:<AppLayout><Jobs /></AppLayout> 
  },
  {
    path: "/description/:id",
    element:<AppLayout><JobDescription /></AppLayout> 
  },
  {
    path:"/companies",
    element:<AppLayout><AllCompanies /></AppLayout> 
  },
  {
    path:"/cdescription/:id",
    element:<AppLayout><CompanyDescription /></AppLayout> 
  },
  {
    path: "/browse",
    element:<AppLayout><Browse /></AppLayout> 
  },
  {
    path:"/career-tips/resume-tips",
    element:<AppLayout><ResumeTips/></AppLayout>
  },
  {
    path:"/career-tips/interview-tips",
    element:<AppLayout><InterviewTips/></AppLayout>
  },
  {
    path:"/career-tips/gd-tips",
    element:<AppLayout><GDTipsAndMocks/></AppLayout>
  },
  {
    path:"/aboutus",
    element:<AppLayout><AboutUs/></AppLayout>
  },
  
  {
    path: "/profile",
    element:<AppLayout> <Profile /></AppLayout>
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <AppLayout><ProtectedRoute><Companies/></ProtectedRoute></AppLayout>
  },
  {
    path:"/admin/companies/create",
    element:<AppLayout><ProtectedRoute><CompanyCreate/></ProtectedRoute> </AppLayout> 
  },
  {
    path:"/admin/companies/:id",
    element:<AppLayout><ProtectedRoute><CompanySetup/></ProtectedRoute> </AppLayout>
  },
  {
    path:"/admin/jobs/:id",
    element:<AppLayout><ProtectedRoute><JobSetup/></ProtectedRoute> </AppLayout>
  },
  {
    path:"/admin/jobs",
    element:<AppLayout><ProtectedRoute><AdminJobs/></ProtectedRoute> </AppLayout>
  },
  {
    path:"/admin/jobs/create",
    element:<AppLayout><ProtectedRoute><PostJob/></ProtectedRoute> </AppLayout>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<AppLayout><ProtectedRoute><Applicants/></ProtectedRoute> </AppLayout>
  },
  {
    path: "/admin/jobs/:id/delete",
    element: <AppLayout><ProtectedRoute><DeleteJob/></ProtectedRoute></AppLayout>
},
  {
    path: "/admin/companies/:id/delete",
    element: <AppLayout><ProtectedRoute><DeleteCompany/></ProtectedRoute></AppLayout>
},


])
function App() {

  return (
    <div>
      
      <RouterProvider router={appRouter}/>
      
      
    </div>
  )
}

export default App
