import React, { FC } from 'react';
import { Sidebar } from '../components';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
};
