import { renderToStaticMarkup } from "react-dom/server";
import { createElement as h } from "react";
import { WorkRateExplorer } from "../content/interactives/2-7-applications";
console.log(renderToStaticMarkup(h(WorkRateExplorer)).slice(0,100));
