/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts,js,tsx,jsx}", "./*.{html,ts,js,tsx,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                custom: "Roboto Mono, monospace",
            },
            borderColor: {
                "custom-01": "rgba(35, 33, 33, 0.2)",
            },
            height: {
                screenDvh: "100dvh",
            },
        },
    },
};
