import './MusicQueueDetails.css'
import noteIcon from '../assets/noteicon.png'

const MusicQueueDetails = ({music}) => {

  if (typeof music.picture === "undefined"){
    music.picture = noteIcon
  }
    return (
      <div className='music-queue-details'>
        <div className="queue-music-name">{music.name}</div>
        <div className="queue-artist">{music.artist}</div>
        <img className="queue-capa" alt="Capa" src={music.image} />
      </div>
    );
  };


export default MusicQueueDetails;