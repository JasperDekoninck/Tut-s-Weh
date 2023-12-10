export const CATEGORIES = {
    INTENSITY: 'Wie stark sind deine Schmerzen?',
    EFFECT: 'Wie stark beeinträchtigen deine Schmerzen dich?',
    TYPE: 'Welche Art von Schmerz empfindest du?',
    FEELING: 'Wie geht es dir?'
};

export const PainScaleData = [
    {
        id: '1',
        type: 'numerical',
        name: 'Wie stark sind deine Schmerzen?',
        category: CATEGORIES.INTENSITY,
        question: 'Wie stark sind deine Schmerzen?',
        scaleMinText: 'Ich habe keine Schmerzen',
        scaleMidText: "Meine Schmerzen sind aushaltbar",
        scaleMaxText: 'Meine Schmerzen sind unaushaltbar',
        scaleMin: 0,
        scaleMax: 100,
        fontSize: 20,
        startColor: [0, 255, 0],
        midColor: [255, 255, 0],
        endColor: [255, 0, 0],
        step: 1,
    },
    {
        id: '3',
        type: 'categorical',
        name: 'Wie sehr schränken deine Schmerzen dich im Alltag ein? (Biene)',
        category: CATEGORIES.EFFECT,
        fontSize: 0.85,
        height: 1.35,
        question: 'Wie sehr schränken deine Schmerzen dich im Alltag ein?',
        options: [
            { id: 1, text: 'Minimale Schmerzen, voll aktiv', image: require('../../assets/Bee/1.png') },
            { id: 2, text: 'Leichte Schmerzen, teilweise aktiv', image: require('../../assets/Bee/2.png') },
            { id: 3, text: 'Intensive Schmerzen, vorzugsweise im Bett', image: require('../../assets/Bee/3.png') },
        ]
    },
    {
        id: '4',
        type: 'categorical',
        name: 'Wie sehr schränken deine Schmerzen dich im Alltag ein? (Schildkröte)',
        category: CATEGORIES.EFFECT,
        fontSize: 0.85,
        height: 1.35,
        question: 'Wie sehr schränken deine Schmerzen dich im Alltag ein?',
        options: [
            { id: 1, text: 'Minimale Schmerzen, voll aktiv', image: require('../../assets/Turtle/1.png') },
            { id: 2, text: 'Leichte Schmerzen, teilweise aktiv', image: require('../../assets/Turtle/2.png') },
            { id: 3, text: 'Intensive Schmerzen, vorzugsweise im Bett', image: require('../../assets/Turtle/3.png') },
        ]
    },
    {
        id: '5',
        type: 'categorical',
        name: 'Wie stark/schwer sind deine Schmerzen? (Gewicht)',
        category: CATEGORIES.INTENSITY,
        fontSize: 0.85,
        height: 1.35,
        question: 'Wie stark/schwer sind deine Schmerzen?',
        options: [
            { id: 1, text: 'Leichte Schmerzen, nicht störend', image: require('../../assets/Weight/1.png') },
            { id: 2, text: 'Leicht spürbare Schmerzen, Alltag unbeeinträchtigt', image: require('../../assets/Weight/2.png') },
            { id: 3, text: 'Starke Schmerzen, Beeinträchtigung im Alltag', image: require('../../assets/Weight/3.png') },
            { id: 4, text: 'Sehr starke Schmerzen, Alltag stark beeinträchtigt', image: require('../../assets/Weight/4.png') },
        ]
    },
    {
        id: '6',
        type: 'categorical',
        name: 'Wie fühlen sich deine Schmerzen an?',
        category: CATEGORIES.TYPE,
        fontSize: 0.85,
        height: 1.35,
        question: 'Wie fühlen sich deine Schmerzen an?',
        options: [
            { id: 1, text: 'Stechende Schmerzen', image: require('../../assets/Type/1.png') },
            { id: 2, text: 'Dumpfe, hämmernde Schmerzen', image: require('../../assets/Type/2.png') },
            { id: 3, text: 'Brennende Schmerzen', image: require('../../assets/Type/3.png') },
            { id: 4, text: 'Unbeschreibliche Schmerzen', image: require('../../assets/Type/4.png') },
        ]
    },
    {
        id: '7',
        type: 'categorical',
        name: 'Wie geht es dir? (Glas)',
        category: CATEGORIES.FEELING,
        fontSize: 0.85,
        height: 1.35,
        question: 'Wie geht es dir?',
        options: [
            { id: 1, text: 'Leer, motivationslos', image: require('../../assets/Glass/1.png') },
            { id: 2, text: 'Fühle mich okay', image: require('../../assets/Glass/2.png') },
            { id: 3, text: 'Mir geht es super', image: require('../../assets/Glass/3.png') },
        ]
    },
    {
        id: '8',
        type: 'categorical',
        name: 'Wie geht es dir? (Auto)',
        category: CATEGORIES.FEELING,
        fontSize: 0.85,
        height: 1.35,
        question: 'Wie geht es dir?',
        options: [
            { id: 1, text: 'Nicht gut, starke Schmerzen', image: require('../../assets/Car/1.png') },
            { id: 2, text: 'Okay, aber Schmerzen', image: require('../../assets/Car/2.png') },
            { id: 3, text: 'Super, keine Schmerzen', image: require('../../assets/Car/3.png') },
        ]
    },
    {
        id: '9',
        type: 'categorical',
        name: 'Wie stark sind deine Schmerzen? (Engel/Teufel)',
        category: CATEGORIES.INTENSITY,
        fontSize: 0.85,
        height: 1.35,
        question: 'Wie stark sind deine Schmerzen?',
        options: [
            { id: 1, text: 'Keine Schmerzen', image: require('../../assets/Angel/1.png') },
            { id: 2, text: 'Leichte Schmerzen', image: require('../../assets/Angel/2.png') },
            { id: 3, text: 'Starke Schmerzen', image: require('../../assets/Angel/3.png') },
            { id: 4, text: 'Unaushaltbare Schmerzen', image: require('../../assets/Angel/4.png') },
        ]
    },
];