export default {
    files: ["src/test/*.test.ts"],
    typescript: {
        rewritePaths: {
            "src/": "dist/",
        },
        compile: "tsc",
    },
};
