import gulp from "gulp";
import concurrently from "concurrently";
import { exec } from "gulp-execa";

// Install dependencies in all MFEs
export const installMFEs = async () => {
  try {
    await concurrently([
      {
        command: "npm install",
        cwd: "./mfe/angular-timeline-mfe",
        name: "install-angular",
      },
      //   {
      //     command: "npm install",
      //     cwd: "./mfe/vue-projects-mfe",
      //     name: "install-vue",
      //   },
      //   {
      //     command: "npm install",
      //     cwd: "./mfe/svelte-contact-mfe",
      //     name: "install-svelte",
      //   },
    ]);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

// Start development server
export const dev = gulp.series(installMFEs, async () => {
  return concurrently([
    {
      command: "webpack serve --config webpack.config.ts",
      name: "portfolio",
      cwd: ".",
    },
    {
      command: "npm run start",
      name: "angular-mfe",
      cwd: "./mfe/angular-timeline-mfe",
    },
  ]);
});

export const build = async () => exec("webpack --config webpack.config.ts");

export default dev;
