// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Register from "@material-ui/icons/GroupAdd";
import Login from "@material-ui/icons/LockOpen";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/Profile.jsx";
import Posts from "views/Lists/Posts";
import Post from "views/Lists/Post";
import EditPost from "views/Forms/EditPost";
// core components/views for Auth layout
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Posts,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/login-page",
    name: "Login Page",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Login,
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/register-page",
    name: "Register Page",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Register,
    component: RegisterPage,
    layout: "/auth"
  },
  {
    path: "/post/:id",
    name: "Post",
    rtlName: "قائمة الجدول",
    icon: Notifications,
    component: Post,
    layout: "/admin"
  },
  {
    path: "/edit-post/:id",
    name: "Edit Post",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: EditPost,
    layout: "/admin"
  },
 
];

export default dashboardRoutes;
