import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { unlinkSync } from "fs";
import { dirname, resolve } from "path";

// __dirname 대신 dirname과 resolve를 사용하여 경로 처리
const __dirname = dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // 경로 통일성 있게 변경
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "./src/index.ts"), // 경로 통일성 있게 변경
      name: "RexWebTable",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      plugins: [
        {
          name: "delete-unnecessary-files",
          closeBundle() {
            const filesToDelete = [
              resolve(__dirname, "dist/App.d.ts"),
              resolve(__dirname, "dist/main.d.ts"),
            ];
            filesToDelete.forEach((file) => {
              try {
                unlinkSync(file);
                console.log(`Deleted: ${file}`);
              } catch (err) {
                console.error(`Error deleting ${file}:`, err);
              }
            });
          },
        },
      ],
    },
  },
});
