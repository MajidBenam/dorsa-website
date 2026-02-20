import { IconType } from 'react-icons';

interface GradientIconProps {
  icon: IconType;
  className?: string;
}

export default function GradientIcon({ icon: Icon, className = '' }: GradientIconProps) {
  return (
    <Icon
      className={className}
      fill="url(#iconGradient)"
      style={{ display: 'block' }}
      aria-hidden
    />
  );
}
