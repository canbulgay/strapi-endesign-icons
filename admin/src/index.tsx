import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import { EnIcon, EnCuzdanimIcon } from "./components/PluginIcon";

const name = "strapi-endesign-icons";

export default {
  register(app: any) {
    try {
      app.customFields.register({
        name: name,
        pluginId: pluginId,
        icon: EnIcon,
        type: "string",
        intlLabel: {
          id: `${pluginId}.field.label`,
          defaultMessage: "Endesign Icon",
        },
        intlDescription: {
          id: `${pluginId}.field.description`,
          defaultMessage: "Select an endesign icon",
        },
        components: {
          Input: async () =>
            import(
              /* webpackChunkName: "endesign-icons" */ "./components/EndesignIconSelector"
            ),
        },
        options: {
          advanced: [
            {
              sectionTitle: {
                id: `${pluginId}.section-title.settings`,
                defaultMessage: "Settings",
              },
              items: [
                {
                  name: "required",
                  type: "checkbox",
                  intlLabel: {
                    defaultMessage: "Required field",
                  },
                  description: {
                    defaultMessage:
                      "You won't be able to create an entry if this field is empty",
                  },
                },
              ],
            },
          ],
        },
      });

      app.addMenuLink({
        to: `/plugins/${pluginId}`,
        icon: EnCuzdanimIcon,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: name,
        },
        Component: async () => {
          const component = await import(
            /* webpackChunkName: "[request]" */ "./pages/App"
          );

          return component;
        },
        permissions: [
          // Uncomment to set the permissions of the plugin here
          // {
          //   action: '', // the action name should be plugin::plugin-name.actionType
          //   subject: null,
          // },
        ],
      });
      const plugin = {
        id: pluginId,
        initializer: Initializer,
        isReady: false,
        name,
      };

      app.registerPlugin(plugin);
    } catch (error) {
      console.log("error", error);
    }
  },

  bootstrap(app: any) {
    // app.injectContentManagerComponent("editView", "ui-base-component", {
    //   component: async () => {
    //     const component = await import(
    //       /* webpackChunkName: "endesign-icons" */ "./components/EndesignIconSelector"
    //     );
    //     return component;
    //   },
    //   name,
    // });
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
