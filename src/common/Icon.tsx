import React from "react";

import * as Svg from "../../assets/icons";

interface Props {
  name: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<Props> = ({ name, size = 22, color = "white" }) => {
  const SvgIcon = (Svg as any)[name];
  return <SvgIcon width={size} height={size} color={color} />;
};

export default Icon;
