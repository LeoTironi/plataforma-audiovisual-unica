"use client";

import { Genre, Movie, Video } from "@lib/types";
import { AddCircle, CancelRounded, RemoveCircle, PlayCircleOutlineOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

interface Props {
  movie: Movie;
  closeModal: () => void;
}

interface User {
  email: string;
  username: string;
  favorites: number[];
}

const Modal = ({ movie, closeModal }: Props) => {
  const router = useRouter();

  const [video, setVideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  const getMovieDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await res.json();

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (video: Video) => video.type === "Trailer"
        );
        setVideo(data.videos.results[index].key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    } catch (err) {
      console.log("Error fetching movie details", err);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [movie]);
  // HANDLE MY LIST



  
  
  return loading ? (
    <Loader />
  ) : (
    <div className="modal">
      <button className="modal-close" onClick={closeModal}>
        <CancelRounded
          sx={{ color: "white", fontSize: "35px", ":hover": { color: "red" } }}
        />
      </button>

      <iframe
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
        className="modal-video"
        loading="lazy"
        allowFullScreen
      />

      <div className="modal-content">
        <div className="hero-btns">
          <button className="hero-btn" onClick={() => router.push(`/watch/${video}`)}>
              <PlayCircleOutlineOutlined /> Assistir
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-base-bold">Nome:</p>
            <p className="text-base-light">{movie?.title || movie?.name}</p>
          </div>
          <div className="flex gap-3">
            <p className="text-base-bold">Adicionar à lista</p>
            {isFavorite ? (
              <RemoveCircle
                className="cursor-pointer text-pink-1"
              />
            ) : (
              <AddCircle
                className="cursor-pointer text-pink-1"
              />
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-base-bold">Lançamento:</p>
          <p className="text-base-light">{movie?.release_date}</p>
        </div>

        <p className="text-base-light">{movie?.overview}</p>

        <div className="flex gap-2">
          <p className="text-base-bold">Nota:</p>
          <p className="text-base-light">{movie?.vote_average}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-base-bold">Generos:</p>
          <p className="text-base-light">
            {genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
