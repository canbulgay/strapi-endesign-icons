import React, { useState } from "react";
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
  const { description, error, intlLabel, name, required, onChange, value } =
    props;
  const Plus = EndesignIcons.Plus;

  const allEndesignIconNames = Object.keys(EndesignIcons) as IEndesignIcon[];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const changeIcon = (newIcon: string) => {
    return onChange({
      target: {
        name,
        type: "string",
        value: newIcon,
      },
    });
  };

  const onSelectIcon = (newIcon: string) => {
    toggleModal();
    changeIcon(newIcon);
  };

  return (
    <>
      <TextInput
        label={intlLabel?.defaultMessage}
        placeholder={"Select an endesign icon"}
        hint={description}
        disabled={false}
        onChange={onChange}
        id={"endesign-icon-selector"}
        name={"endesign-icon-selector"}
        value={value || ""}
        required={required}
        style={{ cursor: "pointer" }}
        error={error}
        onClick={toggleModal}
        startAction={
          <FieldAction onClick={toggleModal}>
            {value ? (
              <EndesignIconComponent icon={value as IEndesignIcon} />
            ) : (
              <Typography
                variant="pi"
                style={{ cursor: "pointer", marginTop: "5px" }}
              >
                <Plus />
              </Typography>
            )}
          </FieldAction>
        }
        endAction={
          !!value && (
            <FieldAction onClick={() => changeIcon("")}>
              <Typography variant="pi">Clear</Typography>
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
                              allEndesignIconNames.filter((icon) =>
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
                                placeholder="Search"
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
                            icons={allEndesignIconNames.filter((icon) =>
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
