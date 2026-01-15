import {Heading} from "../../shared/ui/Heading";
import {MilkAndCookiesIcon} from "../../components/icons";
import { useTranslation, Trans } from "react-i18next";
// import styles from './TestPage.module.scss'

export default function TestPage() {
    const { t } = useTranslation();
    const IconComponent = MilkAndCookiesIcon;

    return (
        <>
            <Heading
                heading={<Trans i18nKey="testPage.title" components={{ b: <b /> }}>
                    <b>Fallback</b> текст
                </Trans>}
                caption={t("testPage.subtitle")}
            />
            <p dangerouslySetInnerHTML={{ __html: t("testPage.description") }} />
        </>
    );
}
