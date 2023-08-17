import './MusicQueueDetails.css'
import capa from '../assets/akon-album.jpg'

const MusicQueueDetails = () => {
    return (
      <div className='music-queue-details'>
        <div className="queue-music-name">Gangsta Bop</div>
        <div className="queue-artist">Akon</div>
        <div className='queue-time'>2:59</div>
        <img className="queue-capa" alt="Capa" src={capa} />
      </div>
    );
  };


export default MusicQueueDetails;