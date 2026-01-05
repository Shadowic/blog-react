import {Heading} from "../../shared/ui/Heading";
import styles from './HomePage.module.scss'
import {MilkAndCookiesIcon} from "../../components/icons";

export default function HomePage() {
    const IconComponent = MilkAndCookiesIcon;

    return (
        <div className={styles.textBlock}>
            <Heading
                icon={<IconComponent />}
                heading={<>Типа <b>главная</b> страница</>}
                caption="React version is coming as soon as possible"
            />
        </div>
    );
}
