import type { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./AlbumsTabs.module.scss";

interface AlbumTab {
  albumKey: string;
  name: string;
}

interface AlbumsTabsProps {
  albumKeys: string[];
  activeAlbumKey?: string;
  onAlbumKeyChange: (albumKey: string) => void;
}

export const AlbumsTabs: FC<AlbumsTabsProps> = ({
    albumKeys,
    activeAlbumKey = "all",
    onAlbumKeyChange,
  }) => {
  const { t } = useTranslation();

  const albumTabs: AlbumTab[] = [
    ...albumKeys.map(code => ({
      albumKey: code,
      name: t(code, code),
    })),
    { albumKey: "all", name: t("albumKey.all", "сброс") }
  ];

  const handleTabClick = (albumKey: string) => {
    onAlbumKeyChange(albumKey);
  };

  return (
      <nav className={styles.tabs}>
        {albumTabs.map((album) => (
            <button
                key={album.albumKey}
                onClick={() => handleTabClick(album.albumKey)}
                className={`${styles.tab} ${activeAlbumKey === album.albumKey ? styles.active : ""}`}
            >
              {album.name}
            </button>
        ))}
      </nav>
  );
};
