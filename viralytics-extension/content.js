console.log('Viralytics content script running');
// Example: Highlight all occurrences of the word "data".
document.body.innerHTML = document.body.innerHTML.replace(/data/gi, '<span style="background-color: yellow;">data</span>');
