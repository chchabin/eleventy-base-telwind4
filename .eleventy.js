const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const tailwindcssPlugin = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/assets");

    eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
        postcss([
            tailwindcssPlugin() // Tailwind v4 n'a plus besoin de configuration explicite
        ])
            .process(cssCode, {
                from: './src/assets/css/styles.css',
                to: './dist/css/styles.css'
            })
            .then(
                (result) => done(null, result.css),
                (error) => {
                    console.error('Erreur PostCSS:', error);
                    done(error, null);
                }
            );
    });
    eleventyConfig.addWatchTarget('assets/css/**/*.css');

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
}
