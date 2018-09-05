import React from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const mainContent = document.querySelector('#mainContent');
    if (this.props.location !== prevProps.location && document.contains(mainContent)) {
      mainContent.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
