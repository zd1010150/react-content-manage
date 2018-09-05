import React from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const pageId = document.getElementById('detailPage');
    if (this.props.location !== prevProps.location && document.getElementById('root').contains(pageId)) {
      document.getElementById('detailPage').scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
