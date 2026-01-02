import type { FC, ReactNode } from "react";
// import { Outlet } from "react-router-dom";
import Header from "../../widgets/LayoutHeader/Header";
import Footer from "../../widgets/LayoutFooter/Footer";
import { CoffeeIcon, GithubIcon, LoupeIcon, PinterestIcon, TgIcon } from '../../components/icons';
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {

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
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer socialLinks={socialLinks} />
        </div>
    );
};
