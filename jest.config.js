module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,
    setupFilesAfterEnv: [
        "./Ex-createServer/src/lib/prisma/client.mock.ts",
        "./Ex-createServer/src/lib/middleware/multer.mock.ts",
    ],
};
