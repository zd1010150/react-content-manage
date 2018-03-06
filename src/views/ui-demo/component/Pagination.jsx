import React, { Fragment } from 'react';
import { Pagination } from 'antd';
const PaginationExample = () => {
  return (
    <Fragment>
      <br />
      <h4>Basic pagination component</h4>
      <p>The original antd styles have been globally overwritten</p>
      <Pagination
        total={850}
        showTotal={(total, range) => `showing ${range[0]}-${range[1]} of ${total} items`}
        pageSize={20}
        defaultCurrent={1}
        size="small"
      />
    </Fragment>
  );
};

export default PaginationExample;