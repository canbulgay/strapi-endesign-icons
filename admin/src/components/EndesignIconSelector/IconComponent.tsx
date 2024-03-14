import React from "react";
import * as EndesignIcons from "@enuygun/icons";
import type { IEndesignIcon } from ".";

interface IconComponent {
  icon: IEndesignIcon;
  width?: number;
  height?: number;
}

export const EndesignIconComponent: React.FC<IconComponent> = ({
  icon,
  width = 24,
  height = 24,
}) => {
  const Icon = EndesignIcons[icon as IEndesignIcon] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  if (!Icon || Icon === undefined) return <></>;

  return <Icon width={width} height={height} />;
};
