import * as React from "react";

// thanks! https://github.com/Microsoft/TypeScript/issues/3402
// type Weaken<T, K extends keyof T> = {
//     [P in keyof T]: P extends K ? any : T[P];
//   };