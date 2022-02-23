const manualData = [
    {
        title: 'Drawing a Line',
        steps: [
            'Click \'Line\' button',
            'Select two coordinates on canvas',
        ]
    },
    {
        title: 'Changing a Line Length',
        steps: [
            'Click one of line points on canvas',
            'Drag and drop selected point to change line length',
        ]
    }
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
