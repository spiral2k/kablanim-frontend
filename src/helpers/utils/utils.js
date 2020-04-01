export const addJSToHeader = (src = '') => {
    return new Promise((resolve, reject) => {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = () => resolve();
        script.onerror = () => reject();
        script.src = src;
        head.appendChild(script);
    });
};

export const isMobile = () => document.body.offsetWidth <= 768;

export const removeCharAtIndex = (index, str) => {
    return str.substring(0, index - 1) + str.substring(index, str.length);
};
