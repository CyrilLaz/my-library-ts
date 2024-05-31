import { cp } from "shelljs";

// Copy all the view templates
cp("-Ru", "src/views", "dist/views");
cp("-Ru", "src/public", "dist/public"); 
