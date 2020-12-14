/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line react/display-name
const Page = forwardRef(({
  children,
  // title = '',
  ...rest
}) => {
  return (
    <div
      // ref={ref}
      {...rest}
    >
      <Helmet>
        <title>titlexx</title>
      </Helmet>
      {children}
    </div>
  );
});

// Page.propTypes = {
//   children: PropTypes.node.isRequired,
//   title: PropTypes.string
// };

export default Page;
