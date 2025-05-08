import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { Artist, Festival } from "../../types/TypesExport";
import api from "../../components/api";

const HomePage: React.FC = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const festivalsRes = await api.get("/festivals");
        const artistsRes = await api.get("/artists");
        setFestivals(festivalsRes.data);
        setArtists(artistsRes.data);
      } catch (err) {
        console.error("Error loading homepage data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>Welcome to where all festivals meet</h1>
        <p>Discover music festivals, explore artists, and plan your unforgettable experiences.</p>
      </header>

      <section className={styles.section}>
        <h2>Upcoming Festivals</h2>
        <div className={styles.cardGrid}>
          {festivals.slice(0, 3).map((festival) => (
            <div key={festival._id} className={styles.card}>
              <img src={festival.image} alt={festival.name} />
              <h3>{festival.name}</h3>
              <p>{festival.date} - {festival.location}</p>
              <Link to={`/festivals/${festival._id}`}>View Details</Link>
            </div>
          ))}
        </div>
        <Link to="/festivals" className={styles.linkButton}>See All Festivals</Link>
      </section>

      <section className={styles.section}>
        <h2>Featured Artists</h2>
        <div className={styles.cardGrid}>
          {artists.slice(0, 5).map((artist) => (
            <div key={artist._id} className={styles.card}>
              <img src={artist.image} alt={artist.name} />
              <h3>{artist.name}</h3>
              <p>{artist.genre}</p>
              <Link to={`/artists/${artist._id}`}>Read More</Link>
            </div>
          ))}
        </div>
        <Link to="/artists" className={styles.linkButton}>See All Artists</Link>
      </section>
    </div>
  );
};

export default HomePage