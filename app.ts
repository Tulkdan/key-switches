import { serve } from "./deps.ts"
import { handleSwitches } from "./src/handlers.ts";

serve({
  "/switches": handleSwitches,
});
