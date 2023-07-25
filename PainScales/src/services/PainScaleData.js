export const CATEGORIES = {
    INTENSITY: 'intensity',
    EFFECT: 'effect',
    TYPE: 'type',
    FEELING: 'feeling'
};

export const PainScaleData = [
    {
        id: '1',
        type: 'numerical',
        category: CATEGORIES.INTENSITY,
        question: 'How well are you feeling today?',
        scaleMin: 'very bad',
        scaleMax: 'very good',
        categories: {}
    },
    {
        id: '2',
        type: 'categorical',
        category: CATEGORIES.FEELING,
        question: 'What emotion are you feeling',
        scaleMin: 'N/A',
        scaleMax: 'N/A',
        categories: {
            sad: require('../../assets/sad_face.jpeg'),
            happy: require('../../assets/happy_face.jpeg')
        }
    },
    // Add more pain scales as necessary
];