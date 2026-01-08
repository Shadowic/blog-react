import {Heading} from "../../shared/ui/Heading";
import {AlbumsTabs} from "../../widgets/AlbumsTabs/AlbumsTabs";
import styles from './AlbumsPage.module.scss'

export default function AlbumsPage() {

    return (
        <>
            <Heading
                heading={<>Типа <b>страница</b> с альбомами</>}
            />
            <div className={styles.content}>
                <AlbumsTabs />
                <p>WIP</p>
            </div>
        </>
    );
}
