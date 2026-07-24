import {
  relationships,
  validateNavigationGraph,
} from "../src/data/navigation.ts";

validateNavigationGraph();

console.log(
  `Validated ${relationships.length} curated artifact relationships with stable destination IDs.`,
);
