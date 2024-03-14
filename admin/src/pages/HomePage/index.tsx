/*
 *
 * HomePage
 *
 */

import React from "react";
import pluginId from "../../pluginId";
import * as Icons from "@enuygun/icons";
import { Row, Col } from "@enuygun/design-system";

const HomePage = () => {
  const icons = Object.values(Icons);
  const names = Object.keys(Icons);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "48px 0 0 96px",
      }}
    >
      <Row justify="flex-end">
        {icons?.map((IconComponent, i) => (
          <Col md={2} xl={3} lg={3} style={{}}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconComponent width={32} height={32} />
              <p style={{ marginLeft: "24px" }}>{names[i]}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
