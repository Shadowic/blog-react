import {Heading} from "../../shared/ui/Heading";
import {MilkAndCookiesIcon} from "../../components/icons";
// import styles from './TestPage.module.scss'

export default function TestPage() {
    const IconComponent = MilkAndCookiesIcon;

    return (
        <>
            <Heading
                icon={<IconComponent />}
                heading={<>Типа <b>тестовая</b> страница</>}
                caption="React version is coming as soon as possible"
            />
        </>
    );
}
