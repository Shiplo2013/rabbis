export default function AudioPlayer2({src, audioRef}) {
  return (
    <div className="audio-player hidden absolute">
        <audio ref={audioRef} controls src={src}></audio>
    </div>
  )
}
