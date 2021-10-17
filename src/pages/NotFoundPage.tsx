import React from 'react';

interface Props {}

const NotFoundPage = (props: Props) => {
  return (
    <div className="text-center  p-8">
      <h2 className="text-4xl pb-4">Error 404:</h2>
      <h2 className="text-3xl">Page not found</h2>
    </div>
  );
};

export default NotFoundPage;
