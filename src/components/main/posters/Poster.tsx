import * as React from 'react'
import { Col } from 'reactstrap'
import { Link } from 'react-router-dom';
import { MoviesInfoObject } from '../../../types/types';

import './Posters.css'

type PosterProps = { info: [MoviesInfoObject] | undefined }

const Poster = (props: PosterProps) => {
  return (
    <>
      {props.info &&
        props.info.map((p: MoviesInfoObject):JSX.Element => {
          return (
            <Col key={p.id} className="col-6 col-md-3 col-xl-2 poster-col">
              <Link to={`/${p.id}`}>
                <img
                  src={`http://image.tmdb.org/t/p/w342${p.poster_path}`}
                  alt="poster"
                  className="poster img-fluid"
                />
              </Link>
            </Col>
          )
        })}
    </>
  )
}

export default Poster
