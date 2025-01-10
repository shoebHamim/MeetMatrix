import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
				dark:{
					1:'#1c1f2e',
					2:'#161925'
				},
				blue:{
					1:"#0e78f9"
				},
				orange:{
					1:"#ff742e"
				},
				purple:{
					1:"#830ef9"
				},
				yellow:{
					1:"#f9a90e"
				}

  		},
			backgroundImage:{
				hero:'url("/images/hero-background.png")'
			}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
