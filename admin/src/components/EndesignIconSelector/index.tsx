import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionToggle,
  Badge,
  Box,
  Button,
  FieldAction,
  Flex,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Option,
  Searchbar,
  SearchForm,
  Select,
  TextInput,
  Typography,
  Grid,
  GridItem,
} from "@strapi/design-system";

import { EndesignIconComponent } from "./IconComponent";
import { EndesignIconLibrary } from "./IconLibrary";
import * as EndesignIcons from "@enuygun/icons";
import { MessageDescriptor } from "react-intl";
import { Minus, Plus } from "@strapi/icons";

interface IEndesignIconSelector {
  description: null | MessageDescriptor;
  intlLabel: null | MessageDescriptor;
  placeholder: null | MessageDescriptor;
  name: string;
  error: string;
  required: boolean;
  onChange: any;
  value: string;
}

export type IEndesignIcon = keyof typeof EndesignIcons;

const EndesignIconSelector: React.FC<IEndesignIconSelector> = (props) => {
  const {
    description,
    error,
    intlLabel,
    placeholder,
    name,
    required,
    onChange,
    value,
  } = props;
  console.log(props);
  const allEndesignIcons = Object.keys(EndesignIcons) as IEndesignIcon[];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isToggle, setIsToggle] = useState(false);

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const changeIcon = (newIcon: string) =>
    onChange({
      target: {
        name,
        type: "string",
        value: newIcon,
      },
    });

  const onSelectIcon = (newIcon: string) => {
    toggleModal();
    changeIcon(newIcon);
  };

  return (
    <>
      <TextInput
        type="text"
        label={intlLabel?.defaultMessage}
        placeholder={placeholder && "Icon Name"}
        hint={description}
        disabled={false}
        onChange={onChange}
        id={"endesign-icon-selector"}
        name={"endesign-icon-selector"}
        value={value || ""}
        required={required}
        error={error}
        startAction={
          <FieldAction onClick={toggleModal}>
            {value ? (
              <EndesignIconComponent icon={value as IEndesignIcon} />
            ) : (
              <Typography>Select Icon</Typography>
            )}
          </FieldAction>
        }
        endAction={
          !!value && (
            <FieldAction onClick={() => changeIcon("")}>
              <Typography variant="pi">Clear Icon</Typography>
            </FieldAction>
          )
        }
      />

      {isModalVisible && (
        <ModalLayout onClose={toggleModal} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" id="title">
              Select an icon
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Box>
              <Box padding={4} marginTop={2} background="neutral0">
                <AccordionGroup>
                  <Accordion
                    id="endesign-icon-selector"
                    expanded={true}
                    onToggle={() => {}}
                    size="S"
                  >
                    <AccordionToggle
                      togglePosition="left"
                      title={
                        <div>
                          <Typography>Endesign Icon Selector</Typography>
                          <Badge style={{ marginLeft: "20px" }}>
                            {
                              allEndesignIcons.filter((icon) =>
                                icon
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ).length
                            }
                          </Badge>
                        </div>
                      }
                      action={
                        <SearchForm>
                          <Grid gap={0}>
                            <GridItem key={1} col={12}>
                              <Searchbar
                                onClear={() => setSearchTerm("")}
                                value={searchTerm}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setSearchTerm(e.target.value)}
                                placeholder="Arama yap"
                              >
                                Search
                              </Searchbar>
                            </GridItem>
                          </Grid>
                        </SearchForm>
                      }
                    ></AccordionToggle>
                    <AccordionContent>
                      <Box paddingLeft={3} paddingTop={3} paddingBottom={3}>
                        <Flex
                          direction="row"
                          wrap="wrap"
                          display="flex"
                          color="neutral900"
                          alignItems="center"
                          gap={1}
                        >
                          <EndesignIconLibrary
                            icons={allEndesignIcons.filter((icon) =>
                              icon
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            )}
                            onSelectIcon={onSelectIcon}
                          />
                        </Flex>
                      </Box>
                    </AccordionContent>
                  </Accordion>
                </AccordionGroup>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter
            // startActions={
            //   <Select
            //     minWidth={500}
            //     required={0}
            //     error={error}
            //     value={}
            //     onChange={}
            //   >
            //     <Option value="">
            //     </Option>
            //   </Select>
            // }
            endActions={
              <Button variant="tertiary" onClick={toggleModal}>
                Close
              </Button>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default EndesignIconSelector;
