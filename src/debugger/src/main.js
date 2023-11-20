const divIn = document.querySelector('#input');
const divOut = document.querySelector('#output');

// to set scroll of both divs
divIn.addEventListener('scroll', () => {divOut.scrollTop = divIn.scrollTop;});

// to update code in both divs
const updateData = () => {divOut.textContent = divIn.textContent;};

export default { updateData };