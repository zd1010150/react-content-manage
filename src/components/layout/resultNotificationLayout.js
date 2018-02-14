import React from 'react';

import { TopPanel,
  HeaderNav,
  Footer,
  CopyRight,
} from '../page/index';


const layout = () => (
  <div className="page-wrapper">
    <header className="page-header">
      <div className="panel wrapper">
        <TopPanel />
      </div>
      <div className="header content">
      </div>
    </header>
    <div className="section nav-sections">
      <HeaderNav />

    </div>
    <main id="maincontent" className="page-main">
      <div className="columns">
        <div className="sidebar sidebar-main">

        </div>
        <div className="column main" />
      </div>
    </main>
    <footer className="page-footer">
      <div className="footer content">
        <Footer />
      </div>

    </footer>
    <div className="copyright">
      <CopyRight />
    </div>
  </div>
);

export default layout;
