import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  build: {
    sourcemap: false,
    lib: {
      entry: "src/index.ts",
      name: "Vue Package Starter",
      formats: ["es", "umd"],
      fileName: (format: string) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "src",
      outDir: "dist/types",
      cleanVueFileName: true,
      include: ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"],
    }),
  ],
});
