const {check, validationResult} = require('express-validator');

const generatePetValidators = () =>[
    check('alias').notEmpty().isLength({max:50}).withMessage("Invalid alias"),
    check('type').isIn(['DOG','CAT']).withMessage("Invalid type"),
    check('color').notEmpty().isLength({max:150}).withMessage("Invalid color"),
    check('notes').notEmpty().isLength({max:150}).withMessage("Invalid note")
]

const updatePetValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("Invalid ID"),
    check('alias').isLength({max:50}).withMessage("Invalid alias"),
    check('type').isIn(['DOG','CAT']).withMessage("Invalid type"),
    check('color').isLength({max:150}).withMessage("Invalid color"),
    check('notes').isLength({max:150}).withMessage("Invalid note")
]

const generateIdValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("Invalid ID")
]

const reporter = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({
            "success" : false,
            "code" : 404,
            "message" : errors,
            "data" : []
        });
    }
    next();
}

module.exports = {
    add: [
        generatePetValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update: [
        updatePetValidators(),
        reporter
    ]
}