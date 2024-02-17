/**
 * Linearly interpolates between two colors.
 * @param {number[]} color1 - The first color in RGB format.
 * @param {number[]} color2 - The second color in RGB format.
 * @param {number} t - The interpolation value between 0 and 1.
 * @returns {string} The interpolated color in RGB format.
 */
const lerpColor = (color1, color2, t) => {
    let r = color1[0] + t * (color2[0] - color1[0]);
    let g = color1[1] + t * (color2[1] - color1[1]);
    let b = color1[2] + t * (color2[2] - color1[2]);
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Calculates the color of the thumb based on the given value and scale.
 * @param {number} value - The value to calculate the color for.
 * @param {object} scale - The scale object containing scaleMin, scaleMax, startColor, midColor, and endColor.
 * @returns {string} The calculated color of the thumb.
 */
const calculateThumbColor = (value, scale) => {
    let t = (value-scale.scaleMin) / (scale.scaleMax-scale.scaleMin); // normalize value
    if (t < 0.5) {
        return lerpColor(scale.startColor, scale.midColor, t*2); // lerp from startColor to midColor
    }
    else {
        return lerpColor(scale.midColor, scale.endColor, (t-0.5)*2); // lerp from midColor to endColor
    }
}

/**
 * Calculates the opacity values based on the given value and scale.
 * @param {number} value - The value to calculate the opacity for.
 * @param {object} scale - The scale object containing the minimum and maximum values.
 * @returns {number[]} An array of opacity values [opacityMin, opacityMid, opacityMax].
 */
const setOpacity = (value, scale) => {
    let t = (value-scale.scaleMin) / (scale.scaleMax-scale.scaleMin); // normalize value
    let opacityMin = 0.2;
    let opacityMax = 0.2;
    let opacityMid = 0.2;
    if (t < 0.5) {
        opacityMid += (0.8 * t * 2);
        opacityMin += (0.8 * (1 - t * 2)); 
    } else {
        opacityMax += (0.8 * (t - 0.5) * 2);
        opacityMid += (0.8 * (1 - (t - 0.5) * 2));
    }
    return [opacityMin, opacityMid, opacityMax];
}


export {calculateThumbColor, setOpacity, lerpColor};