import { Strapi } from "@strapi/strapi";

export default async ({ strapi }: { strapi: Strapi }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Access endesign-icons menu",
      uid: "read",
      pluginName: "strapi-endesign-icons",
    },
  ];

  await (strapi as any).admin?.services.permission.actionProvider.registerMany(
    actions
  );
};
