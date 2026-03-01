export default function AudioPlayer({src, audioRef}) {
  return (
    <div className="audio-player hidden absolute">
        <audio ref={audioRef} controls src={src} loop></audio>
    </div>
  )
}
