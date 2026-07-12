export default function AudioPlayer({src, audioRef}) {
  return (
    <div className="audio-player hidden absolute">
        <audio id="audio-player" ref={audioRef} controls src={src} loop></audio>
    </div>
  )
}
