import { Frame } from '../frame/Frame';
import Button from '../atoms/button/button';
import { FrameVariantConfig } from '../../../packages/frame-core/src/variants/variants.props';

interface groupProps {
  logo?: React.ReactNode;
}

export const Navbar = (props: groupProps) => {
  const handleToggle = () => console.log("toggle menu");

  return (
    <Frame autoLayout={{flow:'horizontal'}} fill={{color: 'primary1'}} variant="navbar" variants={{ NAVBAR_VARIANTS }}>
      <Frame variant="logo">{props.logo}</Frame>
      <Button onClick={handleToggle}>Toggle</Button>
    </Frame>
  )
}

export const NAVBAR_VARIANTS: Record<string, FrameVariantConfig> = {
  navItem: {
    fill: { type: 'none' as const },
    typography: { fontSize: 14, fontWeight: 500, color: 'gray8' },
  },
  navItemHover: {
    fill: { type: 'solid' as const, color: 'primary1', opacity: 0.5 },
    typography: { fontSize: 14, fontWeight: 500, color: 'primary7' },
  },
}
