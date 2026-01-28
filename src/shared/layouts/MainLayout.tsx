import { useState } from "react";
import type { FC, ReactNode } from "react";
// import { Outlet } from "react-router-dom";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import { CoffeeIcon, GithubIcon, LoupeIcon, PinterestIcon, TgIcon } from '../../components/icons';
import styles from "./MainLayout.module.scss";
import {Container} from "../ui/Container/Container";
import {ToTopButton} from "../../widgets/ToTopButton/ToTopButton";
import {MenuMobile} from "../ui/MenuMobile/MenuMobile";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {

    const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuMobileOpen(!isMenuMobileOpen);
    };

    const closeMenu = () => {
        setIsMenuMobileOpen(false);
    };

    const socialLinks = [
        {
            url: '#',
            title: 'Coffee',
            icon: CoffeeIcon
        },
        {
            url: 'https://github.com/Shadowic',
            title: 'GitHub',
            icon: GithubIcon
        },
        {
            url: '#',
            title: 'Search',
            icon: LoupeIcon
        },
        {
            url: '#',
            title: 'Pinterest',
            icon: PinterestIcon
        },
        {
            url: '#',
            title: 'Tg',
            icon: TgIcon
        },
    ];

    return (
        <>
            <div className={styles.layout}>
                <Header
                    isMenuMobileOpen={isMenuMobileOpen}
                    onToggleMenu={toggleMenu}
                />
                <Container>
                    <main className={styles.main}>{children}</main>
                </Container>
                <Footer socialLinks={socialLinks} />
                <MenuMobile
                    isOpen={isMenuMobileOpen}
                    onClose={closeMenu}
                />
                <ToTopButton />
            </div>
        </>
    );
};
