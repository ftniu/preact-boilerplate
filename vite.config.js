import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import {visualizer} from "rollup-plugin-visualizer";

const plugins = [];
 
// 打包生产环境才引入的插件
if (process.env.NODE_ENV === "production") {
    // 打包依赖展示
    plugins.push(
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        })
    );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    ...plugins
  ],
  base: '/preact-boilerplate/'
});