import { useState } from 'react';
import { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './MenuMobile.module.scss';

interface MenuMobileProps {
    isOpen: boolean;
    onClose: () => void;
}

interface NavItem {
    path: string;
    translationKey: string;
    exact?: boolean;
}

const navItems: NavItem[] = [
    { path: '/', translationKey: 'menu.mainPage', exact: true },
    { path: '/albums', translationKey: 'menu.albums' },
    { path: '/about', translationKey: 'menu.about' },
    { path: '/test-page', translationKey: 'menu.test-page' },
];

export const MenuMobile: FC<MenuMobileProps> = ({
        isOpen,
        onClose,
}) => {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    useEffect(() => {
        if (isMobile && isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile, isOpen, onClose]);

    const handleLinkClick = () => {
        onClose();
    };

    if (!isMobile) return null;

    return (
        <div className={`${styles.menuMobile} ${isOpen ? styles.open : ''}`}>
            <nav>
                <ul className={styles.menuMobile__list}>
                    {navItems.map((item) => (
                        <li
                            key={item.path}
                            className={styles.menuMobile__list__item}
                            onClick={handleLinkClick}
                        >
                            <NavLink
                                to={item.path}
                                end={item.exact}
                                className={({ isActive }) =>
                                    `${styles.navLink} ${isActive ? styles.active : ''}`
                                }
                            >
                                {t(item.translationKey)}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
