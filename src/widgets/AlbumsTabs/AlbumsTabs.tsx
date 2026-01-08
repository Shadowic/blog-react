import type { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AlbumsTabs.module.scss";

interface AlbumTab {
  albumCode: string;
  name: string;
}

const albumTabs: AlbumTab[] = [
  { albumCode: "all", name: "all" },
  { albumCode: "travel", name: "travel" },
  { albumCode: "foooood", name: "foooood" },
  { albumCode: "ceramicon", name: "ceramicon" },
];

export const AlbumsTabs: FC = () => {
  return (
      <nav className={styles.tabs}>
        {albumTabs.map((album) => (
            <NavLink
                key={album.albumCode}
                to={
                  album.albumCode === "all"
                      ? "/albums"
                      : `/albums/${album.albumCode}`
                }
                end={album.albumCode === "all"}
                className={({ isActive }) =>
                    `${styles.tab} ${isActive ? styles.active : ""}`
                }
            >
              {album.name}
            </NavLink>
        ))}
      </nav>
  );
};
