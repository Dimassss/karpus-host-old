let getWidthOfTableByCSS = c => c.split("width: ").map(t => t.split("px")[0]).filter(t => !isNaN(parseInt(t))).map(t => parseInt(t)).reduce((a,b) => a+b, 0);
