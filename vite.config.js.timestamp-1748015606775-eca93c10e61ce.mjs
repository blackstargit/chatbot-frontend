// vite.config.js
import { defineConfig } from "file:///D:/Projects/noforn.ai-clone/project-frontends/alphabase-embed/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "url";

// postcss.config.js
import tailwind from "file:///D:/Projects/noforn.ai-clone/project-frontends/alphabase-embed/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/Projects/noforn.ai-clone/project-frontends/alphabase-embed/node_modules/autoprefixer/lib/autoprefixer.js";

// tailwind.config.js
var tailwind_config_default = {
  darkMode: "false",
  prefix: "allm-",
  corePlugins: {
    preflight: false
  },
  content: {
    relative: true,
    files: [
      "./src/components/**/*.{js,jsx}",
      "./src/hooks/**/*.js",
      "./src/models/**/*.js",
      "./src/pages/**/*.{js,jsx}",
      "./src/utils/**/*.js",
      "./src/*.jsx",
      "./index.html"
    ]
  },
  theme: {
    extend: {
      rotate: {
        "270": "270deg",
        "360": "360deg"
      },
      colors: {
        "black-900": "#141414",
        accent: "#3D4147",
        "sidebar-button": "#31353A",
        sidebar: "#25272C",
        "historical-msg-system": "rgba(255, 255, 255, 0.05);",
        "historical-msg-user": "#2C2F35",
        outline: "#4E5153",
        "primary-button": "#46C8FF",
        secondary: "#2C2F36",
        "dark-input": "#18181B",
        "mobile-onboarding": "#2C2F35",
        "dark-highlight": "#1C1E21",
        "dark-text": "#222628",
        description: "#D2D5DB",
        "x-button": "#9CA3AF",
        "black-text": "#1C1C1C",
        "white-text": "#FAFAFA",
        "subtitle": "#737373",
        // Background Colors
        "user-message-bg": "#020918",
        "system-message-bg": "#f2f2f2"
      },
      backgroundImage: {
        "preference-gradient": "linear-gradient(180deg, #5A5C63 0%, rgba(90, 92, 99, 0.28) 100%);",
        "chat-msg-user-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%);",
        "selected-preference-gradient": "linear-gradient(180deg, #313236 0%, rgba(63.40, 64.90, 70.13, 0) 100%);",
        "main-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "modal-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "sidebar-gradient": "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "login-gradient": "linear-gradient(180deg, #3D4147 0%, #2C2F35 100%)",
        "menu-item-gradient": "linear-gradient(90deg, #3D4147 0%, #2C2F35 100%)",
        "menu-item-selected-gradient": "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "workspace-item-gradient": "linear-gradient(90deg, #3D4147 0%, #2C2F35 100%)",
        "workspace-item-selected-gradient": "linear-gradient(90deg, #5B616A 0%, #3F434B 100%)",
        "switch-selected": "linear-gradient(146deg, #5B616A 0%, #3F434B 100%)"
      },
      fontFamily: {
        sans: [
          "roboto",
          "plus-jakarta-sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ]
      },
      fontSize: {
        "xs": "13px",
        "sm": "14px",
        "md": "16px",
        "xl": "20px",
        "3xl": "28px"
      },
      animation: {
        sweep: "sweep 0.5s ease-in-out"
      },
      keyframes: {
        sweep: {
          "0%": { transform: "scaleX(0)", transformOrigin: "bottom left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "bottom left" }
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 }
        }
      }
    }
  },
  plugins: []
};

// postcss.config.js
var postcss_config_default = {
  plugins: [
    tailwind(tailwind_config_default),
    autoprefixer
  ]
};

// vite.config.js
import react from "file:///D:/Projects/noforn.ai-clone/project-frontends/alphabase-embed/node_modules/@vitejs/plugin-react/dist/index.mjs";
import image from "file:///D:/Projects/noforn.ai-clone/project-frontends/alphabase-embed/node_modules/@rollup/plugin-image/dist/es/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/Projects/noforn.ai-clone/project-frontends/alphabase-embed/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [react(), image()],
  define: {
    // In dev, we need to disable this, but in prod, we need to enable it
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  css: {
    postcss: postcss_config_default
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      },
      {
        process: "process/browser",
        stream: "stream-browserify",
        zlib: "browserify-zlib",
        util: "util",
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        }
      }
    ]
  },
  build: {
    lib: {
      entry: "src/main.jsx",
      name: "EmbeddedAnythingLLM",
      formats: ["umd"],
      fileName: (_format) => `anythingllm-chat-widget.js`
    },
    rollupOptions: {
      external: [
        // Reduces transformation time by 50% and we don't even use this variant, so we can ignore.
        /@phosphor-icons\/react\/dist\/ssr/
      ]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    },
    cssCodeSplit: false,
    assetsInlineLimit: 1e8,
    minify: "esbuild",
    outDir: "dist",
    emptyOutDir: true,
    inlineDynamicImports: true,
    assetsDir: "",
    sourcemap: "inline"
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      },
      plugins: []
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicG9zdGNzcy5jb25maWcuanMiLCAidGFpbHdpbmQuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcbm9mb3JuLmFpLWNsb25lXFxcXHByb2plY3QtZnJvbnRlbmRzXFxcXGFscGhhYmFzZS1lbWJlZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcbm9mb3JuLmFpLWNsb25lXFxcXHByb2plY3QtZnJvbnRlbmRzXFxcXGFscGhhYmFzZS1lbWJlZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUHJvamVjdHMvbm9mb3JuLmFpLWNsb25lL3Byb2plY3QtZnJvbnRlbmRzL2FscGhhYmFzZS1lbWJlZC92aXRlLmNvbmZpZy5qc1wiOy8vIHZpdGUuY29uZmlnLmpzXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcInVybFwiXHJcbmltcG9ydCBwb3N0Y3NzIGZyb20gXCIuL3Bvc3Rjc3MuY29uZmlnLmpzXCJcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiXHJcbmltcG9ydCBpbWFnZSBmcm9tIFwiQHJvbGx1cC9wbHVnaW4taW1hZ2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgaW1hZ2UoKV0sXHJcbiAgZGVmaW5lOiB7XHJcbiAgICAvLyBJbiBkZXYsIHdlIG5lZWQgdG8gZGlzYWJsZSB0aGlzLCBidXQgaW4gcHJvZCwgd2UgbmVlZCB0byBlbmFibGUgaXRcclxuICAgIFwicHJvY2Vzcy5lbnYuTk9ERV9FTlZcIjogSlNPTi5zdHJpbmdpZnkoXCJwcm9kdWN0aW9uXCIpXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHBvc3Rjc3NcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiBcIkBcIixcclxuICAgICAgICByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHByb2Nlc3M6IFwicHJvY2Vzcy9icm93c2VyXCIsXHJcbiAgICAgICAgc3RyZWFtOiBcInN0cmVhbS1icm93c2VyaWZ5XCIsXHJcbiAgICAgICAgemxpYjogXCJicm93c2VyaWZ5LXpsaWJcIixcclxuICAgICAgICB1dGlsOiBcInV0aWxcIixcclxuICAgICAgICBmaW5kOiAvXn4uKy8sXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6ICh2YWwpID0+IHtcclxuICAgICAgICAgIHJldHVybiB2YWwucmVwbGFjZSgvXn4vLCBcIlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogXCJzcmMvbWFpbi5qc3hcIixcclxuICAgICAgbmFtZTogXCJFbWJlZGRlZEFueXRoaW5nTExNXCIsXHJcbiAgICAgIGZvcm1hdHM6IFtcInVtZFwiXSxcclxuICAgICAgZmlsZU5hbWU6IChfZm9ybWF0KSA9PiBgYW55dGhpbmdsbG0tY2hhdC13aWRnZXQuanNgXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgIC8vIFJlZHVjZXMgdHJhbnNmb3JtYXRpb24gdGltZSBieSA1MCUgYW5kIHdlIGRvbid0IGV2ZW4gdXNlIHRoaXMgdmFyaWFudCwgc28gd2UgY2FuIGlnbm9yZS5cclxuICAgICAgICAvQHBob3NwaG9yLWljb25zXFwvcmVhY3RcXC9kaXN0XFwvc3NyL1xyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgY29tbW9uanNPcHRpb25zOiB7XHJcbiAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcclxuICAgIGFzc2V0c0lubGluZUxpbWl0OiAxMDAwMDAwMDAsXHJcbiAgICBtaW5pZnk6IFwiZXNidWlsZFwiLFxyXG4gICAgb3V0RGlyOiBcImRpc3RcIixcclxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgaW5saW5lRHluYW1pY0ltcG9ydHM6IHRydWUsXHJcbiAgICBhc3NldHNEaXI6IFwiXCIsXHJcbiAgICBzb3VyY2VtYXA6IFwiaW5saW5lXCJcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcclxuICAgICAgZGVmaW5lOiB7XHJcbiAgICAgICAgZ2xvYmFsOiBcImdsb2JhbFRoaXNcIlxyXG4gICAgICB9LFxyXG4gICAgICBwbHVnaW5zOiBbXVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxub2Zvcm4uYWktY2xvbmVcXFxccHJvamVjdC1mcm9udGVuZHNcXFxcYWxwaGFiYXNlLWVtYmVkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxub2Zvcm4uYWktY2xvbmVcXFxccHJvamVjdC1mcm9udGVuZHNcXFxcYWxwaGFiYXNlLWVtYmVkXFxcXHBvc3Rjc3MuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9ub2Zvcm4uYWktY2xvbmUvcHJvamVjdC1mcm9udGVuZHMvYWxwaGFiYXNlLWVtYmVkL3Bvc3Rjc3MuY29uZmlnLmpzXCI7aW1wb3J0IHRhaWx3aW5kIGZyb20gJ3RhaWx3aW5kY3NzJ1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcclxuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gJy4vdGFpbHdpbmQuY29uZmlnLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHRhaWx3aW5kKHRhaWx3aW5kQ29uZmlnKSxcclxuICAgIGF1dG9wcmVmaXhlcixcclxuICBdLFxyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxub2Zvcm4uYWktY2xvbmVcXFxccHJvamVjdC1mcm9udGVuZHNcXFxcYWxwaGFiYXNlLWVtYmVkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxub2Zvcm4uYWktY2xvbmVcXFxccHJvamVjdC1mcm9udGVuZHNcXFxcYWxwaGFiYXNlLWVtYmVkXFxcXHRhaWx3aW5kLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUHJvamVjdHMvbm9mb3JuLmFpLWNsb25lL3Byb2plY3QtZnJvbnRlbmRzL2FscGhhYmFzZS1lbWJlZC90YWlsd2luZC5jb25maWcuanNcIjsvKiogQHR5cGUge2ltcG9ydCgndGFpbHdpbmRjc3MnKS5Db25maWd9ICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkYXJrTW9kZTogJ2ZhbHNlJyxcclxuICBwcmVmaXg6ICdhbGxtLScsXHJcbiAgY29yZVBsdWdpbnM6IHtcclxuICAgIHByZWZsaWdodDogZmFsc2UsXHJcbiAgfSxcclxuICBjb250ZW50OiB7XHJcbiAgICByZWxhdGl2ZTogdHJ1ZSxcclxuICAgIGZpbGVzOiBbXHJcbiAgICAgIFwiLi9zcmMvY29tcG9uZW50cy8qKi8qLntqcyxqc3h9XCIsXHJcbiAgICAgIFwiLi9zcmMvaG9va3MvKiovKi5qc1wiLFxyXG4gICAgICBcIi4vc3JjL21vZGVscy8qKi8qLmpzXCIsXHJcbiAgICAgIFwiLi9zcmMvcGFnZXMvKiovKi57anMsanN4fVwiLFxyXG4gICAgICBcIi4vc3JjL3V0aWxzLyoqLyouanNcIixcclxuICAgICAgXCIuL3NyYy8qLmpzeFwiLFxyXG4gICAgICBcIi4vaW5kZXguaHRtbFwiLFxyXG4gICAgXVxyXG4gIH0sXHJcbiAgdGhlbWU6IHtcclxuICAgIGV4dGVuZDoge1xyXG4gICAgICByb3RhdGU6IHtcclxuICAgICAgICBcIjI3MFwiOiBcIjI3MGRlZ1wiLFxyXG4gICAgICAgIFwiMzYwXCI6IFwiMzYwZGVnXCJcclxuICAgICAgfSxcclxuICAgICAgY29sb3JzOiB7XHJcbiAgICAgICAgXCJibGFjay05MDBcIjogXCIjMTQxNDE0XCIsXHJcbiAgICAgICAgYWNjZW50OiBcIiMzRDQxNDdcIixcclxuICAgICAgICBcInNpZGViYXItYnV0dG9uXCI6IFwiIzMxMzUzQVwiLFxyXG4gICAgICAgIHNpZGViYXI6IFwiIzI1MjcyQ1wiLFxyXG4gICAgICAgIFwiaGlzdG9yaWNhbC1tc2ctc3lzdGVtXCI6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcIixcclxuICAgICAgICBcImhpc3RvcmljYWwtbXNnLXVzZXJcIjogXCIjMkMyRjM1XCIsXHJcbiAgICAgICAgb3V0bGluZTogXCIjNEU1MTUzXCIsXHJcbiAgICAgICAgXCJwcmltYXJ5LWJ1dHRvblwiOiBcIiM0NkM4RkZcIixcclxuICAgICAgICBzZWNvbmRhcnk6IFwiIzJDMkYzNlwiLFxyXG4gICAgICAgIFwiZGFyay1pbnB1dFwiOiBcIiMxODE4MUJcIixcclxuICAgICAgICBcIm1vYmlsZS1vbmJvYXJkaW5nXCI6IFwiIzJDMkYzNVwiLFxyXG4gICAgICAgIFwiZGFyay1oaWdobGlnaHRcIjogXCIjMUMxRTIxXCIsXHJcbiAgICAgICAgXCJkYXJrLXRleHRcIjogXCIjMjIyNjI4XCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiI0QyRDVEQlwiLFxyXG4gICAgICAgIFwieC1idXR0b25cIjogXCIjOUNBM0FGXCIsXHJcblxyXG4gICAgICAgICdibGFjay10ZXh0JzogJyMxQzFDMUMnLFxyXG4gICAgICAgICd3aGl0ZS10ZXh0JzogJyNGQUZBRkEnLFxyXG4gICAgICAgICdzdWJ0aXRsZSc6ICcjNzM3MzczJyxcclxuXHJcbiAgICAgICAgLy8gQmFja2dyb3VuZCBDb2xvcnNcclxuICAgICAgICAndXNlci1tZXNzYWdlLWJnJzogJyMwMjA5MTgnLFxyXG4gICAgICAgICdzeXN0ZW0tbWVzc2FnZS1iZyc6ICcjZjJmMmYyJyxcclxuICAgICAgfSxcclxuICAgICAgYmFja2dyb3VuZEltYWdlOiB7XHJcbiAgICAgICAgXCJwcmVmZXJlbmNlLWdyYWRpZW50XCI6XHJcbiAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCgxODBkZWcsICM1QTVDNjMgMCUsIHJnYmEoOTAsIDkyLCA5OSwgMC4yOCkgMTAwJSk7XCIsXHJcbiAgICAgICAgXCJjaGF0LW1zZy11c2VyLWdyYWRpZW50XCI6XHJcbiAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCgxODBkZWcsICMzRDQxNDcgMCUsICMyQzJGMzUgMTAwJSk7XCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1wcmVmZXJlbmNlLWdyYWRpZW50XCI6XHJcbiAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCgxODBkZWcsICMzMTMyMzYgMCUsIHJnYmEoNjMuNDAsIDY0LjkwLCA3MC4xMywgMCkgMTAwJSk7XCIsXHJcbiAgICAgICAgXCJtYWluLWdyYWRpZW50XCI6IFwibGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzNENDE0NyAwJSwgIzJDMkYzNSAxMDAlKVwiLFxyXG4gICAgICAgIFwibW9kYWwtZ3JhZGllbnRcIjogXCJsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjM0Q0MTQ3IDAlLCAjMkMyRjM1IDEwMCUpXCIsXHJcbiAgICAgICAgXCJzaWRlYmFyLWdyYWRpZW50XCI6IFwibGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNUI2MTZBIDAlLCAjM0Y0MzRCIDEwMCUpXCIsXHJcbiAgICAgICAgXCJsb2dpbi1ncmFkaWVudFwiOiBcImxpbmVhci1ncmFkaWVudCgxODBkZWcsICMzRDQxNDcgMCUsICMyQzJGMzUgMTAwJSlcIixcclxuICAgICAgICBcIm1lbnUtaXRlbS1ncmFkaWVudFwiOlxyXG4gICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMzRDQxNDcgMCUsICMyQzJGMzUgMTAwJSlcIixcclxuICAgICAgICBcIm1lbnUtaXRlbS1zZWxlY3RlZC1ncmFkaWVudFwiOlxyXG4gICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM1QjYxNkEgMCUsICMzRjQzNEIgMTAwJSlcIixcclxuICAgICAgICBcIndvcmtzcGFjZS1pdGVtLWdyYWRpZW50XCI6XHJcbiAgICAgICAgICBcImxpbmVhci1ncmFkaWVudCg5MGRlZywgIzNENDE0NyAwJSwgIzJDMkYzNSAxMDAlKVwiLFxyXG4gICAgICAgIFwid29ya3NwYWNlLWl0ZW0tc2VsZWN0ZWQtZ3JhZGllbnRcIjpcclxuICAgICAgICAgIFwibGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNUI2MTZBIDAlLCAjM0Y0MzRCIDEwMCUpXCIsXHJcbiAgICAgICAgXCJzd2l0Y2gtc2VsZWN0ZWRcIjogXCJsaW5lYXItZ3JhZGllbnQoMTQ2ZGVnLCAjNUI2MTZBIDAlLCAjM0Y0MzRCIDEwMCUpXCJcclxuICAgICAgfSxcclxuICAgICAgZm9udEZhbWlseToge1xyXG4gICAgICAgIHNhbnM6IFtcclxuICAgICAgICAgIFwicm9ib3RvXCIsXHJcbiAgICAgICAgICBcInBsdXMtamFrYXJ0YS1zYW5zXCIsXHJcbiAgICAgICAgICBcInVpLXNhbnMtc2VyaWZcIixcclxuICAgICAgICAgIFwic3lzdGVtLXVpXCIsXHJcbiAgICAgICAgICBcIi1hcHBsZS1zeXN0ZW1cIixcclxuICAgICAgICAgIFwiQmxpbmtNYWNTeXN0ZW1Gb250XCIsXHJcbiAgICAgICAgICAnU2Vnb2UgVUknLFxyXG4gICAgICAgICAgJ0hlbHZldGljYSBOZXVlJyxcclxuICAgICAgICAgIFwiQXJpYWxcIixcclxuICAgICAgICAgICdOb3RvIFNhbnMnLFxyXG4gICAgICAgICAgXCJzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAnQXBwbGUgQ29sb3IgRW1vamknLFxyXG4gICAgICAgICAgJ1NlZ29lIFVJIEVtb2ppJyxcclxuICAgICAgICAgICdTZWdvZSBVSSBTeW1ib2wnLFxyXG4gICAgICAgICAgJ05vdG8gQ29sb3IgRW1vamknXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBmb250U2l6ZTp7XHJcbiAgICAgICAgJ3hzJzogJzEzcHgnLFxyXG4gICAgICAgICdzbSc6ICcxNHB4JyxcclxuICAgICAgICAnbWQnOiAnMTZweCcsXHJcbiAgICAgICAgJ3hsJzogJzIwcHgnLFxyXG4gICAgICAgICczeGwnOiAnMjhweCcsXHJcbiAgICAgIH0sXHJcbiAgICAgIGFuaW1hdGlvbjoge1xyXG4gICAgICAgIHN3ZWVwOiBcInN3ZWVwIDAuNXMgZWFzZS1pbi1vdXRcIlxyXG4gICAgICB9LFxyXG4gICAgICBrZXlmcmFtZXM6IHtcclxuICAgICAgICBzd2VlcDoge1xyXG4gICAgICAgICAgXCIwJVwiOiB7IHRyYW5zZm9ybTogXCJzY2FsZVgoMClcIiwgdHJhbnNmb3JtT3JpZ2luOiBcImJvdHRvbSBsZWZ0XCIgfSxcclxuICAgICAgICAgIFwiMTAwJVwiOiB7IHRyYW5zZm9ybTogXCJzY2FsZVgoMSlcIiwgdHJhbnNmb3JtT3JpZ2luOiBcImJvdHRvbSBsZWZ0XCIgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFkZUluOiB7XHJcbiAgICAgICAgICBcIjAlXCI6IHsgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgXCIxMDAlXCI6IHsgb3BhY2l0eTogMSB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWRlT3V0OiB7XHJcbiAgICAgICAgICBcIjAlXCI6IHsgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgXCIxMDAlXCI6IHsgb3BhY2l0eTogMCB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWUsV0FBVzs7O0FDRnNWLE9BQU8sY0FBYztBQUM5WSxPQUFPLGtCQUFrQjs7O0FDQXpCLElBQU8sMEJBQVE7QUFBQSxFQUNiLFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLGFBQWE7QUFBQSxJQUNYLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFFBQ1Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QseUJBQXlCO0FBQUEsUUFDekIsdUJBQXVCO0FBQUEsUUFDdkIsU0FBUztBQUFBLFFBQ1Qsa0JBQWtCO0FBQUEsUUFDbEIsV0FBVztBQUFBLFFBQ1gsY0FBYztBQUFBLFFBQ2QscUJBQXFCO0FBQUEsUUFDckIsa0JBQWtCO0FBQUEsUUFDbEIsYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsWUFBWTtB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
