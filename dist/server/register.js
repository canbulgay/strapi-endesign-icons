"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pluginId_1 = __importDefault(require("../admin/src/pluginId"));
const package_json_1 = __importDefault(require("../package.json"));
exports.default = ({ strapi }) => {
    const name = package_json_1.default.strapi.name || "strapi-endesign-icons";
    strapi.customFields.register({
        name: name,
        plugin: pluginId_1.default,
        type: "string",
    });
};
