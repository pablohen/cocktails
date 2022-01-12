import React from 'react';

interface Props {
  value: string;
}

const Title = ({ value }: Props) => {
  return <h2 className="text-5xl mb-6">{value}</h2>;
};

export default Title;
