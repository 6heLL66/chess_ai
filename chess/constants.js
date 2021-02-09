const startPosition = [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    [""  , ""  , ""  , ""  , ""  , ""  , ""  , ""  ],
    [""  , ""  , ""  , ""  , ""  , ""  , ""  , ""  ],
    [""  , ""  , ""  , ""  , ""  , ""  , ""  , ""  ],
    [""  , ""  , ""  , ""  , ""  , ""  , ""  , ""  ],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
]

const startInfo = startPosition.map(i => {
    return i.map(j => {
        return j !== "" ? {
            steps: 0,
            team: j.substr(0, 1),
            value: 100
            //info
        } : null
    })
})

const values = {
    "K": 900,
    "Q": 90,
    "R": 50,
    "B": 30,
    "N": 30,
    "P": 10
}

export {
    startPosition,
    startInfo,
    values
}
