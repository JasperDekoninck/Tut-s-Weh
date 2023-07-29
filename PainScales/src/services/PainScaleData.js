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
        name: 'Numeric Rating Scale',
        category: CATEGORIES.INTENSITY,
        question: 'How well are you feeling today?',
        scaleMinText: 'I am not feeling so good today.',
        scaleMidText: "I am not feeling kinda okay today.",
        scaleMaxText: 'I am feeling very good today.',
        scaleMin: 0,
        scaleMax: 100,
        fontSize: 20,
        startColor: [255, 0, 0],
        midColor: [255, 255, 0],
        endColor: [0, 255, 0],
        step: 1,
    },
    {
        id: '2',
        type: 'categorical',
        name: 'Faces Pain Scale',
        category: CATEGORIES.INTENSITY,
        question: 'What emotion are you feeling?',
        options: [
            { id: 1, text: 'sad', image: require('../../assets/sad_face.jpeg') },
            { id: 2, text: 'happy', image: require('../../assets/happy_face.jpeg') },
            { id: 3, text: 'bored', image: require('../../assets/bored.jpg') },
        ]
    },
    // Add more pain scales as necessary
];