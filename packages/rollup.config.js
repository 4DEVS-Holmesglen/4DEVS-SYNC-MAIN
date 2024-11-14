import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import url from "rollup-plugin-url";
export default [
  {
    input: "src/index.js",

    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".js", ".jsx"],
      }),
      commonjs(),
      terser(),
      postcss({
        plugins: [".css", ".scss"],
        minimize: true,
        extract: true,
      }),
      url({
        include: ["**/*.ttf"],

        limit: 10 * 1024,
      }),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        presets: ["@babel/preset-react"],
      }),
    ],
    external: ["react", "styled-components", "react-dom"],
  },
];
