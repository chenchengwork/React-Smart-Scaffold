import {
    useState,
    useContext,
    createContext
} from 'react';

export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

export const ThemeContext = createContext(
    themes.dark // default value
);

export default function UseContextHook() {
    const [count, setCount ] = useState(0);

    // 获取context
    const context = useContext(ThemeContext);
    console.log("useContext ->", context);

    return (
        <div>
            <p>你点击了 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>
                点我
            </button>
        </div>
    );
}
