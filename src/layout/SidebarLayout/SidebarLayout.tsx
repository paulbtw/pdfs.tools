import React, { FC } from 'react';
import { Sidebar } from './components';

export const SidebarLayout: FC = ({ children }) => {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
};
