"use client"

import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ThemeProvider,
    Toolbar,
    Typography,
} from "@mui/material";
import { Logout as LogoutIcon, Menu as MenuIcon} from "@mui/icons-material";
import React from "react";
import styles from "./products/styles.module.css";

export default function InventoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        在庫管理システム
                    </Typography>
                    <Button variant="contained" startIcon={<LogoutIcon />}>
                        ログアウト
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left">
                <Box sx={{ width: 240 }}>
                    <Toolbar />
                    <Divider />
                    <List>
                        <ListItem component="a" href="/inventory/products" disablePadding>
                            <ListItemButton>
                                <ListItemText primary="商品一覧" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem component="a" href="/inventory/import_sales" disablePadding>
                            <ListItemButton>
                                <ListItemText primary="売上一括登録" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, 
                    p: 3,
                    // AppBar と被るため下にずらしている
                    marginTop: "64px",
                    widt: "100%",
                    background: "white",
                }}
            >
                {children}
            </Box>
            <Box
                component='footer'
                sx={{
                    width: '100%',
                    position: 'fixed',
                    textAlign: 'center',
                    bottom: 0,
                    background: "white"
                }}
            >
                <Typography variant="caption" color="white">
                    ©︎2024 full stack web development
                </Typography>
            </Box>
        </Box>
    );
}