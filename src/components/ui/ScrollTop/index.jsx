import React from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const node = document.querySelector('#mainContent');
    if (this.props.location !== prevProps.location && node) {
      // NOTES: IE doesn't support node scrollTo, it only supports document scrollTo
      node.scrollTop = 0;
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
