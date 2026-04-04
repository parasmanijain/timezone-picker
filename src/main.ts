import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

// ES6+ Arrow function with proper error handling
bootstrapApplication(AppComponent).catch((err) => {
  console.error("Application bootstrap failed:", err);
});
