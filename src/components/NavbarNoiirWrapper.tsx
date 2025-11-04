// src/components/NavbarNoiirWrapper.tsx
import React from 'react';
import { parseNoiir } from '../noiir/parseNoiir';
import NavbarNoiirText from './navbar/Navbar.noiir?raw'; // import as string

export const NavbarNoiirWrapper = (props: any) => parseNoiir(NavbarNoiirText, props);

// Also export as default for convenience
export default NavbarNoiirWrapper;