import { style } from "@vanilla-extract/css";
import { side } from "./constants";
import { text_header } from "../../css/fonts.css";

export const root = style([{
    height: side,
    minWidth: side,
    cursor: 'pointer',
    transition: "400ms background-color",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.0rem',

    ':hover': {
        backgroundColor: 'var(--color--control-minor-hover)',
    },
}, text_header]);
