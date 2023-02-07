import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    load: false,
  };

  addFavorite = async (event, music) => {
    const { target: { checked } } = event;
    this.setState({ load: true });
    if (checked === true) {
      await addSong(music);
    }
    if (checked === false) {
      await removeSong(music);
    }
    this.setState({ load: false });
  };

  render() {
    const { url, name, trackId, music } = this.props;
    const { load } = this.state;
    return (
      <div>
        { load ? <Loading /> : ''}
        <h5>{ name }</h5>
        <audio data-testid="audio-component" src={ url } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <form>
          <label htmlFor="favorita">
            Favorita
            <input
              id="favorita"
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ (event) => this.addFavorite(event, music) }
            />
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  music: PropTypes.func.isRequired,
};

export default MusicCard;
