import { PageAnimation, CardsAnimation, TextAnimation } from "./animations.js";
import { Game } from "./game.js";

// await new PageAnimation().load();
await new TextAnimation().load();
await new CardsAnimation().load();
const game = new Game();

game.init();
