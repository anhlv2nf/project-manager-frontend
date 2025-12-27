import React from 'react';
import * as Svgicons from "./menusvg-icons";

export const MENUITEMS = [
    {
        menutitle: "MAIN",
    },
    {
        path: "/",
        title: "Dashboard",
        type: "link",
        icon: Svgicons.Dashboardicon,
        active: false,
        selected: false,
    },
    {
        menutitle: "MANAGEMENT",
    },
    {
        path: "/users",
        title: "User Management",
        type: "link",
        icon: Svgicons.Profilesettingicon,
        active: false,
        selected: false,
    },
    {
        path: "/projects",
        title: "Project Management",
        type: "link",
        icon: Svgicons.Projectsicon,
        active: false,
        selected: false,
    },
];

export const PM_MENUITEMS = [
    {
        menutitle: "MAIN",
    },
    {
        path: "/pm",
        title: "PM Dashboard",
        type: "link",
        icon: Svgicons.Dashboardicon,
        active: false,
        selected: false,
    },
    {
        menutitle: "PROCESSES",
    },
    {
        path: "/pm/initiation",
        title: "Initiation",
        type: "link",
        icon: Svgicons.Taskicon,
        active: false,
        selected: false,
    },
    {
        path: "/pm/planning",
        title: "Planning",
        type: "link",
        icon: Svgicons.Taskicon,
        active: false,
        selected: false,
    },
    {
        path: "/pm/execution",
        title: "Execution",
        type: "link",
        icon: Svgicons.Taskicon,
        active: false,
        selected: false,
    },
    {
        path: "/pm/monitoring",
        title: "Monitoring & Control",
        type: "link",
        icon: Svgicons.Taskicon,
        active: false,
        selected: false,
    },
    {
        path: "/pm/closing",
        title: "Closing",
        type: "link",
        icon: Svgicons.Taskicon,
        active: false,
        selected: false,
    },
];
