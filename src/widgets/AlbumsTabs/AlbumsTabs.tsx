import type { FC } from "react";
import styles from "./AlbumsTabs.module.scss";

interface AlbumTab {
  albumCode: string;
  name: string;
}

interface AlbumsTabsProps {
  albumCodes: string[];
  activeAlbumCode?: string;
  onAlbumCodeChange: (albumCode: string) => void;
}

export const AlbumsTabs: FC<AlbumsTabsProps> = ({
    albumCodes,
    activeAlbumCode = "all",
    onAlbumCodeChange,
  }) => {
  const albumTabs: AlbumTab[] = [
    ...albumCodes.map(code => ({
      albumCode: code,
      name: code,
    })),
    { albumCode: "all", name: "reset" }
  ];

  const handleTabClick = (albumCode: string) => {
    onAlbumCodeChange(albumCode);
  };

  return (
      <nav className={styles.tabs}>
        {albumTabs.map((album) => (
            <button
                key={album.albumCode}
                onClick={() => handleTabClick(album.albumCode)}
                className={`${styles.tab} ${activeAlbumCode === album.albumCode ? styles.active : ""}`}
            >
              {album.name}
            </button>
        ))}
      </nav>
  );
};
