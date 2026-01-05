import {Heading} from "../../shared/ui/Heading";
import {MilkAndCookiesIcon} from "../../components/icons";
// import styles from './AboutPage.module.scss'

export default function AboutPage() {
    const IconComponent = MilkAndCookiesIcon;

    return (
        <>
            <Heading
                icon={<IconComponent />}
                heading={<>Типа <b>страница</b> о себе</>}
                caption="React version is coming as soon as possible"
            />
        </>
    );
}
