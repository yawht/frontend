import { style } from "@vanilla-extract/css";
import { side } from "./constants";

export const header = style({
    width: '100%',
    height: side,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    left: 0,
});

export const section = style({
    display: 'flex',
});
