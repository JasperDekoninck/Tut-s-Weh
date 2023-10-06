export const CATEGORIES = {
    INTENSITY: 'intensity',
    EFFECT: 'affect',
    TYPE: 'type',
    FEELING: 'feeling'
};

export const PainScaleData = [
    {
        id: '1',
        type: 'numerical',
        name: 'Numeric Rating Scale',
        category: CATEGORIES.INTENSITY,
        question: 'How strong is your pain?',
        scaleMinText: 'Meine Schmerzen sind unaushaltbar.',
        scaleMidText: "Meine Schmerzen sind aushaltbar.",
        scaleMaxText: 'Ich habe keine Schmerzen.',
        scaleMin: 0,
        scaleMax: 100,
        fontSize: 20,
        startColor: [255, 0, 0],
        midColor: [255, 255, 0],
        endColor: [0, 255, 0],
        step: 1,
    },
    {
        id: '3',
        type: 'categorical',
        name: 'Bee Scale',
        category: CATEGORIES.EFFECT,
        fontSize: 0.7,
        height: 1.35,
        question: 'How much does your pain restrict you in your everyday life?',
        options: [
            { id: 1, text: 'Meine Schmerzen sind fast nicht merkbar, ich kann alles prima mitmachen.', image: require('../../assets/Bee/1.png') },
            { id: 2, text: 'Meine Schmerzen sind leicht, aber ich möchte dennoch nicht alles im Alltag mitmachen.', image: require('../../assets/Bee/2.png') },
            { id: 3, text: 'Meine Schmerzen sind so stark, dass ich am liebsten im Bett bleiben würde.', image: require('../../assets/Bee/3.png') },
        ]
    },
    {
        id: '4',
        type: 'categorical',
        name: 'Turtle Scale',
        category: CATEGORIES.EFFECT,
        fontSize: 0.7,
        height: 1.35,
        question: 'How much does your pain restrict you in your everyday life?',
        options: [
            { id: 1, text: 'Meine Schmerzen sind fast nicht merkbar, ich kann alles prima mitmachen.', image: require('../../assets/Turtle/1.png') },
            { id: 2, text: 'Meine Schmerzen sind leicht, aber ich möchte dennoch nicht alles im Alltag mitmachen.', image: require('../../assets/Turtle/2.png') },
            { id: 3, text: 'Meine Schmerzen sind so stark, dass ich am liebsten im Bett bleiben würde.', image: require('../../assets/Turtle/3.png') },
        ]
    },
    {
        id: '5',
        type: 'categorical',
        name: 'Weight Scale',
        category: CATEGORIES.INTENSITY,
        fontSize: 0.65,
        height: 1.35,
        question: 'How strong/heavy is your pain?',
        options: [
            { id: 1, text: 'Meine Schmerzen sind sehr leicht, sie stören mich überhaupt nicht ', image: require('../../assets/Weight/1.png') },
            { id: 2, text: 'Meine Schmerzen sind leicht, ich merke sie, aber ich kann ohne Einschränkungen meinen Alltag leben.', image: require('../../assets/Weight/2.png') },
            { id: 3, text: 'Meine Schmerzen sind stark, sie stören mich im Alltag.', image: require('../../assets/Weight/3.png') },
            { id: 4, text: 'Meine Schmerzen sind sehr stark, sie sind eine Last für mich und behindern mich in meinen Alltag.', image: require('../../assets/Weight/4.png') },
        ]
    },
    {
        id: '5',
        type: 'categorical',
        name: 'Type of Pain',
        category: CATEGORIES.TYPE,
        fontSize: 0.65,
        height: 1.35,
        question: 'How does your pain feel?',
        options: [
            { id: 1, text: 'Meine Schnerzen fühlen sich brennend an.', image: require('../../assets/Type/1.png') },
            { id: 2, text: 'Meine Schmerzen fühlen sich dumpf und hämmernd an. ', image: require('../../assets/Type/2.png') },
            { id: 3, text: 'Meine Schmerzen sind stechend. ', image: require('../../assets/Type/3.png') },
            { id: 4, text: 'Ich kann meine Schmerzen nicht beschreiben, aber sie verfolgen mich den ganzen Tag.', image: require('../../assets/Type/4.png') },
        ]
    },
];