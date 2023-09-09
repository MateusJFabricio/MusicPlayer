import './MusicStackDetails.css'

const MusicStackDetails = ({music}) => {
    return (
      <div className='music-stack-details'>
        <div className="stack-music-name">{music.name}</div>
        <div className="stack-artist">{music.artist}</div>
        <img className="stack-capa" alt="Capa" src={music.image} />
      </div>
    );
  };


export default MusicStackDetails;