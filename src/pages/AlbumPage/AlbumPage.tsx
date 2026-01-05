import {Heading} from "../../shared/ui/Heading";
import {MilkAndCookiesIcon} from "../../components/icons";
// import styles from './AlbumPage.module.scss'

export default function AlbumPage() {
    const IconComponent = MilkAndCookiesIcon;

    return (
        <>
            <Heading
                icon={<IconComponent />}
                heading={<>Типа <b>страница</b> с альбомом</>}
                caption="React version is coming as soon as possible"
            />
        </>
    );
}
