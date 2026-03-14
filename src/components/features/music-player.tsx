"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
}

const defaultPlaylist: MusicTrack[] = [
  { id: "1", title: "Lo-Fi Beats", artist: "Chillhop", url: "/music/track1.mp3" },
  { id: "2", title: "Focus Flow", artist: "Ambient", url: "/music/track2.mp3" },
  { id: "3", title: "Coding Mode", artist: "Electronic", url: "/music/track3.mp3" },
];

interface MusicPlayerProps {
  className?: string;
}

export function MusicPlayer({ className }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = defaultPlaylist;
  const track = playlist[currentTrack];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setProgress(0);
  };

  const playPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className={cn("border-border/50 overflow-hidden", className)}>
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
      />
      <CardContent className="p-4">
        {/* Current Track Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
            <ListMusic className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{track.title}</p>
            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[progress]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="h-8 w-8"
            >
              <ListMusic className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={playPrevious}
              className="h-8 w-8"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              onClick={togglePlay}
              className="h-10 w-10 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={playNext}
              className="h-8 w-8"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="h-8 w-8"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={(value) => {
                setVolume(value[0]);
                setIsMuted(false);
              }}
              className="w-20 cursor-pointer"
            />
          </div>
        </div>

        {/* Playlist */}
        {showPlaylist && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2">播放列表</p>
            <div className="space-y-1">
              {playlist.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setCurrentTrack(index);
                    setIsPlaying(true);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    currentTrack === index
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <span className="font-medium">{t.title}</span>
                  <span className="text-muted-foreground ml-2">- {t.artist}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
