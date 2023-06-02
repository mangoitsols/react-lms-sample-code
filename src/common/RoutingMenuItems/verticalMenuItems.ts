import React, { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

export const VerticalMenuItems = () => {
  const [userData, setUserData] = React.useState<any>("");

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      setUserData(JSON.parse(localData));
    }
  }, []);

  if (userData && userData?.role_id === 2) {
    return [
      {
        title: "Dashboard",
        icon: HomeOutlinedIcon,
        path: "/user/dashboard",
        disable: true,
      },
      {
        title: "Profile",
        icon: ManageAccountsOutlinedIcon,
        path: "/user/profile",
        disable: false,
      },
      {
        title: "Subscriptions",
        icon: SubscriptionsOutlinedIcon,
        path: "/user/subscription",
        disable: false,
      },
      {
        title: "Courses",
        icon: DescriptionOutlinedIcon,
        path: "/user/course",
        disable: false,
      },
      {
        title: "Logout",
        icon: PowerSettingsNewOutlinedIcon,
        disable: false,
      },
    ];
  } else {
    return [
      {
        title: "Dashboard",
        icon: HomeOutlinedIcon,
        path: "admin/dashboard",
        disable: false,
      },
      {
        title: "Courses",
        icon: DescriptionOutlinedIcon,
        children: [
          {
            title: "All Courses",
            icon: ContentPasteOutlinedIcon,
            path: "/admin/courses/allcourses",
        disable: false,
          },
          {
            title: "All Modules",
            icon: ViewModuleOutlinedIcon,
            path: "/admin/courses/allmodules",
        disable: false,
          },
          {
            title: "All Sessions",
            icon: CalendarTodayOutlinedIcon,
            path: "/admin/courses/allsessions",
        disable: false,
          },
        ],
      },
      {
        title: "Users",
        icon: PeopleAltOutlinedIcon,
        path: "/users",
        disable: true,

      },
      {
        title: "Subscriptions",
        icon: SubscriptionsOutlinedIcon,
        path: "/subscriptions",
        disable: true,

      },

          {
            title: "Email Config",
            icon: EmailOutlinedIcon,
            path: "/admin/emailconfiguration",
        disable: true,

          },
          {
            title: "Configurations",
            icon: LanguageOutlinedIcon,
            path: "/admin/configuration",
        disable: false,

          },
      {
        title: "Invoices",
        icon: InsertDriveFileOutlinedIcon,
        path: "/admin/invoices",
        disable: true,

      },
      {
        title: "Settings",
        icon: SettingsOutlinedIcon,
        path: "admin/settings",
        disable: true,

      },
      {
        title: "Logout",
        icon: PowerSettingsNewOutlinedIcon,
        disable: false,

      },
    ];
  }
};
