import type { FC, ComponentType, SVGProps } from "react";
import styles from "./Footer.module.scss";
import { CoffeeCupIcon, HeartIcon } from "../../components/icons";
import { Container } from '../../shared/ui/Container/Container';

interface SocialLink {
    url: string;
    title: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface FooterProps {
    socialLinks?: SocialLink[];
}

const Footer: FC<FooterProps> = ({ socialLinks = [] }) => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footer__content}>
                    <div className={styles.footer__caption}>
                        <span>
                            Made with
                        </span>
                        <CoffeeCupIcon className={styles.footer__caption__coffee} />
                        <span>
                            and
                        </span>
                        <HeartIcon className={styles.footer__caption__heart} />
                    </div>

                    {socialLinks.length > 0 && (
                        <ul className={styles.footer__links}>
                            {socialLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <li key={link.url}>
                                        <a
                                            href={link.url}
                                            title={link.title}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.footer__link}
                                        >
                                            <IconComponent
                                                width={24}
                                                height={24}
                                            />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
