import { Frame } from '../frame/Frame';
import Button from '../atoms/button/button';
import { ExtendVariant } from '../../../packages/frame-core/src/variants/variants.props';

interface NavbarProps {
  logo?: React.ReactNode;
}

export const Navbar = (props: NavbarProps) => {
  const handleToggle = () => console.log("toggle menu");

  return (
    <Frame autoLayout={{flow:'horizontal'}} fill={{color: 'primary1'}} variant="navbar" variants={{ NAVBAR_VARIANTS }}>
      <Frame variant="logo">{props.logo}</Frame>
      <Button onClick={handleToggle}>Toggle</Button>
    </Frame>
  )
}

export const NAVBAR_VARIANTS: ExtendVariant = {
  navItem: {
    fill: { type: 'none' as const },
    typography: { fontSize: 14, fontWeight: 500, color: 'gray8' },
  },
  navItemHover: {
    fill: { type: 'solid' as const, color: 'primary1', opacity: 0.5 },
    typography: { fontSize: 14, fontWeight: 500, color: 'primary7' },
  },
}
