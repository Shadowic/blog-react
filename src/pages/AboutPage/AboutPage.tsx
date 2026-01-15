import {Heading} from "../../shared/ui/Heading";
import { useTranslation, Trans } from "react-i18next";
import styles from './AboutPage.module.scss'
import coverImage from '../../assets/images/IMG_0773.webp'

export default function AboutPage() {
    const { t } = useTranslation();

    return (
        <>
            <Heading
                heading={<Trans i18nKey="about.title" components={{ b: <b /> }}>
                    <b>Fallback</b> текст
                </Trans>}
                caption={t("about.subtitle")}
            />
            <div className={styles.content}>
                <p className={styles.intro} dangerouslySetInnerHTML={{ __html: t("about.description") }} />
                <div className={styles.cover}>
                    <div className={styles.cover__wrap}>
                        <img src={coverImage} className={styles.cover__image} width={1280} height={853} alt="cover photo"/>
                    </div>
                </div>
            </div>
        </>
    );
}
