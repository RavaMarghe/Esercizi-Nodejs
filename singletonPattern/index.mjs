import "./script1.mjs"
import "./script2.mjs"

import { myCounter } from "./output.mjs"

myCounter.increment();

console.log("count:", myCounter.count)
