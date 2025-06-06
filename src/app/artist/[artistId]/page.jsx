'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import AlbumSlider from '@/components/AlbumSlider';

export default function ArtistPage() {
  const params = useParams();
  const id = params?.id;
  const [artist, setArtist] = useState<any>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [songLimit, setSongLimit] = useState(10);
  const [albumLimit, setAlbumLimit] = useState(10);

  useEffect(() => {
    if (!id) return;
    const fetchArtist = async () => {
      const res = await axios.get(`/api/artist/${id}`);
      setArtist(res.data);
      setSongs(res.data.songs || []);
      setAlbums(res.data.albums || []);
    };
    fetchArtist();
  }, [id]);

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-xl font-semibold">{artist?.name}</h2>

      <div>
        <h3 className="text-lg font-medium mb-2">Songs</h3>
        <div className="grid gap-2">
          {songs.slice(0, songLimit).map((song, i) => (
            <div key={i} className="p-2 border rounded-md">
              <p className="font-medium">{song.title}</p>
            </div>
          ))}
        </div>
        {songs.length > songLimit && (
          <button className="mt-2 text-blue-600" onClick={() => setSongLimit(songLimit + 10)}>
            View More Songs
          </button>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Albums</h3>
        <AlbumSlider albums={albums.slice(0, albumLimit)} />
        {albums.length > albumLimit && (
          <button className="mt-2 text-blue-600" onClick={() => setAlbumLimit(albumLimit + 10)}>
            View More Albums
          </button>
        )}
      </div>
    </div>
  );
}
