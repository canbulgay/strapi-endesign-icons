import React from "react";
import { Box, Typography } from "@strapi/design-system";
import { EndesignIconComponent } from "./IconComponent";
import styled from "styled-components";
import type { IEndesignIcon } from ".";

export interface IEndesignIconLibrary {
  icons: IEndesignIcon[];
  onSelectIcon: (newIcon: string) => void;
}

const ScrollContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IconBox = styled(Box)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
`;

const IconName = styled(Typography)`
  margin-top: 8px;
`;

export const EndesignIconLibrary: React.FC<IEndesignIconLibrary> = ({
  icons,
  onSelectIcon,
}) => {
  return (
    <ScrollContainer>
      {icons.map((icon) => {
        return (
          <IconBox
            key={icon}
            padding={2}
            onClick={() => onSelectIcon(icon)}
            title={icon}
          >
            <EndesignIconComponent icon={icon} width={48} height={48} />
            <IconName>{icon}</IconName>
          </IconBox>
        );
      })}
    </ScrollContainer>
  );
};
