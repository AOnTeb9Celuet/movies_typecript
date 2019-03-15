import * as React from 'react'
import { Row, Col } from 'reactstrap'
import { Link, RouteComponentProps } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import './MovieModal.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faPlusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ModalStore } from '../../../store/ModalStore';
import { MovieDetailsEntity } from '../../../types/types'

[
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faPlusCircle,
  faTimesCircle,
].forEach(el => library.add(el))

type MovieModalProps = React.ComponentType & RouteComponentProps<{}> & { modalStore?: ModalStore }
type MovieModalState = { toggleRerender: boolean }

class MovieModal extends React.Component<MovieModalProps, MovieModalState> {
  state = {
    toggleRerender: true,
  }

  componentDidMount() {
    const pathname = this.props.location.pathname
    this.props.modalStore.getMovieDetails(pathname)
    if (!localStorage.getItem('main-arr')) {
      localStorage.setItem('main-arr', JSON.stringify([]))
    } else return false
  }

  componentWillUnmount() {
    this.props.modalStore.clearMovieDetails()
  }

  fullReleaseDate = () => {
    const dateReleaseDate = new Date(
      this.props.modalStore.details.release_date
    ).toDateString()
    return `${dateReleaseDate.slice(4)}`
  }

  toggleRerender = () => {
    this.setState({ toggleRerender: !this.state.toggleRerender })
  }

  //Favoutite button onCLick function
  addToLocalStorage = (e: number) => {
    const data = this.props.modalStore.details

    let oldArr = JSON.parse(localStorage.getItem('main-arr'))
    const boolArr = oldArr.map((obj: MovieDetailsEntity) => (obj.id !== data.id ? true : false))

    if (!boolArr.includes(false)) {
      oldArr = oldArr.concat(data)
      localStorage.setItem('main-arr', JSON.stringify(oldArr))
    } else {
      oldArr = oldArr.filter((el: MovieDetailsEntity) => el.id !== e)
      localStorage.setItem('main-arr', JSON.stringify(oldArr))
    }
    this.toggleRerender()
  }

  checkFavBtnValue = (adapt: boolean) => {
    const data = this.props.modalStore.details
    const localStorageArr = JSON.parse(localStorage.getItem('main-arr'))
    const boolArr = localStorageArr.map((obj: MovieDetailsEntity) =>
      obj.id !== data.id ? true : false
    )

    if (boolArr.includes(false)) {
      if (adapt) {
        return 'Remove'
      } else {
        return <FontAwesomeIcon icon="times-circle" />
      }
    } else {
      if (!adapt) {
        return <FontAwesomeIcon icon="plus-circle" />
      } else {
        return 'Add'
      }
    }
  }

  render() {
    if (!this.props.modalStore.details) {
      return <div>...Loading</div>
    }

    const {
      poster_path,
      release_date,
      title,
      vote_average,
      adult,
      overview,
      id,
    } = this.props.modalStore.details

    const posterPath = `http://image.tmdb.org/t/p/w342${poster_path}`
    const releaseDate =
      this.props.modalStore.details.release_date &&
      release_date.slice(0, 4)

    return (
      <div className="movie-modal">
        <div
          className="background-img"
          style={{ backgroundImage: `url(${posterPath})` }}
        />
        <Row noGutters>
          <Col className="d-flex justify-content-start">
            <Link to={'/'}>
              <p className="button-left">
                <FontAwesomeIcon
                  icon="arrow-alt-circle-left"
                  className="arrow-left"
                />
                <span>Back to list</span>
              </p>
            </Link>
          </Col>

          <Col className="d-flex justify-content-end">
            <p className="button-right">
              <span>Next Movie </span>
              <FontAwesomeIcon
                icon="arrow-alt-circle-right"
                className="arrow-right"
              />
            </p>
          </Col>
        </Row>
        <Row noGutters className="modal-row">
          {/* Modal Poster */}
          <Col md="4" xs="6" className="d-flex justify-content-center info-col">
            <img
              src={posterPath}
              alt="poster"
              className="img-fluid poster-modal"
            />
          </Col>
          {/* Main favorite button */}
          <Col md="8" xs="6" className="movie-info-col">
            <p className="d-flex justify-content-end favorite-but-default">
              <span onClick={() => this.addToLocalStorage(id)}>
                {this.checkFavBtnValue(true)}
              </span>
            </p>

            <p className="info-title">
              {title} ({releaseDate})
            </p>

            <p className="info-s-r-rd justify-content-start">
              <span className="info-s white-space">
                Score: <br className="s-r-rd-br-class" />
                <span className="info-s-r-rd-values-576">{vote_average}</span>
              </span>
              <br className="info-br-class" />
              <span className="info-r white-space">
                Rating: <br className="s-r-rd-br-class" />
                <span className="info-s-r-rd-values-576">
                  {adult ? 'R' : 'PG'}
                </span>
              </span>
              <br className="info-br-class" />
              <span className="info-rd white-space">
                Release Date: <br className="s-r-rd-br-class" />
                <span className="white-space info-s-r-rd-values-576">
                  {this.fullReleaseDate()}
                </span>
              </span>
            </p>
            <p className="info-about">{overview}</p>
          </Col>
          <Col xs="12">
            <p className="info-title-576">
              {title} ({releaseDate})
            </p>
            <p className="info-about-576">{overview}</p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('modalStore')(observer(MovieModal))
