import { PageAnimation, CardsAnimation, TextAnimation } from "./animations.js";

await new PageAnimation().load();
await new TextAnimation().load();
new CardsAnimation().load();
