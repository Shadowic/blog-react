import {Heading} from "../../shared/ui/Heading";
import {MilkAndCookiesIcon} from "../../components/icons";
// import styles from './AlbumsPage.module.scss'

export default function AlbumsPage() {
    const IconComponent = MilkAndCookiesIcon;

    return (
        <>
            <Heading
                icon={<IconComponent />}
                heading={<>Типа <b>страница</b> с альбомами</>}
                caption="React version is coming as soon as possible"
            />
        </>
    );
}
