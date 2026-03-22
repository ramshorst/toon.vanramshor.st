"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type ThemeVariant = { backgroundColor: string; borderColor: string; boxShadow: string };

export type ButtonTheme = {
    swatch: string;
    text: string;
    rest:    ThemeVariant;
    hover:   ThemeVariant;
    pressed: ThemeVariant;
    darkText: string;
    darkRest:    ThemeVariant;
    darkHover:   ThemeVariant;
    darkPressed: ThemeVariant;
};

export const BUTTON_THEMES: ButtonTheme[] = [
    {
        swatch: "rgb(148, 165, 88)",
        text: "rgb(42, 48, 18)",
        rest:    { backgroundColor: "rgb(250, 253, 244)", borderColor: "rgb(205, 216, 178)", boxShadow: "rgba(30, 45, 5, 0.06) 0px 4px 3px 0px, rgb(222, 233, 196) 0px -5px 0px 0px inset" },
        hover:   { backgroundColor: "rgb(238, 244, 218)", borderColor: "rgb(172, 185, 130)", boxShadow: "rgba(30, 45, 5, 0.07) 0px 4px 3px 0px, rgb(205, 218, 165) 0px -5px 0px 0px inset" },
        pressed: { backgroundColor: "rgb(224, 234, 190)", borderColor: "rgb(148, 165, 100)", boxShadow: "rgba(30, 45, 5, 0.03) 0px 1px 1px 0px, rgb(185, 202, 138) 0px -2px 0px 0px inset" },
        darkText: "rgb(185, 210, 120)",
        darkRest:    { backgroundColor: "rgb(20, 28, 8)",  borderColor: "rgb(36, 49, 13)",  boxShadow: "rgba(0,0,0,0.4) 0px 4px 3px 0px, rgb(38, 52, 14) 0px -5px 0px 0px inset" },
        darkHover:   { backgroundColor: "rgb(28, 38, 10)", borderColor: "rgb(46, 60, 18)",  boxShadow: "rgba(0,0,0,0.45) 0px 4px 3px 0px, rgb(47, 61, 17) 0px -5px 0px 0px inset" },
        darkPressed: { backgroundColor: "rgb(33, 44, 12)", borderColor: "rgb(52, 67, 21)",  boxShadow: "rgba(0,0,0,0.25) 0px 1px 1px 0px, rgb(45, 56, 15) 0px -2px 0px 0px inset" },
    },
    {
        swatch: "rgb(120, 155, 205)",
        text: "rgb(18, 35, 70)",
        rest:    { backgroundColor: "rgb(246, 249, 255)", borderColor: "rgb(185, 205, 235)", boxShadow: "rgba(10, 25, 70, 0.06) 0px 4px 3px 0px, rgb(215, 228, 248) 0px -5px 0px 0px inset" },
        hover:   { backgroundColor: "rgb(225, 235, 252)", borderColor: "rgb(148, 175, 225)", boxShadow: "rgba(10, 25, 70, 0.07) 0px 4px 3px 0px, rgb(188, 208, 245) 0px -5px 0px 0px inset" },
        pressed: { backgroundColor: "rgb(210, 224, 248)", borderColor: "rgb(118, 148, 208)", boxShadow: "rgba(10, 25, 70, 0.03) 0px 1px 1px 0px, rgb(165, 190, 238) 0px -2px 0px 0px inset" },
        darkText: "rgb(150, 185, 235)",
        darkRest:    { backgroundColor: "rgb(10, 18, 40)",  borderColor: "rgb(20, 36, 65)",   boxShadow: "rgba(0,0,0,0.4) 0px 4px 3px 0px, rgb(24, 38, 69) 0px -5px 0px 0px inset" },
        darkHover:   { backgroundColor: "rgb(15, 25, 52)",  borderColor: "rgb(26, 46, 78)",   boxShadow: "rgba(0,0,0,0.45) 0px 4px 3px 0px, rgb(30, 47, 82) 0px -5px 0px 0px inset" },
        darkPressed: { backgroundColor: "rgb(20, 31, 60)",  borderColor: "rgb(32, 53, 88)",   boxShadow: "rgba(0,0,0,0.25) 0px 1px 1px 0px, rgb(33, 49, 79) 0px -2px 0px 0px inset" },
    },
    {
        swatch: "rgb(210, 140, 158)",
        text: "rgb(58, 22, 32)",
        rest:    { backgroundColor: "rgb(255, 248, 250)", borderColor: "rgb(235, 198, 208)", boxShadow: "rgba(70, 15, 25, 0.06) 0px 4px 3px 0px, rgb(248, 222, 230) 0px -5px 0px 0px inset" },
        hover:   { backgroundColor: "rgb(250, 228, 235)", borderColor: "rgb(220, 165, 180)", boxShadow: "rgba(70, 15, 25, 0.07) 0px 4px 3px 0px, rgb(238, 198, 210) 0px -5px 0px 0px inset" },
        pressed: { backgroundColor: "rgb(244, 212, 222)", borderColor: "rgb(198, 138, 155)", boxShadow: "rgba(70, 15, 25, 0.03) 0px 1px 1px 0px, rgb(225, 178, 195) 0px -2px 0px 0px inset" },
        darkText: "rgb(235, 170, 185)",
        darkRest:    { backgroundColor: "rgb(35, 10, 18)",  borderColor: "rgb(55, 20, 31)",   boxShadow: "rgba(0,0,0,0.4) 0px 4px 3px 0px, rgb(58, 18, 31) 0px -5px 0px 0px inset" },
        darkHover:   { backgroundColor: "rgb(45, 14, 24)",  borderColor: "rgb(68, 25, 39)",   boxShadow: "rgba(0,0,0,0.45) 0px 4px 3px 0px, rgb(68, 22, 41) 0px -5px 0px 0px inset" },
        darkPressed: { backgroundColor: "rgb(51, 19, 29)",  borderColor: "rgb(76, 30, 44)",   boxShadow: "rgba(0,0,0,0.25) 0px 1px 1px 0px, rgb(66, 26, 43) 0px -2px 0px 0px inset" },
    },
    {
        swatch: "rgb(160, 138, 215)",
        text: "rgb(32, 22, 62)",
        rest:    { backgroundColor: "rgb(250, 248, 255)", borderColor: "rgb(215, 205, 240)", boxShadow: "rgba(30, 15, 80, 0.06) 0px 4px 3px 0px, rgb(232, 226, 250) 0px -5px 0px 0px inset" },
        hover:   { backgroundColor: "rgb(232, 225, 252)", borderColor: "rgb(178, 162, 232)", boxShadow: "rgba(30, 15, 80, 0.07) 0px 4px 3px 0px, rgb(210, 200, 248) 0px -5px 0px 0px inset" },
        pressed: { backgroundColor: "rgb(218, 208, 248)", borderColor: "rgb(155, 135, 215)", boxShadow: "rgba(30, 15, 80, 0.03) 0px 1px 1px 0px, rgb(192, 178, 242) 0px -2px 0px 0px inset" },
        darkText: "rgb(190, 168, 240)",
        darkRest:    { backgroundColor: "rgb(20, 12, 42)",  borderColor: "rgb(36, 25, 68)",   boxShadow: "rgba(0,0,0,0.4) 0px 4px 3px 0px, rgb(40, 24, 68) 0px -5px 0px 0px inset" },
        darkHover:   { backgroundColor: "rgb(28, 16, 55)",  borderColor: "rgb(46, 33, 83)",   boxShadow: "rgba(0,0,0,0.45) 0px 4px 3px 0px, rgb(48, 31, 82) 0px -5px 0px 0px inset" },
        darkPressed: { backgroundColor: "rgb(33, 21, 63)",  borderColor: "rgb(52, 38, 93)",   boxShadow: "rgba(0,0,0,0.25) 0px 1px 1px 0px, rgb(48, 34, 82) 0px -2px 0px 0px inset" },
    },
    {
        swatch: "rgb(222, 168, 112)",
        text: "rgb(55, 32, 8)",
        rest:    { backgroundColor: "rgb(255, 251, 245)", borderColor: "rgb(238, 212, 182)", boxShadow: "rgba(70, 35, 5, 0.06) 0px 4px 3px 0px, rgb(250, 230, 205) 0px -5px 0px 0px inset" },
        hover:   { backgroundColor: "rgb(252, 235, 208)", borderColor: "rgb(225, 178, 135)", boxShadow: "rgba(70, 35, 5, 0.07) 0px 4px 3px 0px, rgb(242, 210, 170) 0px -5px 0px 0px inset" },
        pressed: { backgroundColor: "rgb(248, 222, 188)", borderColor: "rgb(205, 155, 108)", boxShadow: "rgba(70, 35, 5, 0.03) 0px 1px 1px 0px, rgb(232, 192, 152) 0px -2px 0px 0px inset" },
        darkText: "rgb(245, 195, 140)",
        darkRest:    { backgroundColor: "rgb(35, 20, 5)",   borderColor: "rgb(57, 34, 8)",    boxShadow: "rgba(0,0,0,0.4) 0px 4px 3px 0px, rgb(58, 37, 10) 0px -5px 0px 0px inset" },
        darkHover:   { backgroundColor: "rgb(45, 26, 7)",   borderColor: "rgb(70, 42, 10)",   boxShadow: "rgba(0,0,0,0.45) 0px 4px 3px 0px, rgb(68, 46, 14) 0px -5px 0px 0px inset" },
        darkPressed: { backgroundColor: "rgb(51, 32, 9)",   borderColor: "rgb(78, 49, 13)",   boxShadow: "rgba(0,0,0,0.25) 0px 1px 1px 0px, rgb(66, 47, 15) 0px -2px 0px 0px inset" },
    },
    {
        swatch: "rgb(95, 178, 168)",
        text: "rgb(12, 48, 44)",
        rest:    { backgroundColor: "rgb(244, 252, 251)", borderColor: "rgb(172, 218, 214)", boxShadow: "rgba(8, 45, 40, 0.06) 0px 4px 3px 0px, rgb(200, 235, 232) 0px -5px 0px 0px inset" },
        hover:   { backgroundColor: "rgb(215, 242, 240)", borderColor: "rgb(132, 195, 190)", boxShadow: "rgba(8, 45, 40, 0.07) 0px 4px 3px 0px, rgb(168, 220, 216) 0px -5px 0px 0px inset" },
        pressed: { backgroundColor: "rgb(192, 232, 228)", borderColor: "rgb(105, 172, 165)", boxShadow: "rgba(8, 45, 40, 0.03) 0px 1px 1px 0px, rgb(145, 205, 200) 0px -2px 0px 0px inset" },
        darkText: "rgb(120, 210, 200)",
        darkRest:    { backgroundColor: "rgb(8, 28, 25)",   borderColor: "rgb(14, 47, 42)",   boxShadow: "rgba(0,0,0,0.4) 0px 4px 3px 0px, rgb(17, 51, 46) 0px -5px 0px 0px inset" },
        darkHover:   { backgroundColor: "rgb(10, 38, 34)",  borderColor: "rgb(20, 57, 52)",   boxShadow: "rgba(0,0,0,0.45) 0px 4px 3px 0px, rgb(21, 59, 54) 0px -5px 0px 0px inset" },
        darkPressed: { backgroundColor: "rgb(15, 44, 40)",  borderColor: "rgb(26, 66, 60)",   boxShadow: "rgba(0,0,0,0.25) 0px 1px 1px 0px, rgb(24, 60, 55) 0px -2px 0px 0px inset" },
    },
];

export function SatisfyingButton({ theme = BUTTON_THEMES[0], isDark = false }: { theme?: ButtonTheme; isDark?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const variants = isDark
        ? { rest: theme.darkRest, hover: theme.darkHover, pressed: theme.darkPressed }
        : { rest: theme.rest,     hover: theme.hover,     pressed: theme.pressed     };

    const colors = isPressed ? variants.pressed : isHovered ? variants.hover : variants.rest;
    const textColor = isDark ? theme.darkText : theme.text;
    const y = isPressed ? 3 : 0;

    return (
        <motion.button
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => { setIsHovered(false); setIsPressed(false); }}
            onTapStart={() => setIsPressed(true)}
            onTap={() => setIsPressed(false)}
            onTapCancel={() => setIsPressed(false)}
            animate={{ y }}
            transition={{ duration: 0.04, ease: "easeOut" }}
            className="relative inline-flex items-center justify-center select-none text-base font-normal"
            style={{ color: textColor, padding: "4px 12px 8px", minHeight: 36 }}
        >
            <motion.span
                animate={colors}
                transition={{ duration: 0.08, ease: "easeOut" }}
                className="absolute inset-0 rounded-[3px]"
                style={{ border: "1px solid" }}
            />
            <span className="relative whitespace-nowrap">Button</span>
        </motion.button>
    );
}
