'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumSlider from '@/components/AlbumSlider';

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;
  const [songs, setSongs] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [songLimit, setSongLimit] = useState(10);
  const [albumLimit, setAlbumLimit] = useState(10);
  const [artistLimit, setArtistLimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/search?q=${query}`);
      setSongs(res.data.songs || []);
      setAlbums(res.data.albums || []);
      setArtists(res.data.artists || []);
    };
    if (query) fetchData();
  }, [query]);

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-xl font-semibold">Results for "{query}"</h2>

      <div>
        <h3 className="text-lg font-medium mb-2">Songs</h3>
        <div className="grid gap-2">
          {songs.slice(0, songLimit).map((song, i) => (
            <div key={i} className="p-2 border rounded-md">
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-gray-500">{song.artist}</p>
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

      <div>
        <h3 className="text-lg font-medium mb-2">Artists</h3>
        <div className="flex flex-wrap gap-4">
          {artists.slice(0, artistLimit).map((artist, i) => (
            <div key={i} className="w-32 text-center">
              <img src={artist.image} className="rounded-full w-24 h-24 mx-auto" alt={artist.name} />
              <p>{artist.name}</p>
            </div>
          ))}
        </div>
        {artists.length > artistLimit && (
          <button className="mt-2 text-blue-600" onClick={() => setArtistLimit(artistLimit + 10)}>
            View More Artists
          </button>
        )}
      </div>
    </div>
  );
}
