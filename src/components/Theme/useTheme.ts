import { useStrictContext } from "../../lib/useStrictContext";
import { ThemeContext } from "./ThemeProvider";

export const useTheme = () => useStrictContext(ThemeContext);
