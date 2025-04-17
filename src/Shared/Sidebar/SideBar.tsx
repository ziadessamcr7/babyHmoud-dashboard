import { Menu, MenuItem, Sidebar, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import './Sidebar.css';
import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight, Menu as MenuIcon } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';

const drawerWidth = 250;
const collapsedWidth = 80;

const SideBar = ({ isCollapsed, handleToggle }: { isCollapsed: boolean, handleToggle: () => void }) => {
    const theme = useTheme();
    const location = useLocation();
    const { t } = useTranslation();

    // بيانات عناصر الشريط الجانبي مع مفاتيح الترجمة
    const menuItems = [
        // مثال لتعطيل لوحة التحكم، يمكنك تفعيلها إذا كنت تحتاجها
        // {
        //     title: t("sidebar.dashboard"),
        //     icon: <img src='/assets/imgs/smart-home.svg' alt={t("sidebar.dashboardAlt")} />,
        //     path: "/dashboard"
        // },
        {
            title: t("sidebar.clients"),
            icon: <img src='/assets/imgs/users.svg' alt={t("sidebar.clientsAlt")} />,
            submenu: [
                { title: t("sidebar.orders"), path: "/requests" },
                { title: t("sidebar.clients"), path: "/clients" },
                // { title: t("sidebar.transactions"), path: "/transactions" },
                { title: t("sidebar.ratings"), path: "/ratings" }
            ]
        },
        {
            title: t("sidebar.categories"),
            icon: <img src='/assets/imgs/circle-square.svg' alt={t("sidebar.categoriesAlt")} />,
            path: "/categories"
        },
        {
            title: t("sidebar.products"),
            icon: <img src='/assets/imgs/box.svg' alt={t("sidebar.productsAlt")} />,
            submenu: [
                { title: t("sidebar.products"), path: "/products" },
                { title: t("sidebar.dynamicForm"), path: "/products-list" },
                { title: t("sidebar.addOns"), path: "/add-ons" },
                { title: t("sidebar.connectProducts"), path: "/connect-products" }
            ]
        },
        {
            title: t("sidebar.variables"),
            icon: <img src='/assets/imgs/circle-plus.svg' alt={t("sidebar.variablesAlt")} />,
            path: "/variables"
        },
        // مثال لتعطيل الدفع، يمكنك تفعيله إذا كنت تحتاجه
        // {
        //     title: t("sidebar.payment"),
        //     icon: <img src='/assets/imgs/paymentIcon.svg' alt={t("sidebar.paymentAlt")} />,
        //     path: "/payment"
        // },
        {
            title: t("sidebar.adminSettings"),
            icon: <img src='/assets/imgs/user-circle.svg' alt={t("sidebar.adminSettingsAlt")} />,
            submenu: [
                { title: t("sidebar.roles"), path: "/roles" },
            ]
        },
        {
            title: t("sidebar.homeScreen"),
            icon: <img src='/assets/imgs/photoIcon.svg' alt={t("sidebar.homeScreenAlt")} />,
            submenu: [
                { title: t("sidebar.onBoardingScreens"), path: "/photos" },
                { title: t("sidebar.banners"), path: "/banners" },
            ]

        },
        {
            title: t("sidebar.settings"),
            icon: <img src='/assets/imgs/settings.svg' alt={t("sidebar.settingsAlt")} />,
            path: "/contact-us"
        },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                position: 'sticky',
                top: 0,
                boxShadow: theme.shadows[4],
                zIndex: theme.zIndex.drawer
            }}
        >
            {/* الشعار وزر الطي */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    padding: theme.spacing(2),
                    height: '64px',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                }}
            >
                {!isCollapsed && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src="/assets/imgs/logo 1.svg" alt={t("sidebar.logoAlt")} style={{ height: '30px' }} />
                        <Typography variant="h6" noWrap>
                            {t("sidebar.appName")}
                        </Typography>
                    </Box>
                )}

                <Tooltip title={isCollapsed ? t("sidebar.expand") : t("sidebar.collapse")}>
                    <IconButton
                        onClick={handleToggle}
                        sx={{
                            color: 'inherit',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)'
                            }
                        }}
                    >
                        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </Tooltip>
            </Box>

            {/* محتوى الشريط الجانبي */}
            <Sidebar
                collapsed={isCollapsed}
                width={`${drawerWidth}px`}
                collapsedWidth={`${collapsedWidth}px`}
                rootStyles={{
                    height: '100%',
                    border: 'none',
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: theme.palette.background.paper,
                    },
                }}
                transitionDuration={300}
            >
                <Menu
                    menuItemStyles={{
                        button: ({ level, active }) => {
                            return {
                                color: theme.palette.text.primary,
                                backgroundColor: active ? theme.palette.action.selected : 'transparent',
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                                borderRadius: theme.shape.borderRadius,
                                margin: theme.spacing(0.5, 1),
                                padding: theme.spacing(1, 1.5),
                                transition: 'all 0.2s ease',
                            };
                        },
                    }}
                >
                    {menuItems.map((item, index) => {
                        if (item.submenu) {
                            return (
                                <SubMenu
                                    key={index}
                                    label={isCollapsed ? "" : item.title}
                                    icon={item.icon}
                                    defaultOpen={item.submenu.some(sub => sub.path === location.pathname)}
                                >
                                    {item.submenu.map((subItem, subIndex) => (
                                        <MenuItem
                                            key={subIndex}
                                            component={<NavLink to={subItem.path} />}
                                            active={location.pathname === subItem.path}
                                        >
                                            {isCollapsed ? (
                                                <Tooltip title={subItem.title} placement="right">
                                                    <span>{subItem.title}</span>
                                                </Tooltip>
                                            ) : (
                                                subItem.title
                                            )}
                                        </MenuItem>
                                    ))}
                                </SubMenu>
                            );
                        }
                        return (
                            <MenuItem
                                key={index}
                                component={<NavLink to={item.path} />}
                                icon={item.icon}
                                active={location.pathname === item.path}
                            >
                                {isCollapsed ? (
                                    <Tooltip title={item.title} placement="right">
                                        <span>{item.title}</span>
                                    </Tooltip>
                                ) : (
                                    item.title
                                )}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SideBar;
