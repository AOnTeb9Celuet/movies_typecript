import * as React from "react";
import { Col, Row, Container } from "reactstrap";
import Pagination from "react-js-pagination";
import { observer, inject } from "mobx-react";
import Poster from './Poster';
import { PosterStore } from '../../../store/PosterStore';

import "./Posters.css";

type PostersProps = React.ComponentType & { posterStore?: PosterStore }


class Posters extends React.Component<PostersProps, {}> {
  componentDidMount() {
    this.props.posterStore.getMoviesInfo(this.props.posterStore.page);
  }

  onPageClick = (e: number) => {
    const { changePageNumber, getMoviesInfo } = this.props.posterStore;
    changePageNumber(e);
    getMoviesInfo(e);
  };

  render() {
    const { page, info } = this.props.posterStore;

    return (
      <Container fluid className="main-page">
        <Row noGutters>
          <Col>
            <p className="main-text-p">Latest Releases</p>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Container fluid>
            <Row className="justify-content-center poster-row">
              <Poster info={info ? info.results : null} />
            </Row>
          </Container>
        </div>
        <Container fluid>
          <Pagination
            activePage={info && page}
            itemsCountPerPage={1}
            totalItemsCount={info && info.total_pages}
            pageRangeDisplayed={3}
            onChange={this.onPageClick}
            firstPageText="First"
            lastPageText="Last"
            prevPageText="Prev"
            nextPageText="Next"
            innerClass="pagination"
            linkClass="pagination-pages"
            linkClassFirst="pagination-link-first"
            linkClassLast="pagination-link-last"
            activeLinkClass="pagination-link-active"
          />
        </Container>
      </Container>
    );
  }
}

export default inject('posterStore')(observer(Posters));
