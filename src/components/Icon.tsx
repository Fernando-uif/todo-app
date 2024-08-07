import { iconList } from "../data/icons";

export const Icon = ({
  name,
  className,
  onClick,
}: {
  name: string;
  className?: string;
  onClick?: () => void;
}) => {
  const icon = iconList[name];
  return (
    <span
      dangerouslySetInnerHTML={{ __html: icon }}
      className={className}
      onClick={onClick}
    />
  );
};
