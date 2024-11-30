import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'Chrome',
            use: {
                browserName: 'chromium',
                channel: 'chrome', 
                headless: false,  // Set to false to watch the test in action
            },
        },
    ],
    timeout: 60000, // Extend timeout for test execution
    retries: 1, // Retry failed tests once
});