import React from "react";
import { Box } from "@strapi/design-system";
import { EndesignIconComponent } from "./IconComponent";
import type { IEndesignIcon } from ".";

export interface IEndesignIconLibrary {
  icons: IEndesignIcon[];
  onSelectIcon: (newIcon: string) => void;
}

export const EndesignIconLibrary: React.FC<IEndesignIconLibrary> = ({
  icons,
  onSelectIcon,
}) => {
  return (
    <>
      {icons.map((icon) => {
        return (
          <Box
            key={icon}
            variant="secondary"
            onClick={() => {
              onSelectIcon(icon);
            }}
            title={icon}
          >
            <EndesignIconComponent icon={icon} />
          </Box>
        );
      })}
    </>
  );
};
