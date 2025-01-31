// pages/index.tsx

import React from 'react';

const Home = ({ message }: { message: string }) => {
  return <h1>{message}</h1>;
};

export async function getServerSideProps() {
  return {
    props: {
      message: 'Hello from server-side!',
    },
  };
}

export default Home;
