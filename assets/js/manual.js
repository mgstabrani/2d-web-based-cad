const manualData = [
    {
        title: 'Drawing a Line',
        steps: [
            'Click \'Line\' button',
            'Select two coordinates on canvas',
        ],
    },
    {
        title: 'Drawing a Polygon',
        steps: [
            'Click \'Polygon\' button',
            'Select at least 3 coordinates to make a shape',
            'Click as many as you like to make another new vertices',
            'Pess \'spacebar\' button in your device to finish making your polygon',
        ],
    },
    {
        title: 'Changing a Line Length',
        steps: [
            'Click one of line points on canvas',
            'Drag and drop selected point to change line length',
        ],
    },
    {
        title: 'Changing Object Color',
        steps: [
            'Click one of object points',
            'Change color in color picker',
        ],
    },
    {
        title: 'Saving Object',
        steps: [
            'Enter file name',
            'Click \'Save File\' button',
        ],
    },
    {
        title: 'Opening file',
        steps: [
            'Choose and upload file',
            'Click \'Open File\' button',
        ],
    },
];

const manual = document.getElementById('content');

function start(){
    for(let i = 0; i < manualData.length; i++) {
        const article = document.createElement('article');
        article.className = 'card';
    
        const title = document.createElement('h2');
        title.innerText = manualData[i].title;
    
        const steps = document.createElement('ol');
    
        for(let j = 0; j < manualData[i].steps.length; j++) {
            const detail = document.createElement('li');
            detail.innerText = manualData[i].steps[j];
            steps.appendChild(detail);
        }

        article.appendChild(title);
        article.appendChild(steps);
        manual.appendChild(article);
    }
}
