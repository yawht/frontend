import { globalStyle, style } from "@vanilla-extract/css"

const text_primary_style = {
    fontFamily: "'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '1.2rem',
    fontWeight: 400,
    color: "var(--color--text-primary)",
}

export const text_primary = style(text_primary_style);

export const text_secondary = style({
    fontFamily: "'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '1.0rem',
    fontWeight: 400,
    color: 'var(--color--text-secondary)',
});

export const text_header = style({
    fontFamily: "'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'var(--color--text-primary)',
});

export const text_accent = style({
    fontFamily: "'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "1.2rem",
    fontWeight: 400,
    color: "var(--color--text-control-accent)",
});

globalStyle('body', text_primary_style);
