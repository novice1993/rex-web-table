import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { unlinkSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
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
