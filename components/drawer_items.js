import * as React from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import InfoIcon from "@mui/icons-material/Info";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from '@mui/icons-material/Home';
import {AppBarTitleEnum} from "./app_bar_title_enum";
import MailIcon from "@mui/icons-material/Mail";

export const drawerMainItemsParts = [
    {icon: HomeIcon, title: AppBarTitleEnum.HOME, to: "/home"},
    {icon: LayersIcon, title: AppBarTitleEnum.BLOG, to: "/blog"},
    {icon: PsychologyIcon, title: AppBarTitleEnum.PRINCIPLES, to: "/principles"},
    {icon: InfoIcon, title: AppBarTitleEnum.ABOUT_ME, to: "/about"},
    {icon: BarChartIcon, title: AppBarTitleEnum.PROJECTS, to: "/projects"},
    {icon: SchoolIcon, title: AppBarTitleEnum.COURSES, to: "/courses"},
];

export const drawerSecondaryItemsParts = [
    {icon: LinkedInIcon, title: "LinkedIn", to: "https://www.linkedin.com/in/s-alireza-mousavizade-41a25024b/"},
    {icon: GitHubIcon, title: "GitHub", to: "https://github.com/samousavizade"},
    {icon: TelegramIcon, title: "Telegram", to: "https://t.me/SAlirezaMousavizade"},
    {icon: MailIcon, title: "Mail", to: "https://mail.google.com/mail/u/?authuser=s.a.mosavizade@gmail.com"},

];
