import { Strapi } from "@strapi/strapi";
import pluginId from "../admin/src/pluginId";
import pluginPkg from "../package.json";

export default ({ strapi }: { strapi: Strapi }) => {
  const name = pluginPkg.strapi.name || "strapi-endesign-icons";
  strapi.customFields.register({
    name: name,
    plugin: pluginId,
    type: "string",
  });
};
