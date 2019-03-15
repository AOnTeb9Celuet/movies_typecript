import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { MovieDetailsEntity } from '../../../types/types';

import './FavouriteList.css'

type FavouriteListState = { updateLocalStorage: boolean }

class FavouriteList extends React.Component<{}, FavouriteListState> {
  state = {
    updateLocalStorage: true,
  }

  render() {
    let favArr = JSON.parse(localStorage.getItem('main-arr'))

    if (!favArr[0]) {
      return <div className="empty-favArr">No favorite movies</div>
    }

    const updateLocalStorage = () => {
      this.setState({ updateLocalStorage: !this.state.updateLocalStorage })
    }

    const removeFromLocalStorage = function(e: number) {
      favArr = favArr.filter((el: MovieDetailsEntity) => el.id !== e)
      localStorage.setItem('main-arr', JSON.stringify(favArr))
      updateLocalStorage()
    }
    return (
      <Container fluid className="fav-main-page">
        <Row noGutters>
          <Col>
            <p className="fav-text-p"> My Favorite </p>
          </Col>
        </Row>
        {favArr.map((f: MovieDetailsEntity) => {
          return (
            <Row noGutters key={f.id} className="fav-arr-row">
              <Col md="3" xs="6" key={f.id}>
                <img
                  src={`http://image.tmdb.org/t/p/w342${f.poster_path}`}
                  alt="poster"
                  className="img-fluid fav-poster"
                />
              </Col>
              <Col md="9" xs="6">
                <div className="fav-title-but">
                  <p className="fav-title"> {f.title} </p>
                  <p
                    onClick={() => removeFromLocalStorage(f.id)}
                    className="fav-unfavourite"
                  >
                    Unfavorite
                  </p>
                </div>
                <p className="d-inline-block fav-overview"> {f.overview} </p>
              </Col>
            </Row>
          )
        })}
      </Container>
    )
  }
}

export default FavouriteList
